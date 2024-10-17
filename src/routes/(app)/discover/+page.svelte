<script lang="ts">
    import * as Avatar from "$lib/components/ui/avatar";
    import * as Card from "$lib/components/ui/card";
    import User from "lucide-svelte/icons/user-round";
    import type { PageData } from './$types';

    export let data: PageData;


</script>

<section class="p-8 bg-gradient-to-br  min-h-screen">
    <h2 class="text-4xl md:text-5xl font-bold text-center mb-12">
        <span class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Descoperă toate cluburile din liceul nostru
        </span>
    </h2>

    <div class="mt-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {#if data.clubs}
        {#each data.clubs  as club}
            <Card.Root class="group hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div class="relative overflow-hidden">
                    {#if club.files.length > 0}
                    <img
                        src={club.files[0]}
                        alt="{club.name}"
                        class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                    {:else}
                        <div class="w-full h-48 bg-gray-200 flex items-center justify-center">
                            <span class="text-gray-500">Fără imagine</span>
                        </div>
                    {/if}
                    <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>
                <div class="p-6">
                    <h4 class="text-2xl font-semibold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                        {club.name}
                    </h4>
                    <p class="text-gray-600 mb-4">
                        {club.description}
                    </p>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2 text-gray-500">
                            <User class="h-5 w-5" />
                            <span>{club.memberCount} membri</span>
                        </div>
                        <a 
                            href={`/club/${club.id}`}
                            class="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors duration-300"
                        >
                            Află mai multe
                        </a>
                    </div>
                </div>
            </Card.Root>
        {/each}
        {:else}
        <div class="text-center text-gray-500">
            <p>Nu există cluburi</p>
        </div>
        {/if}
    </div>
</section>
