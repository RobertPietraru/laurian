<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import { Textarea } from "$lib/components/ui/textarea";
    import SvelteMarkdown from 'svelte-markdown';

    let aboutContent = '';

    function handleSubmit() {
        // TODO: Implement submission logic to update the about page content
    }
</script>

<main class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Edit About Page</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card.Root>
            <Card.Header>
                <Card.Title>Edit Content</Card.Title>
            </Card.Header>
            <Card.Content>
                <form on:submit|preventDefault={handleSubmit}>
                    <Textarea
                        bind:value={aboutContent}
                        placeholder="Enter the about page content here..."
                        class="w-full mb-4"
                    />
                    <Button type="submit">Save Changes</Button>
                </form>
            </Card.Content>
        </Card.Root>

        <Card.Root>
            <Card.Header>
                <Card.Title>Preview</Card.Title>
            </Card.Header>
            <Card.Content>
                <div class="prose">
                    <SvelteMarkdown source={aboutContent} />
                </div>
            </Card.Content>
        </Card.Root>
    </div>
</main>

<style>
    :global(.prose) {
        max-width: none;
    }
</style>
