import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const team = [
        {
            name: "Ion Popescu",
            role: "Director",
            image: "https://i.pravatar.cc/150?img=1",
        },
        {
            name: "Maria Ionescu",
            role: "Profesor coordonator",
            image: "https://i.pravatar.cc/150?img=5",
        },
        {
            name: "Andrei Popa",
            role: "Președinte Consiliul Elevilor",
            image: "https://i.pravatar.cc/150?img=3",
        },
        // ... add more team members as needed
    ];

    const gallery = [
        "https://picsum.photos/800/600?random=1",
        "https://picsum.photos/800/600?random=2",
        "https://picsum.photos/800/600?random=3",
        "https://picsum.photos/800/600?random=4",
        // ... add more gallery images as needed
    ];

    const missionImage = "https://picsum.photos/600/400";

    const projectDescription = `Proiectul nostru are ca scop prezentarea tuturor cluburilor pe care liceul nostru le oferă. Prin această platformă, dorim să evidențiem diversitatea activităților extracurriculare disponibile pentru elevi, oferind o imagine completă a oportunităților de dezvoltare personală și profesională. Fiecare club este prezentat în detaliu, permițând elevilor să descopere și să se alăture comunităților care le reflectă cel mai bine interesele și pasiunile.`;

    return {
        team,
        gallery,
        missionImage,
        projectDescription
    };
};
