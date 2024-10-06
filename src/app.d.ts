import type { Session, SupabaseClient, User } from '@supabase/supabase-js'
import type { ClubRepository } from './lib/clubs/club_repository'

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      supabase: SupabaseClient
      clubRepository: ClubRepository
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