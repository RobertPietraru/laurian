<script lang="ts">
    import type { ActionData, PageData } from "./$types";
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

    export let data: PageData;
    export let form: ActionData;
</script>

<div class="h-full flex items-center justify-center min-h-[100vh]">
    <Card class="w-[350px] m-8">
        <CardHeader >
            <CardTitle>Autentificare</CardTitle>
        </CardHeader>
        <CardContent>
            {#if form?.message}
                <Alert variant="destructive" class="mb-6">
                    <AlertDescription>{form.message}</AlertDescription>
                </Alert>
            {/if}
            <form action="?/login" method="post" class="space-y-6">
                <div class="space-y-3">
                    <Label for="email">E-Mail</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="mail@exemplu.com"
                        required
                        value={form?.email}
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
                    />
                </div>
                <Button type="submit" class="w-full mt-4">Autentificare</Button>
            </form>
        </CardContent>
        <CardFooter>
            <Button variant="outline" class="w-full" href="/register"
                >Înregistrare</Button
            >
        </CardFooter>
    </Card>
</div>
