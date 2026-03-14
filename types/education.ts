export type Phase = 'kesehatan' | 'fase_2' | 'fase_3' | 'fase_4';
export type UserStatus = 'normal' | 'prediabetes' | 'diabetes' | 'berisiko' | 'terdiagnosis' | 'pemantauan_intensif' | 'baru_terdiagnosis' | 'manajemen_rutin';
export type Category = 'nutrisi' | 'kesehatan' | 'aktivitas' | 'edukasi';

export interface PhaseInfo {
  id: Phase;
  label: string;
  dayRange: [number, number];
}

export const PHASES: PhaseInfo[] = [
  { id: 'kesehatan', label: 'Fase 1: Inisiasi', dayRange: [1, 90] },
  { id: 'fase_2', label: 'Fase 2: Stabilisasi', dayRange: [91, 180] },
  { id: 'fase_3', label: 'Fase 3: Optimalisasi', dayRange: [181, 270] },
  { id: 'fase_4', label: 'Fase 4: Maintenance', dayRange: [271, 365] },
];

export interface EducationContent {
  id: string;
  day: number;
  phase: Phase;
  month: number;
  title: string;
  description: string;
  content: string;
  tips: string[];
  category: Category;
  thumbnail_url?: string;
  tags?: string[];
  related_days?: number[];
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string; // auth.uid()
  username?: string;
  full_name?: string;
  avatar_url?: string;
  role: 'user' | 'doctor' | 'admin';
  status?: string; // Flexible for legacy values like 'berisiko'
  onboarding_completed: boolean;
  current_weight?: number;
  height?: number;
  hba1c?: number;
  current_day?: number;
  diabetes_phase?: string;
  xp_points?: number;
  monitoring_start_date?: string; // Monitoring start
  monitoring_target_date?: string; // Target evaluation
  monitoring_week?: number;
  monitoring_level?: string | number; // Active phase level
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  day: number;
  is_read: boolean;
  read_at?: string;
  is_favorite: boolean;
  favorited_at?: string;
}

export function getPhaseFromDay(day: number): Phase {
  if (day >= 700) return 'fase_4';
  if (day >= 450) return 'fase_3';
  if (day >= 280) return 'fase_2';
  return 'kesehatan';
}

export function getPhaseInfo(phase: Phase) {
  const info = {
    'kesehatan': {
      label: 'Monitoring Awal',
      description: 'Fase awal pemantauan glukosa dan pemahaman dasar diabetes.'
    },
    'fase_2': {
      label: 'Stabilisasi',
      description: 'Fase pemantapan pola makan dan aktivitas fisik yang konsisten.'
    },
    'fase_3': {
      label: 'Optimalisasi Kontrol',
      description: 'Fase penyempurnaan manajemen glukosa dengan bantuan teknologi.'
    },
    'fase_4': {
      label: 'Maintenance',
      description: 'Fase pemeliharaan gaya hidup sehat jangka panjang.'
    }
  };
  return info[phase] || info['kesehatan'];
}
