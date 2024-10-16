import type { Session, SupabaseClient  } from '@supabase/supabase-js'
import type { ClubRepository } from './lib/clubs/club_repository'
import type { AuthRepository } from './lib/auth/repository'
import type { AppUser } from './lib/auth/models'

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      supabase: SupabaseClient
      clubRepository: ClubRepository
      authRepository: AuthRepository
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

export {}