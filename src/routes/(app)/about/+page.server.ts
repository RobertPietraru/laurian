export const load = async ({ locals }) => {
    const team = await locals.authRepository?.getAllModerators();

    const gallery = [
"/about/awards.jpg",
"/about/beach.jpg",
"/about/building.jpg",
"/about/computers.jpg",
"/about/vart.jpg",
    ];

    const missionImage = "/about/beach.jpg";

    const projectDescription = `Proiectul nostru are ca scop prezentarea tuturor cluburilor pe care liceul nostru le oferă. Prin această platformă, dorim să evidențiem diversitatea activităților extracurriculare disponibile pentru elevi, oferind o imagine completă a oportunităților de dezvoltare personală și profesională. Fiecare club este prezentat în detaliu, permițând elevilor să descopere și să se alăture comunităților care le reflectă cel mai bine interesele și pasiunile.`;
    const sortedTeam = team?.sort((a, b) => a.role.localeCompare(b.role));

    return {
        team: sortedTeam ?? [],
        gallery,
        missionImage,
        projectDescription
    };
};
