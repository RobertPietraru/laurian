<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import {
        Card,
        CardContent,
        CardHeader,
        CardTitle,
    } from "$lib/components/ui/card";
    import type { AppUser } from "$lib/features/auth/models";

    export let data;
</script>

<div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
>
    {#each data.users as user}
        <Card>
            <CardHeader>
                <CardTitle>{user.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p class="text-md">{user.email}</p>
                <p class="text-sm text-muted-foreground mb-4">
                    Role: {user.role}
                </p>
                {#if user.role === "user"}
                    <form action="?/makeModerator" method="POST">
                        <input type="hidden" name="userId" value={user.id}>
                        <Button type="submit" variant="default">Fa-l moderator</Button>
                    </form>
                {/if}

                {#if user.role === "moderator"}
                    <form action="?/removeModerator" method="POST">
                        <input type="hidden" name="userId" value={user.id}>
                        <Button type="submit" variant="default">Retrage moderator</Button>
                    </form>
                    <a href="/admin/user/{user.id}">
                        <Button>Modifica cluburi la care e editor</Button>
                    </a>
                {/if}

                {#if user.role === "admin"}
                    <h1>!ADMIN!</h1>
                {/if}
            </CardContent>
        </Card>
    {/each}
</div>

<div class="flex justify-center mt-4 space-x-4">
    {#if data.index > 1}
        <Button href={`/admin/users?page=${data.index - 1}`}>
            Previous Page
        </Button>
    {/if}
    {#if data.lastIndex < data.total}
        <Button href={`/admin/users?page=${data.lastIndex + 1}`}>
            Next Page
        </Button>
    {/if}
</div>
