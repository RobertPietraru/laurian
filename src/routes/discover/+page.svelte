<script lang="ts">
    import * as Avatar from "$lib/components/ui/avatar";
    import * as Card from "$lib/components/ui/card";
    import User from "lucide-svelte/icons/user-round";
    import type { PageData } from './$types';

    export let data: PageData;

    const { clubs, pageTitle } = data;
</script>

<section class="p-8">
    <h2 class="text-3xl md:text-4xl font-bold">
        <span
            class="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text"
        >
            {pageTitle}
        </span>
    </h2>

    <div
        class="mt-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
    >
        {#each clubs as club (club.title)}
            <Card.Root
                class="relative flex  flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
            >
                <div
                    class="relative m-0 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none"
                >
                    <img
                        src={club.image}
                        alt="{club.title}"
                        class="rounded-t-xl"
                    />
                </div>
                <div class="p-6">
                    <h4
                        class="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased"
                    >
                        {club.title}
                    </h4>
                    <p
                        class="mt-3 block font-sans md:text-xl font-normal leading-relaxed text-gray-700 antialiased"
                    >
                        {club.description}
                    </p>
                </div>
                <div class="flex items-center justify-between p-6">
                    <div class="flex flow-row space-x-0.5 items-center">
                        <span> {club.members}</span>
                        <User class="h-4 w-4" />
                    </div>
                    <a class="text-blue-400 font-medium" href={club.url}>
                        Află mai multe
                    </a>
                </div>
            </Card.Root>
        {/each}
    </div>
</section>
