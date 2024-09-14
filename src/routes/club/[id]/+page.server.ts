export const load = async ({ params }) => {
    const { id } = params;
    let club;
    let gallery;

    switch (id) {
        case 'ghilotina':
            club = {
                title: "Ghilotina",
                description: `
# Ghilotina - Cel mai fain club

Aici, elevii au oportunitatea de a explora lumea fascinantă a jurnalismului și a publicațiilor școlare. Prin proiecte practice și colaborări, membrii clubului își dezvoltă abilitățile în domenii precum scrierea, editarea și designul grafic.

## Activitățile noastre includ:

- Ateliere de scriere creativă
- Sesiuni de editare și revizuire
- Producerea revistei școlare
- Colaborări cu jurnaliști profesioniști

Indiferent dacă ești pasionat de scris sau dorești să explorezi lumea jurnalismului, Ghilotina îți oferă un mediu stimulant pentru a-ți dezvolta abilitățile și a face primii pași către o carieră în media.
                `,
            };
            break;
        case 'drama':
            club = {
                title: "Drama",
                description: `
# Drama - Ceva cu teatru, dar mai bun

Clubul Drama este dedicat pasionaților de artele spectacolului. Aici, elevii au șansa de a explora diverse aspecte ale teatrului, de la actorie și regie până la scenografie și producție. Prin repetiții, workshopuri și spectacole, membrii clubului își dezvoltă încrederea în sine, creativitatea și abilitățile de comunicare.

## Activitățile noastre includ:

- Ateliere de actorie și improvizație
- Producții teatrale
- Vizite la teatre profesioniste
- Colaborări cu actori și regizori

Fie că visezi la o carieră pe scenă sau doar vrei să-ți dezvolți abilitățile de exprimare, Clubul Drama îți oferă oportunitatea perfectă de a străluci.
                `,
            };
            break;
        case 'katharsis':
            club = {
                title: "Katharsis",
                description: `
# Katharsis - Ceva cu teatru

Katharsis este un club dedicat explorării teatrului ca formă de expresie și terapie. Aici, elevii au oportunitatea de a descoperi puterea transformatoare a artei dramatice, folosind-o ca instrument de auto-cunoaștere și dezvoltare personală. Prin exerciții de teatru, jocuri de rol și producții experimentale, membrii clubului își explorează emoțiile, confruntă provocări personale și dezvoltă empatia.

## Activitățile noastre includ:

- Ateliere de teatru antic
- Sesiuni de scriere creativă și dramatizare
- Spectacole interactive și forum theatre
- Colaborări cu actorii și regizorii

Dacă ești interesat să descoperi cum teatrul poate fi o cale de vindecare și creștere personală, Katharsis este locul perfect pentru tine.
                `,
            };
            break;
        default:
            throw new Error(`Club with id ${id} not found`);
    }

    gallery = [
        `https://picsum.photos/800/600?random=${id}1`,
        `https://picsum.photos/800/600?random=${id}2`,
        `https://picsum.photos/800/600?random=${id}3`,
        `https://picsum.photos/800/600?random=${id}4`,
        `https://picsum.photos/800/600?random=${id}5`,
        `https://picsum.photos/800/600?random=${id}6`,
    ];

    return {
        club,
        gallery
    };
};
