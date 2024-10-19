import type { LayoutServerLoad } from './$types'
import { env } from '$env/dynamic/private'

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
  const user = locals.user;
  console.log(user);

  const isAdmin = user?.role === 'moderator' || user?.role === 'admin';
  return {
    user,
    cookies: cookies.getAll(),
    publicSupabaseURL: env.NEXT_PUBLIC_SUPABASE_URL,
    publicSupabaseAnonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  }
}