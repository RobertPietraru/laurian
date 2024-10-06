import { env } from '$env/dynamic/private'
import { ClubRepository } from '$lib/clubs/club_repository'
import { createServerClient } from '@supabase/ssr'
import { type Handle, redirect } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { AuthRepository } from './lib/auth/repository'

const supabase: Handle = async ({ event, resolve }) => {
    event.locals.supabase = createServerClient(env.KV_NEXT_PUBLIC_SUPABASE_URL, env.KV_NEXT_PUBLIC_SUPABASE_ANON_KEY, {




        cookies: {
            getAll: () => event.cookies.getAll(),
            setAll: (cookiesToSet) => {
                cookiesToSet.forEach(({ name, value, options }) => {
                    event.cookies.set(name, value, { ...options, path: '/' })
                })
            },
        },
    })


    event.locals.safeGetSession = async () => {
        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession()
        if (!session) {
            return { session: null, user: null }
        }

        const {
            data: { user },
            error,
        } = await event.locals.supabase.auth.getUser()
        if (error) {
            return { session: null, user: null }
        }

        return { session, user }
    }
    event.locals.clubRepository = new ClubRepository(event.locals.supabase, env.KV_SUPABASE_URL);
    event.locals.authRepository = new AuthRepository(event.locals.supabase);

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range' || name === 'x-supabase-api-version'
        },
    })
}

const authGuard: Handle = async ({ event, resolve }) => {
    const { session, user } = await event.locals.safeGetSession()
    event.locals.session = session
    event.locals.user = user

    if (!event.locals.session && event.url.pathname.startsWith('/admin') && !event.url.pathname.startsWith('/admin/login')) {
        throw redirect(303, '/admin/login')
    }

    return resolve(event)
}

export const handle: Handle = sequence(supabase, authGuard)
