<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Label } from "$lib/components/ui/label";
    import {
        CloudUpload,
        Delete,
        File as FileIcon,
        Trash2,
    } from "lucide-svelte";
    import { Input } from "$lib/components/ui/input";
    import { Textarea } from "$lib/components/ui/textarea";
    import { applyAction, deserialize, enhance } from "$app/forms";
    import type { ActionResult } from "@sveltejs/kit";
    import { invalidateAll } from "$app/navigation";
    import { marked } from "marked";
    import * as Card from "$lib/components/ui/card";

    export let data;

    let files: File[] = [];
    let name = data.club.name;
    let description = data.club.description;
    let memberCount = data.club.memberCount;

    $: markdownPreview = marked(description);
    $: previewGallery = data.club.files;

    async function handleDelete() {
        const formData = new FormData();
        const response = await fetch(`/admin/club/${data.club.id}?/delete`, {
            method: "POST",
            body: formData,
        });
        const result: ActionResult = deserialize(await response.text());
        applyAction(result);
    }

    const handleFileChange = (event: Event) => {
        const e = event?.target as any;
        const fileList = e.files;
        const _files = [...files];
        for (let i = 0; i < fileList.length; i++) {
            _files.push(fileList[i]);
        }

        console.log(_files);
        files = _files;
    };

    async function handleSubmit(event: {
        currentTarget: EventTarget & HTMLFormElement;
    }) {
        const formData = new FormData(event.currentTarget);

        files.forEach((file, index) => {
            formData.append(`file-${index}`, file);
        });

        console.log(formData);
        formLoading = true;

        const response = await fetch(event.currentTarget.action, {
            method: "POST",
            body: formData,
        });
        formLoading = false;

        const result: ActionResult = deserialize(await response.text());

        if (result.type === "success") {
            await invalidateAll();
        }

        applyAction(result);
    }

    let formLoading = false;
</script>

<div class="px-4 py-12 sm:px-6 lg:px-8 min-h-[100vh]">
    <div class="flex flex-col lg:flex-row gap-[10%]">
        <form
            action="?/update"
            method="post"
            enctype="multipart/form-data"
            class="w-full lg:w-1/2 md:w-1/3"
            on:submit|preventDefault={handleSubmit}
        >
            <h1 class="text-3xl font-bold tracking-tight">Editare Club</h1>
            <p class="my-3 text-lg text-muted-foreground">
                Actualizați detaliile clubului.
            </p>
            <div>
                <Label for="name">Nume Club</Label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    bind:value={name}
                    placeholder="Introduceți numele clubului"
                    class="mt-1 block w-full"
                />
            </div>
            <div class="mt-4">
                <Label for="description">Descriere (Markdown)</Label>
                <Textarea
                    id="description"
                    name="description"
                    bind:value={description}
                    rows={5}
                    placeholder="Descrieți clubul folosind Markdown"
                    class="mt-1 block w-full"
                />
            </div>
            <div class="mt-4">
                <Label for="memberCount">Număr de Membri</Label>
                <Input
                    id="memberCount"
                    name="memberCount"
                    type="number"
                    bind:value={memberCount}
                    min="0"
                    placeholder="Introduceți numărul de membri"
                    class="mt-1 block w-full"
                />
            </div>

            <div class="mt-4 flex justify-end gap-4">
                <Button
                    variant="destructive"
                    type="button"
                    on:click={handleDelete}
                >
                    Sterge Club
                </Button>
                <Button
                    type="submit"
                    class={"bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary" +
                        (formLoading
                            ? " cursor-not-allowed bg-primary-foreground text-primary"
                            : "")}
                >
                    Actualizează Club
                </Button>
            </div>
        </form>

        <article class="markdown-content w-full lg:w-1/2 xl:w-2/3">
            <h1 class={!name ? "text-muted-foreground" : ""}>
                {name || "Titlu Club"}
            </h1>
            {#if memberCount}
                <h3>
                    {memberCount || "0"} Membri
                </h3>
            {/if}

            <div class={"mt-2 prose prose-sm max-w-none"}>
                {#if markdownPreview}
                    {@html markdownPreview}
                {:else}
                    <h2 class="text-muted-foreground">
                        O descriere foarte frumoasă
                    </h2>
                {/if}
            </div>

            <div class="mt-8">
                <div
                    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                >
                    {#each previewGallery as image, index}
                        <div
                            class="relative overflow-hidden rounded-xl group"
                            class:col-span-2={index % 3 === 0 && index !== 0}
                            class:row-span-2={index % 5 === 0 && index !== 0}
                        >
                            <img
                                src={image}
                                alt={`Imagine galerie ${index + 1}`}
                                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div
                                class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center"
                            ></div>
                        </div>
                    {/each}
                </div>
            </div>
        </article>
    </div>
</div>

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
