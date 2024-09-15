<script lang="ts">
    import type { PageData } from "./$types";
    import type { Club } from "$lib/models/club";

    import { Plus, User } from "lucide-svelte";
    import * as Card from "$lib/components/ui/card";

    export let data: PageData;
</script>

<main class="p-8 bg-gradient-to-br min-h-screen">
    <h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1>
    {#if data.clubs && data.clubs.length > 0}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each data.clubs as club (club.id)}
                <Card.Root
                    class="group hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                    <div class="relative overflow-hidden">
                        {#if club.files && club.files.length > 0}
                            <img
                                src={club.files[0]}
                                alt={club.name}
                                class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                        {:else}
                            <div
                                class="w-full h-48 bg-gray-200 flex items-center justify-center"
                            >
                                <span class="text-gray-500">Fără imagine</span>
                            </div>
                        {/if}
                        <div
                            class="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                        ></div>
                    </div>
                    <div class="p-6">
                        <h4
                            class="text-2xl font-semibold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors duration-300"
                        >
                            {club.name}
                        </h4>
                        <p class="text-gray-600 mb-4">
                            {club.description}
                        </p>
                        <div class="flex items-center justify-between">
                            <div
                                class="flex items-center space-x-2 text-gray-500"
                            >
                                <User class="h-5 w-5" />
                                <span>{club.memberCount} membri</span>
                            </div>
                            <a
                                href={`/admin/club/${club.id}`}
                                class="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors duration-300"
                            >
                                Editează
                            </a>
                        </div>
                    </div>
                </Card.Root>
            {/each}
        </div>
    {:else}
        <div
            class="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        >
            <div class="text-center">
                <h2 class="text-3xl font-extrabold  sm:text-4xl">
                    Nu există cluburi încă
                </h2>
                <p class="mt-4 text-xl text-gray-600">
                    Începeți prin a adăuga primul club folosind butonul de mai
                    jos.
                </p>
            </div>
            <div class="mt-10">
                <pre class="text-8xl leading-tight text-gray-400">¯\_(ツ)_/¯</pre>
            </div>
            <a
                href="/admin/clubs/create"
                class="mt-8 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
                Adaugă primul club
            </a>
        </div>
    {/if}
</main>
<div class="fixed bottom-8 right-8">
    <a
        href="/admin/clubs/create"
        class="flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300"
    >
        <Plus class="h-8 w-8" />
    </a>
</div>
