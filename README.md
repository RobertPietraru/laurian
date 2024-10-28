# Site cluburi laurian

Cluburi din laurian

## Descriere

O lista cu toate cluburile din laurian

## Caracteristici

- Prezentare detaliată a fiecărui club
- Galerie de imagini pentru fiecare club
- Pagină "Despre noi" cu informații despre echipa din spatele proiectului
- Integrare cu Supabase pentru gestionarea datelor și stocarea fișierelor

## Tehnologii Utilizate

- SvelteKit
- TypeScript
- Supabase
- Tailwind CSS
- ShadCN

## Configurare și Instalare

1. Clonați repository-ul:
   ```
   git clone https://github.com/RobertPietraru/laurian
   ```

2. Instalați dependențele:
   ```
   cd laurian
   npm install
   ```

3. Configurați variabilele de mediu:
   Creați un fișier `.env` în directorul rădăcină și adăugați următoarele variabile (înlocuiți valorile cu cele proprii):
   ```
    POSTGRES_URL
    POSTGRES_PRISMA_URL
    SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_URL
    POSTGRES_URL_NON_POOLING
    SUPABASE_JWT_SECRET
    POSTGRES_USER
    NEXT_PUBLIC_SUPABASE_ANON_KEY
    POSTGRES_PASSWORD
    POSTGRES_DATABASE
    SUPABASE_SERVICE_ROLE_KEY
    POSTGRES_HOST
    NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

4. Rulați aplicația în modul de dezvoltare:
   ```
   npm run dev
   ```

## Structura Proiectului

- `src/routes`: Conține paginile și rutele aplicației
- `src/lib`: Conține componentele și modelele reutilizabile
- `static`: Fișiere statice precum imagini și fonturi

## Contribuție

Suntem deschiși contribuțiilor! Dacă doriți să contribuiți la acest proiect, vă rugăm să creați un pull request cu modificările propuse.

## Typescript types generation

```npx supabase gen types --lang=typescript --project-id "$reference" --schema public > src/lib/types/database.types.ts```


## Licență

Acest proiect este licențiat sub [GNU Affero General Public License v3.0](LICENSE).
