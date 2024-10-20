<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import {
        Table,
        TableBody,
        TableCell,
        TableHead,
        TableHeader,
        TableRow,
    } from "$lib/components/ui/table";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { onMount } from "svelte";
    import { toast } from "svelte-sonner";
    import { logger } from "$lib/stores/logger.js";

    export let data;

    let selectedClubIds: string[] = [];
    let isLoading = false;

    onMount(() => {
        selectedClubIds = data.clubs
            .filter((club) => club.isEditor)
            .map((club) => club.id);
    });

    function handleCheckboxChange(clubId: string) {
        if (selectedClubIds.includes(clubId)) {
            selectedClubIds = selectedClubIds.filter((id) => id !== clubId);
        } else {
            selectedClubIds = [...selectedClubIds, clubId];
        }
    }

    async function handleSubmit() {
        isLoading = true;
        const form = new FormData();
        form.append("userId", data.user.id);
        form.append("selectedClubIds", JSON.stringify(selectedClubIds));
        form.append(
            "clubIds",
            JSON.stringify(data.clubs.map((club) => club.id)),
        );

        try {
            const response = await fetch("?/clubModerationUpdate", {
                method: "POST",
                body: form,
            });

            if (response.ok) {
                toast.success(
                    "Permisiunile utilizatorului au fost actualizate cu succes",
                );
            } else {
                toast.error("A apărut o eroare la actualizarea permisiunilor");
            }
        } catch (error) {
            logger.error(`Error updating club permissions for ${data.user.id}: `, error);
            toast.error("A apărut o eroare la actualizarea permisiunilor");
        } finally {
            isLoading = false;
        }
    }
</script>

<main class="h-[100vh] p-8">
    {#if data.user.role === "moderator"}
        <h2 class="text-2xl font-bold mb-4">
            Editeaza permisiunile de club pentru {data.user.name} ({data.user
                .email})
        </h2>

        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID Club</TableHead>
                    <TableHead>Nume Club</TableHead>
                    <TableHead>Este editor</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {#each data.clubs as club}
                    <TableRow>
                        <TableCell class="w-1/5">{club.id}</TableCell>
                        <TableCell>{club.name}</TableCell>
                        <TableCell>
                            <Checkbox
                                checked={selectedClubIds.includes(club.id)}
                                onCheckedChange={() =>
                                    handleCheckboxChange(club.id)}
                            />
                        </TableCell>
                    </TableRow>
                {/each}
            </TableBody>
        </Table>
    {/if}
</main>

{#if data.user.role === "moderator"}
    <div class="fixed bottom-4 flex justify-center w-full">
        <Button on:click={handleSubmit} disabled={isLoading}>
            {#if isLoading}
                Updating...
            {:else}
                Update Club Permissions
            {/if}
        </Button>
    </div>
{/if}
