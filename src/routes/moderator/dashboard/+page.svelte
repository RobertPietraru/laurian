<script lang="ts">
    import type { PageData } from "./$types";
    import type { Club } from "$lib/features/clubs/models";

    import { Plus, User } from "lucide-svelte";
    import * as Card from "$lib/components/ui/card";

    export let data;
</script>

{#if data.clubs != null && data.clubs.length > 0}
    <main class="h-[100vh] p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each data.clubs as club}
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
                                href={`/moderator/club/${club.id}`}
                                class="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors duration-300"
                            >
                                Editează
                            </a>
                        </div>
                    </div>
                </Card.Root>
            {/each}
        </div>
    </main>
{:else}
    <main class="h-[100vh] p-8">
        <div
            class="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        >
            <div class="text-center">
                <h2 class="text-3xl font-extrabold sm:text-4xl">
                    Nu ai access la cluburi încă
                </h2>
                <p class="mt-4 text-xl text-gray-600">
                    Contactează un administrator pentru a obține acces la
                    cluburi.
                </p>
            </div>
            <div class="mt-10">
                <pre
                    class="text-8xl leading-tight text-gray-400">¯\_(ツ)_/¯</pre>
            </div>
            <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-8 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 flex items-center justify-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
                    />
                </svg>
                Da-mi un mesaj
            </a>
        </div>
    </main>
{/if}
