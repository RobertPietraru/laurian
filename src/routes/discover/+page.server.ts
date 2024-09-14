import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const clubs = [
        {
            title: "Ghilotina",
            description: "Cel mai smek club",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80",
            members: 20,
            url: "/club/ghilotina"
        },
        {
            title: "Drama",
            description: "Ceva cu teatru, dar mai bun",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80",
            members: 20,
            url: "/club/drama"
        },
        {
            title: "Katharsis",
            description: "Ceva cu teatru",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80",
            members: 10,
            url: "/club/katharsis",
        },
    ];

    const pageTitle = "Descoperă toate cluburile din liceul nostru";

    return {
        clubs,
        pageTitle
    };
};
