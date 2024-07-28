<script lang="ts">
  import Menu from "lucide-svelte/icons/menu";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import Sun from "lucide-svelte/icons/sun";
  import Moon from "lucide-svelte/icons/moon";
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button/index.js";
  import logo from "$lib/assets/logo.png";
  import laurian from "$lib/assets/laurian.png";
</script>

<div class="flex min-h-screen w-full flex-col">
  <header
    class="bg-background sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6"
  >
    <a
      href="/"
      class="flex items-center gap-2 text-lg font-semibold md:text-base"
    >
      <img src={logo} alt="A.T. Laurian" class="h-6 w-6" />
      <span class="sr-only">A.T. Laurian</span>
    </a>

    <div class="flex-grow"></div>
    <Button
      on:click={toggleMode}
      variant={"ghost"}
      size="icon"
      class="text-muted-foreground hover:text-foreground transition-none"
    >
      <Sun
        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 "
      />
      <Moon
        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span class="sr-only">Schimba tema</span>
    </Button>
    <nav
      class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
    >
      <a
        href="##"
        class="text-muted-foreground hover:text-foreground transition-colors"
      >
        Cluburi
      </a>
      <a
        href="##"
        class="text-muted-foreground hover:text-foreground transition-colors"
      >
        Despre
      </a>
    </nav>
    <Sheet.Root>
      <Sheet.Trigger asChild let:builder>
        <Button
          variant="ghost"
          size="icon"
          class="shrink-0 md:hidden"
          builders={[builder]}
        >
          <Menu class="h-5 w-5" />
          <span class="sr-only">Meniu Navigare</span>
        </Button>
      </Sheet.Trigger>
      <Sheet.Content side="right">
        <nav class="grid gap-6 text-lg font-medium">
          <a href="/" class="flex items-center gap-2 text-lg font-semibold">
            <img src={logo} alt="Acme Inc" class="h-6 w-6" />
            <span class="sr-only">Acme Inc</span>
          </a>
          <a href="##" class="text-muted-foreground hover:text-foreground">
            Acasa
          </a>
          <a href="##" class="text-muted-foreground hover:text-foreground">
            Cluburi
          </a>
          <a href="##" class="text-muted-foreground hover:text-foreground">
            Despre
          </a>
        </nav>
      </Sheet.Content>
    </Sheet.Root>
  </header>

  <section
    class="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10"
    style="height: calc(100vh - 4rem);"
  >
    <div class="text-center lg:text-start space-y-6">
      <main class="text-5xl md:text-6xl font-bold">
        <h1 class="font-bold">
          Colegiul Naţional „A. T.
          <span
            class="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text"
            >Laurian</span
          >” Botoşani
        </h1>
      </main>
      <p class="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
        Avem o varietate de cluburi și activități care îți vor dezvolta
        abilitățile, îți vor hrăni pasiunea și te vor motiva să continui
      </p>
      <div class="space-y-4 md:space-y-0 md:space-x-4">
        <button
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full md:w-1/3"
          >Descoperă</button
        ><a
          rel="noreferrer noopener"
          href="https://github.com/RobertPietraru/laurian"
          target="_blank"
          class="w-full md:w-1/3 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >Repository Github<svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="ml-2 w-5 h-5"
            ><path
              d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path></svg
          ></a
        >
      </div>
    </div>
    <img src={laurian} alt="A.T. Laurian" class="" />
  </section>
</div>
