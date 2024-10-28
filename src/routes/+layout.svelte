<script lang="ts">
    import "../app.css";
    import { Toaster } from "$lib/components/ui/sonner";
    import { ModeWatcher } from "mode-watcher";
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    import {
        User,
        LogOut,
        LogIn,
        CircleUser,
        Menu,
        Sun,
        Moon,
        LayoutDashboard,
    } from "lucide-svelte/icons";
    import { toggleMode } from "mode-watcher";
    import { Button } from "$lib/components/ui/button/index.js";
    import { invalidate } from "$app/navigation";
    import { onMount } from "svelte";

    import { Separator } from "$lib/components/ui/separator/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";

    export let data;
    $: ({ session, supabase } = data);

    onMount(() => {
        const { data: dt } = supabase.auth.onAuthStateChange(
            (_, newSession) => {
                if (newSession?.expires_at !== session?.expires_at) {
                    invalidate("supabase:auth");
                }
            },
        );

        return () => dt.subscription.unsubscribe();
    });

    async function logout() {
        await supabase.auth.signOut();
        await invalidate("supabase:auth");
        location.reload();
    }
</script>

<Toaster />
<ModeWatcher />

<header
    class="bg-background sticky top-0 flex h-16 items-center gap-4 border-b dark:border-gray-700 px-4 md:px-6 z-10"
>
    <a
        href="/"
        class="flex items-center gap-2 text-lg font-semibold md:text-base"
    >
        <img src="/logo.png" alt="A.T. Laurian" class="h-6 w-6" />
        <span class="sr-only">A.T. Laurian</span>
    </a>

    <div class="flex-grow"></div>
    <Button
        on:click={toggleMode}
        variant={"ghost"}
        size="icon"
        class="text-muted-foreground hover:text-foreground transition-none"
    >
        <Sun
            class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 "
        />
        <Moon
            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Schimba tema</span>
    </Button>
    <nav
        class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
    >
        <a
            href="/discover"
            class="text-muted-foreground hover:text-foreground transition-colors"
        >
            Cluburi
        </a>
        <a
            href="/about"
            class="text-muted-foreground hover:text-foreground transition-colors"
        >
            Despre
        </a>
        {#if data.user}
            <Popover.Root>
                <Popover.Trigger asChild let:builder>
                    <Button
                        variant="ghost"
                        size="icon"
                        class="text-muted-foreground hover:text-foreground transition-colors"
                        builders={[builder]}
                    >
                        <CircleUser class="h-4 w-4" />
                    </Button>
                </Popover.Trigger>
                <Popover.Content class="w-48">
                    <div class="flex flex-col gap-2">
                        {#if data.user?.role === "moderator" || data.user?.role === "admin"}
                            <a
                                href={`/${data.user?.role === "moderator" ? "moderator" : "admin"}/dashboard`}
                                class="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                            >
                                <LayoutDashboard class="h-4 w-4" />
                                <span>Dashboard</span>
                            </a>
                            <Separator />
                        {/if}
                        <a
                            href="/profile"
                            class="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                        >
                            <User class="h-4 w-4" />
                            Profil
                        </a>
                        <Button
                            variant="ghost"
                            on:click={logout}
                            class="flex justify-start  gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                        >
                            <LogOut class="h-4 w-4" />
                            <span>Logout</span>
                        </Button>
                    </div>
                </Popover.Content>
            </Popover.Root>
        {:else}
            <a
                href="/login"
                class="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            >
                <LogIn class="h-4 w-4" />
                <span>Login</span>
            </a>
        {/if}
    </nav>
    <Sheet.Root>
        <Sheet.Trigger asChild let:builder>
            <Button
                variant="ghost"
                size="icon"
                class="shrink-0 md:hidden"
                builders={[builder]}
            >
                <Menu class="h-5 w-5" />
                <span class="sr-only">Meniu Navigare</span>
            </Button>
        </Sheet.Trigger>
        <Sheet.Content side="right">
            <nav class="flex flex-col gap-6 font-medium h-full">
                <a
                    href="/"
                    class="flex items-center gap-2 text-lg font-semibold"
                >
                    <img src="/logo.png" alt="Acme Inc" class="h-6 w-6" />
                    <span class="sr-only">Acasa</span>
                </a>
                <a href="/" class="text-muted-foreground hover:text-foreground">
                    Acasa
                </a>
                <a
                    href="/discover"
                    class="text-muted-foreground hover:text-foreground"
                >
                    Cluburi
                </a>
                <a
                    href="/about"
                    class="text-muted-foreground hover:text-foreground"
                >
                    Despre
                </a>

                <Separator />
                <div class="flex-grow"></div>
                {#if data.user}
                    {#if data.user?.role === "moderator" || data.user?.role === "admin"}
                        <a
                            href={`/${data.user?.role === "moderator" ? "moderator" : "admin"}/dashboard`}
                            class="text-muted-foreground hover:text-foreground"
                        >
                            Dashboard
                        </a>
                    {/if}
                    <a
                        href="/profile"
                        class="text-muted-foreground hover:text-foreground"
                    >
                        Profil
                    </a>
                    <Button
                        on:click={logout}
                        variant="destructive"
                        class="flex justify-start gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded "
                    >
                        <LogOut class="h-4 w-4" />
                        Logout
                    </Button>
                {/if}
            </nav>
        </Sheet.Content>
    </Sheet.Root>
</header>

<slot />

<footer class="bg-white dark:bg-gray-900 flex justify-center">
    <div class="w-full">
        <div
            class="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4 max-w-screen-xl m-auto"
        >
            <div>
                <h2
                    class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
                >
                    Site
                </h2>
                <ul class="text-gray-500 dark:text-gray-400 font-medium">
                    <li class="mb-4">
                        <a href="/" class="hover:underline">Acasă</a>
                    </li>
                    <li class="mb-4">
                        <a href="/about" class=" hover:underline">Despre</a>
                    </li>
                    <li class="mb-4">
                        <a href="/discover" class="hover:underline">Cluburi</a>
                    </li>
                </ul>
            </div>
            <div>
                <h2
                    class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
                >
                    Centru de ajutor
                </h2>
                <ul class="text-gray-500 dark:text-gray-400 font-medium">
                    <li class="mb-4">
                        <p class="hover:underline overflow-clip">
                            robert.c.pietraru@gmail.com
                        </p>
                    </li>
                </ul>
            </div>
            <div>
                <h2
                    class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
                >
                    Legal
                </h2>
                <ul class="text-gray-500 dark:text-gray-400 font-medium">
                    <li class="mb-4">
                        <a
                            href="https://github.com/RobertPietraru/laurian/blob/master/LICENSE"
                            class="hover:underline">Licență</a
                        >
                    </li>
                </ul>
            </div>
            <div>
                <h2
                    class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
                >
                    Contribuie
                </h2>
                <ul class="text-gray-500 dark:text-gray-400 font-medium">
                    <li class="mb-4">
                        <a
                            href="https://github.com/RobertPietraru/laurian"
                            class="hover:underline">Pagina Github</a
                        >
                    </li>
                    <li class="mb-4">
                        <a
                            href="https://github.com/RobertPietraru/laurian/issues"
                            class="hover:underline">Raportează o problemă</a
                        >
                    </li>
                    <li class="mb-4">
                        <a
                            href="https://github.com/RobertPietraru/laurian/issues"
                            class="hover:underline">Vino cu o idee</a
                        >
                    </li>
                    <li class="mb-4">
                        <a
                            href="https://github.com/RobertPietraru/laurian/pulls"
                            class="hover:underline">Contribuie cod</a
                        >
                    </li>
                </ul>
            </div>
        </div>
        <div
            class="px-4 py-6 md:flex md:items-center md:justify-between w-full"
        >
            <span
                class="text-sm text-gray-500 dark:text-gray-300 sm:text-center"
                >© 2024 Colegiul Naţional „A. T. Laurian” Botoşani. Toate
                drepturile rezervate.
            </span>
            <div
                class="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse"
            >
                <a
                    href="https://www.facebook.com/profile.php?id=387262094764094&paipv=0&eav=AfYZ3KUQ122DpnKSEVu9s45unpyNGg1hV3QWMhbfoh79NRlFi1rza-sGAUxebCamVt0&_rdr"
                    class="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                    <svg
                        class="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 8 19"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    <span class="sr-only">Facebook page</span>
                </a>

                <a
                    href="https://github.com/RobertPietraru/laurian"
                    class="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                    <svg
                        class="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    <span class="sr-only">GitHub</span>
                </a>
            </div>
        </div>
    </div>
</footer>
