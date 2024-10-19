<script lang="ts">
    import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
</script>

<div class="flex items-center justify-center min-h-screen p-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-12 w-full max-w-4xl">
        <a href="/admin/users" >
            <Card class="h-full transition-transform hover:scale-105 cursor-pointer">
                <CardHeader>
                    <CardTitle>Utilizatori</CardTitle>
                </CardHeader>
                <CardContent>
                    <p class="text-blue-500">Gestionează Utilizatori</p>
                </CardContent>
            </Card>
        </a>
         
        <a href="/admin/clubs" >
            <Card class="h-full transition-transform hover:scale-105 cursor-pointer">
                <CardHeader>
                    <CardTitle>Cluburi</CardTitle>
                </CardHeader>
                <CardContent>
                    <p class="text-blue-500">Gestionează Cluburi</p>
                </CardContent>
            </Card>
        </a>
    </div>
</div>