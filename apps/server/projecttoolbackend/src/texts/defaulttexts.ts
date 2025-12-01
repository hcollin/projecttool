import { IText } from "@frosttroll/projecttoolmodels";

export const DEFAULT_TEXTS: IText[] = [
    {
        guid: "default-text-java-openjdk-spring-fi",
        organizationId: "default-org",
        content:
            "Java on alun perin Sun Microsystemsin kehittämä ja nykyisin Oraclen ylläpitämä teknologiaympäristö. Java kieli vaatii toimiakseen Java virtuaalikoneen (Java Virtual Machine eli JVM), jonka avulla lähdekoodista käännettyä binäärikoodia ajetaan. JVM ajoympäristöjä on useita, joista osa on kaupallisia ja osa avoimia. Javan referenssitoteutus ja ajoympäristö on avoimen lähdekoodin OpenJDK, jota myös tämän hankkeen toteuttamisessa hyödynnetään.\n\nJärjestelmän taustapalveluiden teknologiavalinnoissa valinnassa on päädytty ratkaisuun, joka perustuu pääosiltaan Javateknologiaan ja Spring Boot palvelukehykseen. Tämä mahdollistaa taustajärjestelmien alustariippumattomuuden, eli taustajärjestelmää voidaan suorittaa erilaisilla laitteisto- ja ohjelmisto alustoilla tuotannossa, huolimatta siitä missä ympäristöllä varsinainen kehitys on tehty. Java ekosysteemi on yleisesti käytössä web-pohjaisten sovellusten taustajärjestelmänä, joten sille löytyy hyvin sekä kehittäjiä että laajasti käytössä olevia avoimen lähdekoodin kirjastoja ja sovellus kehyksiä. Java Spring boot taas on avoimen lähdekoodin sovelluskehys, joka on suunniteltu yksinkertaistamaan kehitys prosessia Java Spring-sovelluksille. Spring- ekosysteemi on suosittu ja se on laajasti käytössä Javakehitysyhteisössä.",
        keywords: ["java", "openjdk", "technology", "backend", "general"],
        name: "OpenJDK ja Java Spring Boot",
        language: "fi",
        langlinks: {
            en: "default-text-java-openjdk-spring-en",
        },
    },
    {
        guid: "default-text-java-openjdk-spring-en",
        organizationId: "default-org",
        content:
            "Java is a technology environment originally developed by Sun Microsystems and currently maintained by Oracle. The Java language requires a Java Virtual Machine (JVM) to operate, which runs the binary code compiled from the source code. There are several JVM runtime environments, some of which are commercial and others open source. The reference implementation and runtime environment for Java is the open-source OpenJDK, which is also utilized in the implementation of this project.\n\nIn the selection of technologies for the system's backend services, a solution based mainly on Java technology and the Spring Boot framework has been chosen. This enables platform independence for the backend systems, meaning the backend system can run on various hardware and software platforms in production, regardless of the environment in which the actual development was done. The Java ecosystem is commonly used as the backend for web-based applications, so it has a large pool of developers as well as widely used open-source libraries and application frameworks. Java Spring Boot, on the other hand, is an open-source application framework designed to simplify the development process for Java Spring applications. The Spring ecosystem is popular and widely used within the Java development community.",
        keywords: ["java", "openjdk", "technology", "backend", "general"],
        name: "OpenJDK and Java Spring Boot",
        language: "en",
        langlinks: {
            fi: "default-text-java-openjdk-spring-fi",
        },
    },
    {
        guid: "default-text-react-typescript-frontend-en",
        organizationId: "default-org",
        content:
            "TypeScript is a modern programming language developed and maintained by Microsoft. It builds on JavaScript by adding static typing and advanced language features, which help developers catch errors early and write more maintainable code. TypeScript code is compiled to standard JavaScript, ensuring compatibility with all major browsers and JavaScript environments.\n\nFor the frontend of this system, the React library has been selected alongside TypeScript. React is an open-source JavaScript library created by Meta (Facebook) for building user interfaces, especially single-page applications. It enables the creation of interactive and dynamic web applications with reusable components, improving development efficiency and code organization. The combination of TypeScript and React is widely adopted in the web development community, offering strong tooling, a large ecosystem of libraries, and a robust developer community. This approach ensures a scalable, maintainable, and high-performance frontend architecture.",
        keywords: ["react", "typescript", "technology", "frontend", "general"],
        name: "React and TypeScript Frontend",
        language: "en",
        langlinks: {
            fi: "default-text-react-typescript-frontend-fi",
        },
    },
    {
        guid: "default-text-react-typescript-frontend-fi",
        organizationId: "default-org",
        content:
            "TypeScript is a modern programming language developed and maintained by Microsoft. It builds on JavaScript by adding static typing and advanced language features, which help developers catch errors early and write more maintainable code. TypeScript code is compiled to standard JavaScript, ensuring compatibility with all major browsers and JavaScript environments.\n\nFor the frontend of this system, the React library has been selected alongside TypeScript. React is an open-source JavaScript library created by Meta (Facebook) for building user interfaces, especially single-page applications. It enables the creation of interactive and dynamic web applications with reusable components, improving development efficiency and code organization. The combination of TypeScript and React is widely adopted in the web development community, offering strong tooling, a large ecosystem of libraries, and a robust developer community. This approach ensures a scalable, maintainable, and high-performance frontend architecture.",
        keywords: ["react", "typescript", "technology", "frontend", "general"],
        name: "React ja TypeScript",
        language: "fi",
        langlinks: {
            en: "default-text-react-typescript-frontend-en",
        },
    },
    {
        guid: "default-text-acceptance-process-fi",
        organizationId: "default-org",

        content:
            "Tilaajan tuoteomistaja ja/tai hänen valtuuttamansa henkilö hyväksyy kehitystyön tulokset. Työn suunnitteluvaiheessa käydään läpi hyväksymiskriteerit ja toteutus tehdään kattamaan nämä hyväksymiskriteerit. Kriteerit ja niiden hyväksyminen dokumentoidaan kyseisille Jira-tiketeille (toimittajan projektinhallintajärjestelmä). Projektin tuotoksina valmistuvat dokumentit hyväksyvät Tilaajan tuoteomistaja tai hänen valtuuttama henkilö. Projektin valmiiksi hyväksyy ohjausryhmä.\n\nTilaajan suorittama hyväksymistestaus tehdään, kun testaukseen sovittu kokonaisuus on valmistunut ja Toimittajan testausvaiheet ovat suoritettuina. Hyväksymistestaus dokumentteineen on Tilaajan vastuulla. Toimittaja avustaa tehtävässä tarvittaessa ja erikseen sopien.\n\nHyväksymistestauksen huomiot kirjataan yhteisesti sovitulla tavalla, esimerkiksi Jiraan. Testattavalle Jira-tiketille kirjataan mahdollinen testaushavainto ja sen edellyttämät liitteet. Kehittäjä korjaa virheet ja virheiden korjausjärjestyksen tekemiseen osallistuu myös Tilaajan edustaja, esimerkiksi Tuoteomistaja ja testausvastuullinen. Hyväksymistestauksen tarkempi aikataulutus tehdään projektipäälliköiden toimesta, kun kehitystyö on edennyt.",
        keywords: ["acceptance", "process", "general", "management", "Hyväksymismenettely"],
        name: "Hyväksymismenettely",
        language: "fi",
        langlinks: {},
    },
];
