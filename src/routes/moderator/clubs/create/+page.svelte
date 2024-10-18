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

    let files: File[] = [];
    let name = "";
    let description = "";
    let memberCount = 0;

    $: markdownPreview = marked(description);
    $: previewGallery = files.map((file) => URL.createObjectURL(file));

    const handleFileChange = (event: Event) => {
        const e = event?.target as any;
        const fileList = e.files;
        const _files = [...files];
        for (let i = 0; i < fileList.length; i++) {
            _files.push(fileList[i]);
        }
        files = _files;
    };

    async function handleSubmit(event: {
        currentTarget: EventTarget & HTMLFormElement;
    }) {
        const data = new FormData(event.currentTarget);

        files.forEach((file, index) => {
            data.append(`file-${index}`, file);
        });
        formLoading = true;

        const response = await fetch(event.currentTarget.action, {
            method: "POST",
            body: data,
        });
        formLoading = false;

        const result: ActionResult = deserialize(await response.text());

        if (result.type === "success") {
            // rerun all `load` functions, following the successful update
            await invalidateAll();
        }

        applyAction(result);
    }

    let formLoading = false;
</script>

<div class="px-4 py-12 sm:px-6 lg:px-8 min-h-[100vh]">
    <div class="flex flex-col lg:flex-row gap-[10%]">
        <form
            method="post"
            enctype="multipart/form-data"
            class="w-full lg:w-1/2 md:w-1/3"
            on:submit|preventDefault={handleSubmit}
        >
            <h1 class="text-3xl font-bold tracking-tight">Creare Club Nou</h1>
            <p class="my-3 text-lg text-muted-foreground">
                Completați detaliile pentru noul club.
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
            <div class="mt-4">
                <Label for="files">Imagini pentru Galerie</Label>

                <div
                    class="mt-1 flex justify-center rounded-md border-2 border-dashed border-muted px-6 pb-6 pt-5"
                >
                    <div class="space-y-1 text-center">
                        <CloudUpload
                            class="mx-auto h-12 w-12 text-muted-foreground"
                        />
                        <div class="flex text-sm text-muted-foreground">
                            <label
                                for="files"
                                class="relative cursor-pointer rounded-md font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-accent"
                            >
                                <span>Încărcați imagini</span>
                                <Input
                                    id="files"
                                    type="file"
                                    multiple
                                    accept=".jpg,.jpeg,.png"
                                    class="sr-only"
                                    on:change={handleFileChange}
                                />
                            </label>
                            <p class="pl-1">sau trageți și plasați</p>
                        </div>
                        <p class="text-xs text-muted-foreground">
                            Fișiere JPG și PNG de până la 10MB
                        </p>
                    </div>
                </div>
                {#if files.length > 0}
                    <div class="mt-2 flex flex-col items-start justify-between">
                        {#each files as file}
                            <div
                                class="mt-2 flex w-full items-center justify-between rounded-lg bg-secondary p-2"
                            >
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    class="h-10 w-10 rounded-md object-cover"
                                />
                                <p class="ml-4 flex-1">{file.name}</p>
                                <Button
                                    variant="ghost"
                                    on:click={() => {
                                        files = files.filter((f) => f !== file);
                                    }}
                                >
                                    <Trash2 class="h-4 w-4" />
                                </Button>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>

            <div class="mt-4 flex justify-end">
                <Button
                    type="submit"
                    class={"bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary" +
                        (formLoading
                            ? " cursor-not-allowed bg-primary-foreground text-primary"
                            : "")}
                >
                    Creează Club
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
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
