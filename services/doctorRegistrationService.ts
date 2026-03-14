'use server'

import { createClient } from '@/lib/supabase-server'
import { assertAuthenticated, handleServiceError } from '@/lib/service-helper'
import { DoctorRegistrationFormData } from '@/types/doctor'

/**
 * Upload a file to Supabase Storage.
 * @param file The file to upload
 * @param path The path in the bucket
 * @returns The public URL of the uploaded file
 */
export async function uploadFile(file: File, path: string): Promise<string> {
  const supabase = await createClient()
  
  // Storage upload expects a Blob, File, or ArrayBuffer on the server as well
  // Attempting to use 'registrations' bucket as it is more standard for this use case.
  // Note: If you get "Bucket not found", please ensure a bucket named 'registrations' 
  // exists in your Supabase Storage dashboard and is set to PUBLIC.
  const bucketName = 'registrations'

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(path, file, { 
      upsert: true,
      contentType: file.type 
    })

  if (error) {
    console.error(`Storage Error [${bucketName}]:`, error)
    handleServiceError(error, 'Gagal mengunggah file ke storage')
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucketName)
    .getPublicUrl(data.path)

  return publicUrl
}

/**
 * Submit a doctor registration application.
 * This inserts into `doctor_registrations` with status='pending'.
 * The user's role stays 'user' until admin approves.
 */
export async function submitDoctorRegistration(userId: string, formData: DoctorRegistrationFormData) {
  const user = await assertAuthenticated()
  if (user.id !== userId) throw new Error('Akses ditolak: ID User tidak cocok')

  let profilePictureUrl = null
  if (formData.profilePicture) {
    try {
      profilePictureUrl = await uploadFile(formData.profilePicture, `${userId}/profile-picture`)
    } catch (err) {
      console.error('Profile picture upload failed:', err)
      // Allow proceeding if it's just the photo failing, or we could throw
    }
  }

  let certificationUrl = null
  if (formData.certification) {
    try {
      certificationUrl = await uploadFile(formData.certification, `${userId}/certification`)
    } catch (err) {
      console.error('Certification upload failed:', err)
      throw new Error('Gagal mengunggah sertifikat. Harap coba lagi.')
    }
  }

  const supabase = await createClient()

  // 1. Check for duplicate license number in already approved doctors
  const { data: existingDoctor } = await supabase
    .from('doctors')
    .select('user_id, full_name')
    .eq('license_number', formData.licenseNumber)
    .maybeSingle()

  if (existingDoctor && existingDoctor.user_id !== userId) {
    throw new Error(`Nomor lisensi ${formData.licenseNumber} sudah digunakan oleh dokter lain (${existingDoctor.full_name})`)
  }

  // 2. Check for duplicate license number in pending registrations
  const { data: pendingReg } = await supabase
    .from('doctor_registrations')
    .select('user_id, full_name')
    .eq('license_number', formData.licenseNumber)
    .neq('user_id', userId)
    .eq('status', 'pending')
    .maybeSingle()

  if (pendingReg) {
    throw new Error(`Nomor lisensi ${formData.licenseNumber} sudah dalam proses pendaftaran oleh orang lain (${pendingReg.full_name})`)
  }

  // Check if user already has a pending/approved registration
  const { data: existing } = await supabase
    .from('doctor_registrations')
    .select('id, status')
    .eq('user_id', userId)
    .single()

  if (existing) {
    if (existing.status === 'approved') {
      throw new Error('Anda sudah terdaftar sebagai dokter.')
    }
    if (existing.status === 'pending' || existing.status === 'reviewing') {
      throw new Error('Anda sudah memiliki pendaftaran yang sedang diproses.')
    }
    // If rejected, allow re-submission by updating the existing record
    if (existing.status === 'rejected') {
      const { data, error } = await supabase
        .from('doctor_registrations')
        .update({
          status: 'pending',
          full_name: formData.fullName,
          phone: formData.phone,
          bio: formData.bio,
          profile_photo_url: profilePictureUrl,
          specialization: formData.specialization,
          license_number: formData.licenseNumber,
          certification_url: certificationUrl,
          years_of_experience: formData.yearsOfExperience ? parseInt(formData.yearsOfExperience) : 0,
          hourly_rate: parseFloat(formData.hourlyRate) || 0,
          rejection_reason: null,
          reviewed_at: null,
          reviewed_by: null,
          submitted_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .select('id')
        .single()

      if (error) handleServiceError(error, 'Gagal memperbarui pendaftaran dokter')
      return data!.id
    }
  }

  // Create new registration
  const { data, error } = await supabase
    .from('doctor_registrations')
    .insert([{
      user_id: userId,
      full_name: formData.fullName,
      phone: formData.phone,
      bio: formData.bio,
      profile_photo_url: profilePictureUrl,
      specialization: formData.specialization,
      license_number: formData.licenseNumber,
      certification_url: certificationUrl,
      years_of_experience: formData.yearsOfExperience ? parseInt(formData.yearsOfExperience) : 0,
      hourly_rate: parseFloat(formData.hourlyRate) || 0,
      status: 'pending',
    }])
    .select('id')
    .single()

  if (error) {
    if (error.code === '23505') {
      throw new Error('Anda sudah memiliki pendaftaran aktif.')
    }
    handleServiceError(error, 'Gagal mengirim pendaftaran dokter')
  }

  // Update the user's role in the profiles table to doctor_pending
  const { error: roleError } = await supabase
    .from('profiles')
    .update({ role: 'doctor_pending' })
    .eq('id', userId)

  if (roleError) {
    console.error('Failed to update user role to doctor_pending:', roleError)
    // We don't necessarily throw here if the registration itself was successful, 
    // but it's important to track.
  }

  return data.id
}

/**
 * Check the current registration status for a user.
 */
export async function getRegistrationStatus(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('doctor_registrations')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null // Not found
    throw error
  }

  return data
}

// Legacy function name kept for backward compatibility
export const createDoctorProfile = submitDoctorRegistration
