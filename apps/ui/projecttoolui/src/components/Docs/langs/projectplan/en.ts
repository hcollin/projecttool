import { IDocLang } from "../iDocLang";

export const PROJECTPLAN_EN: IDocLang = {
    resource: {
        hourlyprice: "Hourly price: ",
    },
    typetitle: "Project Plan",
    headers: {
        phases: "Project Phases",
    },
    phases: {
        intro: "The project is divided into %1 phases. Altough each phase is described as a separate part in this document, they are all interconnected and contribute to the overall success of the project. Most phases cannot start until the previous one is completed.",
        requirementintro:
            "Requirement phase involves gathering and documenting more detailed project requirements from stakeholders. This phase ensures that all parties have a clear understanding of what the project aims to achieve.",
        designintro:
            "Design phase focuses on creating the overall architecture and design of the solution. This includes high-level system architecture, database design, user interface design, and other technical specifications.",
        implementationintro:
            "Implementation phase is where the actual development and coding of the solution takes place. This phase involves writing code, conducting unit tests, and integrating various components to build a functional system.",
        testingintro:
            "Testing phase involves rigorous testing of the developed solution to identify and fix any defects or issues. This includes functional testing, performance testing, security testing, and user acceptance testing to ensure the solution meets the specified requirements.",
        deploymentintro:
            "Deployment phase focuses on deploying the tested solution to the production environment. This phase includes activities such as data migration, user training, and post-deployment support to ensure a smooth transition and successful adoption of the new system.",
        pocimplementationintro:
            "Proof of Concept (PoC) Implementation phase is a preliminary phase where a small-scale version of the solution is developed to demonstrate its feasibility and potential benefits. This phase helps stakeholders evaluate the viability of the project before committing to full-scale implementation.",
        mvpimplementationintro:
            "Minimum Viable Product (MVP) Implementation phase focuses on developing a basic version of the solution that includes only the essential features required to meet the core needs of users. This phase allows for early feedback and validation of the product concept before further development.",
        v1implementationintro:
            "Version 1.0 implementation phase involves the development of the first complete version of the solution, incorporating additional features and enhancements beyond the MVP. This phase aims to deliver a more robust and feature-rich product to users while addressing any issues identified during the MVP phase.",
    },
};
