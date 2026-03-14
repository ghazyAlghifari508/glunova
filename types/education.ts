export type UserStatus = 'normal' | 'prediabetes' | 'diabetes' | 'berisiko' | 'terdiagnosis' | 'pemantauan_intensif' | 'baru_terdiagnosis' | 'manajemen_rutin';
export type Category = 'nutrisi' | 'kesehatan' | 'aktivitas' | 'edukasi';

export interface EducationContent {
  id: string;
  day: number;
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
  xp_points?: number;
  monitoring_start_date?: string; // Monitoring start
  monitoring_target_date?: string; // Target evaluation
  monitoring_week?: number;
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
