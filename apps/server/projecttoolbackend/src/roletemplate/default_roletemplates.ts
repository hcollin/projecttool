import { IRoleTemplate, ROLESENIORITY } from "@frosttroll/projecttoolmodels";

export const DEFAULT_ROLETEMPLATES: IRoleTemplate[] = [
    // Management
    {
        guid: "role-manager-project",
        name: "Project Manager",
        groups: ["Management"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD],
        description:
            "Oversees project planning, execution, and delivery, ensuring goals are met on time and within budget.",
        texts: ["default-text-role-projectmanager-fi"],
        defaultTextGuid: "default-text-role-projectmanager-fi",
    },
    {
        guid: "role-manager-product",
        name: "Product Manager",
        groups: ["Management"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD],
        description:
            "Defines product vision, strategy, and roadmap, and coordinates cross-functional teams to deliver product success.",
    },

    {
        guid: "role-services-manager",
        name: "Services Manager",
        groups: ["Management"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR],
        description: "Manages service delivery, client relationships, and ensures high-quality support and operations.",
    },

    // Agile
    {
        guid: "role-manager-productowner",
        name: "Product Owner",
        groups: ["Agile"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
        description:
            "Represents stakeholders, manages the product backlog, and ensures the development team delivers value to the business.",
    },
    {
        guid: "role-manager-scrum",
        name: "Scrum Master",
        groups: ["Agile"],
        seniorities: [ROLESENIORITY.JUNIOR, ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR],
        description:
            "Facilitates Agile processes, removes impediments, and supports the Scrum team in delivering value.",
        texts: ["default-text-role-scrummaster-fi"],
        defaultTextGuid: "default-text-role-scrummaster-fi",
    },
    {
        guid: "role-agile-coach",
        name: "Agile Coach",
        groups: ["Agile"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
        description:
            "Guides teams and organizations in Agile practices, fostering a culture of continuous improvement and collaboration.",
    },
    {
        guid: "role-agile-safe-rte",
        name: "SAFe Release Train Engineer",
        groups: ["Agile"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
        description:
            "Serves as the Release Train Engineer (RTE) in SAFe, facilitating program-level processes and execution for Agile Release Trains.",
    },
    {
        guid: "role-agile-safe-spm",
        name: "SAFe Product Manager",
        groups: ["Agile"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
        description:
            "Acts as the SAFe Product Manager, defining and prioritizing program backlogs to align with business objectives.",
    },

    // Developers
    {
        guid: "role-dev-frontend",
        name: "Frontend Developer",
        groups: ["Developers"],
        seniorities: [
            ROLESENIORITY.JUNIOR,
            ROLESENIORITY.MIDLEVEL,
            ROLESENIORITY.SENIOR,
            ROLESENIORITY.LEAD,
            ROLESENIORITY.PRINCIPAL,
        ],
        description: "Builds and maintains user interfaces and client-side logic for web and mobile applications.",
    },
    {
        guid: "role-dev-backend",
        name: "Backend Developer",
        groups: ["Developers"],
        seniorities: [
            ROLESENIORITY.JUNIOR,
            ROLESENIORITY.MIDLEVEL,
            ROLESENIORITY.SENIOR,
            ROLESENIORITY.LEAD,
            ROLESENIORITY.PRINCIPAL,
        ],
        description:
            "Develops server-side logic, APIs, and database interactions to support application functionality.",
    },
    {
        guid: "role-dev-fullstack",
        name: "Fullstack Developer",
        groups: ["Developers"],
        seniorities: [
            ROLESENIORITY.JUNIOR,
            ROLESENIORITY.MIDLEVEL,
            ROLESENIORITY.SENIOR,
            ROLESENIORITY.LEAD,
            ROLESENIORITY.PRINCIPAL,
        ],
        description: "Works across both frontend and backend, delivering end-to-end solutions for applications.",
    },
    {
        guid: "role-dev-intern",
        name: "Development Intern",
        groups: ["Developers"],
        seniorities: [ROLESENIORITY.INTERN],
        description: "Assists development teams with basic tasks and learns software development practices.",
    },
    // QA
    {
        guid: "role-qa-manager",
        name: "Test Manager",
        groups: ["QA"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD],
        description:
            "Oversees testing strategies, coordinates QA teams, and ensures product quality standards are met.",
    },
    {
        guid: "role-qa-tester",
        name: "QA Tester",
        groups: ["QA"],
        seniorities: [ROLESENIORITY.JUNIOR, ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR],
        description: "Tests software to identify bugs, ensure quality, and verify requirements are met.",
    },
    {
        guid: "role-qa-automation",
        name: "QA Automation Engineer",
        groups: ["QA"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD],
        description: "Designs, develops, and maintains automated test scripts and frameworks.",
        texts: ["default-text-role-testautomationdeveloper-fi"],
        defaultTextGuid: "default-text-role-testautomationdeveloper-fi",
    },

    // Design
    {
        guid: "role-design-ux",
        name: "UX Designer",
        groups: ["Design"],
        seniorities: [ROLESENIORITY.JUNIOR, ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR],
        description: "Researches and designs user experiences to ensure products are intuitive and user-friendly.",
        texts: ["default-text-role-uxdesigner-fi"],
        defaultTextGuid: "default-text-role-uxdesigner-fi",
    },
    {
        guid: "role-design-ui",
        name: "UI Designer",
        groups: ["Design"],
        seniorities: [ROLESENIORITY.JUNIOR, ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR],
        description: "Creates visually appealing and effective user interfaces for digital products.",
    },
    {
        guid: "role-design-graphic",
        name: "Graphic Designer",
        groups: ["Design"],
        seniorities: [ROLESENIORITY.JUNIOR, ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR],
        description: "Designs graphics, illustrations, and visual assets for branding and communication.",
    },
    {
        guid: "role-services-designer",
        name: "Services Designer",
        groups: ["Design"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR],
        description: "Designs and optimizes service processes and customer journeys for better experiences.",
    },

    // DevOps
    {
        guid: "role-release-manager",
        name: "Release Manager",
        groups: ["DevOps"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR],
        description: "Coordinates software releases, deployment schedules, and ensures smooth delivery to production.",
    },
    {
        guid: "role-devops-engineer",
        name: "DevOps Engineer",
        groups: ["DevOps"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD],
        description: "Implements CI/CD pipelines, manages infrastructure, and ensures reliable deployments.",
    },
    {
        guid: "role-devops-security",
        name: "Security Engineer",
        groups: ["DevOps"],
        seniorities: [ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
        description: "Secures systems, applications, and infrastructure against threats and vulnerabilities.",
    },
    {
        guid: "role-devops-sre",
        name: "Site Reliability Engineer",
        groups: ["DevOps"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD],
        description: "Ensures reliability, scalability, and performance of systems through automation and monitoring.",
    },
    {
        guid: "role-devops-platform",
        name: "Platform Engineer",
        groups: ["DevOps"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD],
        description: "Builds and maintains internal platforms and tools to support development and operations teams.",
    },

    // Data
    {
        guid: "role-data-scientist",
        name: "Data Scientist",
        groups: ["Data"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD],
        description:
            "Analyzes complex data, builds predictive models, and extracts insights to support business decisions.",
    },
    {
        guid: "role-arch-data",
        name: "Data Architect",
        groups: ["Data"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
        description: "Designs data models, databases, and data flows for effective data management.",
    },
    {
        guid: "role-data-mlengineer",
        name: "Machine Learning Engineer",
        groups: ["Data"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD],
        description: "Designs, builds, and deploys machine learning models and data pipelines.",
    },
    {
        guid: "role-data-analyst",
        name: "Data Analyst",
        groups: ["Data"],
        seniorities: [ROLESENIORITY.JUNIOR, ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR],
        description: "Collects, processes, and analyzes data to generate actionable insights and reports.",
    },
    {
        guid: "role-devops-databaseadmin",
        name: "Database Administrator",
        groups: ["Data"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD],
        description: "Manages and maintains database systems, ensuring performance, security, and availability.",
    },

    // Architecture
    {
        guid: "role-arch-software",
        name: "Software Architect",
        groups: ["Architecture"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
        description: "Designs software systems, sets technical direction, and ensures architectural integrity.",
        texts: ["default-text-role-softwarearchitect-fi"],
        defaultTextGuid: "default-text-role-softwarearchitect-fi",
    },
    {
        guid: "role-arch-solution",
        name: "Solution Architect",
        groups: ["Architecture"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
        description: "Designs end-to-end solutions, integrating systems and technologies to meet business needs.",
    },
    {
        guid: "role-arch-enterprise",
        name: "Enterprise Architect",
        groups: ["Architecture"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
        description: "Aligns IT strategy with business goals, overseeing enterprise-wide architecture.",
    },
    {
        guid: "role-arch-security",
        name: "Security Architect",
        groups: ["Architecture"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
        description: "Designs security architecture and policies to protect systems and data.",
    },
    {
        guid: "role-arch-systems",
        name: "Systems Architect",
        groups: ["Architecture"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
        description: "Designs and integrates complex IT systems and infrastructure.",
    },
    {
        guid: "role-arch-cloud",
        name: "Cloud Architect",
        groups: ["Architecture"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
        description: "Architects cloud solutions, manages cloud infrastructure, and ensures scalability and security.",
    },

    // Other
    {
        guid: "role-business-analyst",
        name: "Business Analyst",
        groups: ["Consulting"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
        description:
            "Analyzes business processes, gathers requirements, and bridges the gap between stakeholders and development teams.",
    },
    {
        guid: "role-consultant-it",
        name: "IT Consultant",
        groups: ["Consulting"],
        seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
        description:
            "Provides expert advice on IT strategies, solutions, and implementations to improve business performance.",
    },

    {
        guid: "role-technical-writer",
        name: "Technical Writer",
        groups: [],
        seniorities: [ROLESENIORITY.JUNIOR, ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR],
        description: "Creates and maintains technical documentation, manuals, and guides for products and systems.",
    },
];
