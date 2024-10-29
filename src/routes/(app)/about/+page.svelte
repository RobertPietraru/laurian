<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import * as Avatar from "$lib/components/ui/avatar";
    import type { PageData } from './$types';

    export let data: PageData;

    const { team, gallery, missionImage, projectDescription } = data;
</script>

<main class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center mb-12">Despre proiect</h1>

    <section class="mb-16">
        <h2 class="text-3xl font-semibold mb-6">Misiunea Noastră</h2>
        <div class="flex flex-col md:flex-row gap-8">
            <img
                src={missionImage}
                alt="Misiunea noastră"
                class="rounded-lg shadow-lg md:w-1/2"
            />
            <p class="text-lg">
                {projectDescription}
            </p>
        </div>
    </section>

    <section class="mb-16">
        <h2 class="text-3xl font-semibold mb-6">Echipa Noastră</h2>
        <div class="overflow-x-auto">
            <div class="flex gap-8 pb-4" style="width: max-content;">
                {#each team as member}
                    <Card.Root class="w-64">
                        <Card.Header>
                            <Avatar.Root class="w-24 h-24 mx-auto">
                                <Avatar.Image
                                    src={member.image}
                                    alt={member.name}
                                />
                                <Avatar.Fallback
                                    >{member.name[0]}</Avatar.Fallback
                                >
                            </Avatar.Root>
                        </Card.Header>
                        <Card.Content>
                            <h3 class="text-xl font-semibold text-center">
                                {member.name}
                            </h3>
                            <p class="text-center text-gray-600">
                                {member.teamRole}
                            </p>
                        </Card.Content>
                    </Card.Root>
                {/each}
            </div>
        </div>
    </section>

    <section>
        <h2 class="text-3xl font-semibold mb-6">Galerie</h2>
        <div class="grid grid-cols-4 gap-4">
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
