import type { LayoutServerLoad } from './$types'
import { env } from '$env/dynamic/private'

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
  const { session } = await safeGetSession()
  return {
    session,
    cookies: cookies.getAll(),
    publicSupabaseURL: env.KV_NEXT_PUBLIC_SUPABASE_URL,
    publicSupabaseAnonKey: env.KV_NEXT_PUBLIC_SUPABASE_ANON_KEY

  }
}