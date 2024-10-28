<script lang="ts">
    import { enhance } from "$app/forms";
    import { toast } from "svelte-sonner";
    import type { ActionData } from "./$types.js";
    import { Button } from "$lib/components/ui/button";
    import { Label } from "$lib/components/ui/label";
    import { Input } from "$lib/components/ui/input";
    import { Textarea } from "$lib/components/ui/textarea";
    import {
        Card,
        CardContent,
        CardHeader,
        CardTitle,
    } from "$lib/components/ui/card";
    import { CloudUpload } from "lucide-svelte";

    export let data;
    export let form: ActionData;

    let image: File | string | null = data.user?.image ?? null;

    function handleImageChange(event: Event) {
        image = (event.target as HTMLInputElement).files?.[0] ?? null;
    }
</script>

<div class="w-full max-w-2xl mx-auto px-4 sm:px-6 py-6">
    <Card class="w-full">
        <CardHeader>
            <CardTitle class="text-2xl sm:text-3xl">Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
            <form
                method="POST"
                use:enhance={() => {
                    return async ({ result }) => {
                        if (result.type === "success") {
                            toast.success("Profile updated successfully!");
                        }
                    };
                }}
                enctype="multipart/form-data"
                class="space-y-6"
            >
                <div class="flex flex-col gap-6 items-center">
                    <label
                        for="profile-image"
                        class="cursor-pointer relative group block w-1/2"
                    >
                        <Input
                            type="file"
                            id="profile-image"
                            name="image"
                            accept="image/*"
                            on:change={handleImageChange}
                            class="sr-only"
                        />
                        {#if image}
                            {#if typeof image === "string"}
                                <img
                                    src={image}
                                    alt="Profile preview"
                                    class="w-full aspect-square rounded-full object-cover"
                                />
                            {:else}
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Profile preview"
                                    class="w-full aspect-square rounded-full object-cover"
                                />
                            {/if}
                            <div
                                class="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            >
                                <span class="text-white text-sm sm:text-base"
                                    >Edit Image</span
                                >
                            </div>
                        {:else}
                            <div
                                class="w-full aspect-square rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 relative"
                            >
                                <span
                                    class="text-muted-foreground text-sm sm:text-base"
                                    >No image</span
                                >
                                <div
                                    class="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                >
                                    <span
                                        class="text-white text-sm sm:text-base"
                                        >Add Image</span
                                    >
                                </div>
                            </div>
                        {/if}
                    </label>
                </div>
                <div class="w-full space-y-4">
                    <div class="space-y-2">
                        <Label for="name">Name</Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={data.user?.name}
                            class="w-full"
                        />
                    </div>
                    <div class="space-y-2">
                        <Label for="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            class="w-full min-h-[120px]"
                            value={data.user?.description}
                        ></Textarea>
                    </div>
                </div>
                <div class="flex justify-end">
                    <Button type="submit" class="w-full sm:w-auto"
                        >Save Changes</Button
                    >
                </div>
            </form>
        </CardContent>
    </Card>
</div>
