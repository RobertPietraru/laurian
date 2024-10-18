import type { LayoutServerLoad } from './$types'
import { env } from '$env/dynamic/private'

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
  const { session } = await locals.safeGetSession()
  const user = locals.user;

  const isAdmin = user?.role === 'moderator' || user?.role === 'admin';
  return {
    user,
    isAdmin,
    cookies: cookies.getAll(),
    publicSupabaseURL: env.NEXT_PUBLIC_SUPABASE_URL,
    publicSupabaseAnonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  }
}