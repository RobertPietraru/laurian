import type { Session, SupabaseClient } from '@supabase/supabase-js'
import type { ClubRepository } from './lib/features/clubs/club_repository'
import type { AuthRepository } from './lib/features/auth/repository'
import type { AppUser } from './lib/features/auth/models'
import type { AdminRepository } from './lib/features/admin/repository'

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      supabase: SupabaseClient
      clubRepository: ClubRepository
      authRepository: AuthRepository
      adminRepository: AdminRepository | null
      safeGetSession: () => Promise<{ session: Session | null; user: User | null }>
      session: Session | null
      user: AppUser | null
    }
    interface PageData {
      session: Session | null
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export { }