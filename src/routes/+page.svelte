<script lang="ts">
  import Activity from "lucide-svelte/icons/activity";
  import ArrowUpRight from "lucide-svelte/icons/arrow-up-right";
  import CircleUser from "lucide-svelte/icons/circle-user";
  import CreditCard from "lucide-svelte/icons/credit-card";
  import DollarSign from "lucide-svelte/icons/dollar-sign";
  import Menu from "lucide-svelte/icons/menu";
  import Package2 from "lucide-svelte/icons/package-2";
  import Search from "lucide-svelte/icons/search";
  import Users from "lucide-svelte/icons/users";

  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import Sun from "lucide-svelte/icons/sun";
  import Moon from "lucide-svelte/icons/moon";
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button/index.js";
  import logo from "$lib/assets/logo.png";
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
    <Button on:click={toggleMode} variant={"ghost"} size="icon" class="text-muted-foreground hover:text-foreground transition-none">
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
  <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8"></main>
</div>
