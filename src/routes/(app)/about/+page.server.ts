export const load = async ({ locals }) => {
    const team = await locals.authRepository?.getAllModerators();

    const gallery = [
        "https://uuzzqlrxkrwvdpxbkavv.supabase.co/storage/v1/object/public/laurianbucket/poze/WhatsApp%20Image%202024-10-30%20at%2014.30.47_61babf76.jpg",
        "https://uuzzqlrxkrwvdpxbkavv.supabase.co/storage/v1/object/public/laurianbucket/poze/WhatsApp%20Image%202024-10-30%20at%2014.30.48_3b8f479b.jpg",
        "https://uuzzqlrxkrwvdpxbkavv.supabase.co/storage/v1/object/public/laurianbucket/poze/WhatsApp%20Image%202024-10-30%20at%2014.30.48_c32138b6.jpg",
        "https://uuzzqlrxkrwvdpxbkavv.supabase.co/storage/v1/object/public/laurianbucket/poze/WhatsApp%20Image%202024-10-30%20at%2014.30.48_c7de3519.jpg",
    ];

    const missionImage = "https://uuzzqlrxkrwvdpxbkavv.supabase.co/storage/v1/object/public/laurianbucket/poze/WhatsApp%20Image%202024-10-30%20at%2014.30.49_f4ea2c6a.jpg";

    const projectDescription = `Proiectul nostru are ca scop prezentarea tuturor cluburilor pe care liceul nostru le oferă. Prin această platformă, dorim să evidențiem diversitatea activităților extracurriculare disponibile pentru elevi, oferind o imagine completă a oportunităților de dezvoltare personală și profesională. Fiecare club este prezentat în detaliu, permițând elevilor să descopere și să se alăture comunităților care le reflectă cel mai bine interesele și pasiunile.`;
    const sortedTeam = team?.sort((a, b) => a.role.localeCompare(b.role));

    return {
        team: sortedTeam ?? [],
        gallery,
        missionImage,
        projectDescription
    };
};
