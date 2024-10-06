import type { Session, SupabaseClient, User } from '@supabase/supabase-js'
import type { ClubRepository } from './lib/clubs/club_repository'
import type { AuthRepository } from './lib/auth/repository'

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      supabase: SupabaseClient
      clubRepository: ClubRepository
      authRepository: AuthRepository
      safeGetSession: () => Promise<{ session: Session | null; user: User | null }>
      session: Session | null
      user: User | null
    }
    interface PageData {
      session: Session | null
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export {}