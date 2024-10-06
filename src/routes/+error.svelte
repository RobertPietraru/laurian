<script lang="ts">
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
</script>

<div class="flex items-center justify-center h-screen " in:fade={{ duration: 300, delay: 300 }}>
	<div class="bg-white p-8 md:p-12 rounded-lg shadow-lg text-center" in:fly={{ y: 50, duration: 500, delay: 300 }}>
		<h1 class="text-6xl text-red-500 m-0 leading-none">{$page.status}</h1>
		<p class="text-2xl text-gray-700 my-4">{$page.error?.message}</p>
		<p class="text-lg text-gray-500 mb-8">Ne pare rău, a apărut o eroare.</p>
		<a href="/" class="inline-block px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">Înapoi la pagina principală</a>
	</div>
</div>
