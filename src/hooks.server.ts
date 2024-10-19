import { env } from '$env/dynamic/private'
import { ClubRepository } from '$lib/features/clubs/club_repository'
import { createServerClient } from '@supabase/ssr'
import { type Handle, redirect } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { AuthRepository } from './lib/features/auth/repository'
import { logger } from '$lib/stores/logger';

const supabase: Handle = async ({ event, resolve }) => {
    event.locals.supabase = createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
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
    event.locals.clubRepository = new ClubRepository(event.locals.supabase, env.SUPABASE_URL);
    event.locals.authRepository = new AuthRepository(event.locals.supabase);

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range' || name === 'x-supabase-api-version'
        },
    })
}

const completelyUnprotectedRoutes = ['/login', '/register', '/discover', '/about', '/club'];
const authGuard: Handle = async ({ event, resolve }) => {
    const { session, user } = await event.locals.safeGetSession()
    event.locals.session = session
    if (session) {
        event.locals.user = await event.locals.authRepository.getUser();
    }
    if (event.url.pathname == '/') {
        return resolve(event);
    }

    if (!event.locals.session) {
        for (const route of completelyUnprotectedRoutes) {
            if (event.url.pathname.startsWith(route)) {
                return resolve(event);
            }
        }
        logger.info('Auth guard: redirecting to login')
        throw redirect(303, '/login')
    }

    return resolve(event)
}
const moderatorGuard: Handle = async ({ event, resolve }) => {
    console.log('moderator guard')
    if (event.url.pathname == '/') {
        return resolve(event);
    }
    if (event.locals.user?.role === "user" && event.url.pathname.startsWith('/moderator')) {
        logger.info('Moderator guard: redirecting to login')
        throw redirect(303, '/login')
    }
    console.log('resolving');

    return resolve(event)
}

const maintenanceGuard: Handle = async ({ event, resolve }) => {
    if (env.MAINTENANCE_MODE === 'true') {
        if (event.url.pathname == '/maintenance') {
            return resolve(event);
        }
        throw redirect(303, '/maintenance')
    } else {
        if (event.url.pathname == '/maintenance') {
            throw redirect(303, '/')
        }
    }
    return resolve(event)
}

export const handle: Handle = sequence(supabase, authGuard, moderatorGuard)
