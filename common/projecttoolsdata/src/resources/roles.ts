import { IRoleTemplate, ROLESENIORITY } from "@frosttroll/projecttoolmodels";

export const DATA_PROJECT_ROLES: IRoleTemplate[] = [
	// Management
	{
		id: "role-manager-project",
		name: "Project Manager",
		groups: ["Management"],
		seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD],
		description: "Oversees project planning, execution, and delivery, ensuring goals are met on time and within budget.",
	},
	{
		id: "role-manager-product",
		name: "Product Manager",
		groups: ["Management"],
		seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD],
		description: "Defines product vision, strategy, and roadmap, and coordinates cross-functional teams to deliver product success.",
	},
	{
		id: "role-manager-scrum",
		name: "Scrum Master",
		groups: ["Management"],
		seniorities: [ROLESENIORITY.JUNIOR, ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR],
		description: "Facilitates Agile processes, removes impediments, and supports the Scrum team in delivering value.",
	},
	{
		id: "role-services-manager",
		name: "Services Manager",
		groups: ["Management"],
		seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR],
		description: "Manages service delivery, client relationships, and ensures high-quality support and operations.",
	},
	{
		id: "role-release-manager",
		name: "Release Manager",
		groups: ["Management"],
		seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR],
		description: "Coordinates software releases, deployment schedules, and ensures smooth delivery to production.",
	},
	// Developers
	{
		id: "role-dev-frontend",
		name: "Frontend Developer",
		groups: ["Developers"],
		seniorities: [ROLESENIORITY.JUNIOR, ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
		description: "Builds and maintains user interfaces and client-side logic for web and mobile applications.",
	},
	{
		id: "role-dev-backend",
		name: "Backend Developer",
		groups: ["Developers"],
		seniorities: [ROLESENIORITY.JUNIOR, ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
		description: "Develops server-side logic, APIs, and database interactions to support application functionality.",
	},
	{
		id: "role-dev-fullstack",
		name: "Fullstack Developer",
		groups: ["Developers"],
		seniorities: [ROLESENIORITY.JUNIOR, ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
		description: "Works across both frontend and backend, delivering end-to-end solutions for applications.",
	},
	// QA
	{
		id: "role-qa-tester",
		name: "QA Tester",
		groups: ["QA"],
		seniorities: [ROLESENIORITY.JUNIOR, ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR],
		description: "Tests software to identify bugs, ensure quality, and verify requirements are met.",
	},
	{
		id: "role-qa-automation",
		name: "QA Automation Engineer",
		groups: ["QA"],
		seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD],
		description: "Designs, develops, and maintains automated test scripts and frameworks.",
	},

	// Design
	{
		id: "role-design-ux",
		name: "UX Designer",
		groups: ["Design"],
		seniorities: [ROLESENIORITY.JUNIOR, ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR],
		description: "Researches and designs user experiences to ensure products are intuitive and user-friendly.",
	},
	{
		id: "role-design-ui",
		name: "UI Designer",
		groups: ["Design"],
		seniorities: [ROLESENIORITY.JUNIOR, ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR],
		description: "Creates visually appealing and effective user interfaces for digital products.",
	},
	{
		id: "role-design-graphic",
		name: "Graphic Designer",
		groups: ["Design"],
		seniorities: [ROLESENIORITY.JUNIOR, ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR],
		description: "Designs graphics, illustrations, and visual assets for branding and communication.",
	},
	{
		id: "role-services-designer",
		name: "Services Designer",
		groups: ["Design"],
		seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR],
		description: "Designs and optimizes service processes and customer journeys for better experiences.",
	},

	// DevOps
	{
		id: "role-devops-engineer",
		name: "DevOps Engineer",
		groups: ["DevOps"],
		seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD],
		description: "Implements CI/CD pipelines, manages infrastructure, and ensures reliable deployments.",
	},
	{
		id: "role-devops-security",
		name: "Security Engineer",
		groups: ["DevOps"],
		seniorities: [ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
		description: "Secures systems, applications, and infrastructure against threats and vulnerabilities.",
	},

	// Architecture
	{
		id: "role-arch-software",
		name: "Software Architect",
		groups: ["Architecture"],
		seniorities: [ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
		description: "Designs software systems, sets technical direction, and ensures architectural integrity.",
	},
	{
		id: "role-arch-systems",
		name: "Systems Architect",
		groups: ["Architecture"],
		seniorities: [ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
		description: "Designs and integrates complex IT systems and infrastructure.",
	},
	{
		id: "role-arch-cloud",
		name: "Cloud Architect",
		groups: ["Architecture"],
		seniorities: [ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
		description: "Architects cloud solutions, manages cloud infrastructure, and ensures scalability and security.",
	},
	{
		id: "role-arch-data",
		name: "Data Architect",
		groups: ["Architecture"],
		seniorities: [ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
		description: "Designs data models, databases, and data flows for effective data management.",
	},
	{
		id: "role-arch-enterprise",
		name: "Enterprise Architect",
		groups: ["Architecture"],
		seniorities: [ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
		description: "Aligns IT strategy with business goals, overseeing enterprise-wide architecture.",
	},
	{
		id: "role-arch-security",
		name: "Security Architect",
		groups: ["Architecture"],
		seniorities: [ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
		description: "Designs security architecture and policies to protect systems and data.",
	},
	{
		id: "role-arch-solution",
		name: "Solution Architect",
		groups: ["Architecture"],
		seniorities: [ROLESENIORITY.SENIOR, ROLESENIORITY.LEAD, ROLESENIORITY.PRINCIPAL],
		description: "Designs end-to-end solutions, integrating systems and technologies to meet business needs.",
	},

	// Other
	{
		id: "role-business-analyst",
		name: "Business Analyst",
		groups: [],
		seniorities: [ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR],
		description: "Analyzes business processes, gathers requirements, and bridges the gap between stakeholders and development teams.",
	},
	{
		id: "role-dev-intern",
		name: "Development Intern",
		groups: [],
		seniorities: [ROLESENIORITY.INTERN],
		description: "Assists development teams with basic tasks and learns software development practices.",
	},
	{
		id: "role-technical-writer",
		name: "Technical Writer",
		groups: [],
		seniorities: [ROLESENIORITY.JUNIOR, ROLESENIORITY.MIDLEVEL, ROLESENIORITY.SENIOR],
		description: "Creates and maintains technical documentation, manuals, and guides for products and systems.",
	},
];
