<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import  SvelteMarkdown   from 'svelte-markdown';

    export let data;

    const { club, gallery } = data;
</script>

<main class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center mb-12">{club.title}</h1>

    <section class="mb-16">
        <Card.Root>
            <Card.Header class="mb-0 h-0 p-0">
            </Card.Header>
            <Card.Content class="markdown-content mt-0">
                <SvelteMarkdown source={club.description} />
            </Card.Content>
        </Card.Root>
    </section>

    <section>
        <h2 class="text-3xl font-semibold mb-6">Galerie</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {#each gallery as image, index}
                <div
                    class="relative overflow-hidden rounded-xl group"
                    class:col-span-2={index % 3 === 0}
                    class:row-span-2={index % 5 === 0}
                >
                    <img
                        src={image}
                        alt={`Imagine galerie ${index + 1}`}
                        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div
                        class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center"
                    >
                    </div>
                </div>
            {/each}
        </div>
    </section>
</main>

<style>
    :global(.markdown-content h1) {
        font-size: 2rem;
        font-weight: 600;
        margin-top: 1.5rem;
        margin-bottom: 1rem;
    }
    :global(.markdown-content h2) {
        font-size: 1.5rem;
        font-weight: 600;
        margin-top: 1.5rem;
        margin-bottom: 1rem;
    }

    :global(.markdown-content h3) {
        font-size: 1.25rem;
        font-weight: 600;
        margin-top: 1.25rem;
        margin-bottom: 0.75rem;
    }

    :global(.markdown-content p) {
        margin-bottom: 1rem;
        line-height: 1.6;
    }

    :global(.markdown-content ul) {
        list-style-type: disc;
        margin-left: 1.5rem;
        margin-bottom: 1rem;
    }

    :global(.markdown-content li) {
        margin-bottom: 0.5rem;
    }
</style>
