<script lang="ts">
    import type { ActionData } from "./$types";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Alert, AlertDescription } from "$lib/components/ui/alert";
    import {
        Card,
        CardHeader,
        CardTitle,
        CardContent,
        CardFooter,
    } from "$lib/components/ui/card";

    export let form: ActionData;
    let message: string | null = form?.message ?? null;
    function resetMessage() {
        message = null;
    }
</script>

<div class="h-full flex items-center justify-center min-h-[100vh]">
    <Card class="w-[350px] m-8">
        <CardHeader>
            <CardTitle>Înregistrare</CardTitle>
        </CardHeader>
        <CardContent>
            {#if message}
                <Alert variant="destructive" class="mb-6">
                    <AlertDescription>{message}</AlertDescription>
                </Alert>
            {/if}
            <form action="?/register" method="post" class="space-y-6">
                <div class="space-y-3">
                    <Label for="name">Nume</Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Numele tău"
                        required
                        value={form?.name}
                        on:input={resetMessage}
                    />
                </div>
                <div class="space-y-3">
                    <Label for="email">E-Mail</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="mail@exemplu.com"
                        required
                        value={form?.email}
                        on:input={resetMessage}
                    />
                </div>
                <div class="space-y-3">
                    <Label for="password">Parolă</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Parolă"
                        required
                        value={form?.password}
                        on:input={resetMessage}
                    />
                </div>
                <Button type="submit" class="w-full mt-4">Înregistrare</Button>
            </form>
        </CardContent>
        <CardFooter>
            <Button variant="outline" class="w-full" href="/login"
                >Autentificare</Button
            >
        </CardFooter>
    </Card>
</div>
