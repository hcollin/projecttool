import { ITechnology, ETECHCATEGORY, ETECHAPPLICATIONLAYER } from "@frosttroll/projecttoolmodels";

// Sorted by appLayer (first value in array)
export const DEFAULT_TECHNOLOGIES: ITechnology[] = [
  // FRONTEND

  {
    guid: "tech-react",
    name: "React",
    description: "A JavaScript library for building user interfaces",
    category: [ETECHCATEGORY.LIBRARY],
    appLayer: [ETECHAPPLICATIONLAYER.FRONTEND],
  },
  {
    guid: "tech-angular",
    name: "Angular",
    description: "A TypeScript-based open-source web application framework.",
    category: [ETECHCATEGORY.FRAMEWORK],
    appLayer: [ETECHAPPLICATIONLAYER.FRONTEND],
  },
  {
    guid: "tech-vue",
    name: "Vue",
    description: "A progressive JavaScript framework for building user interfaces.",
    category: [ETECHCATEGORY.FRAMEWORK],
    appLayer: [ETECHAPPLICATIONLAYER.FRONTEND],
  },
  {
    guid: "tech-svelte",
    name: "Svelte",
    description: "A compiler that generates minimal and highly optimized JavaScript for building UIs.",
    category: [ETECHCATEGORY.FRAMEWORK],
    appLayer: [ETECHAPPLICATIONLAYER.FRONTEND],
  },
  {
    guid: "tech-material-design",
    name: "Material Design",
    description: "A design system developed by Google for building visually appealing UIs.",
    category: [ETECHCATEGORY.LIBRARY],
    appLayer: [ETECHAPPLICATIONLAYER.FRONTEND],
  },
  {
    guid: "tech-mantine",
    name: "Mantine",
    description: "A modern React component library for building UIs.",
    category: [ETECHCATEGORY.LIBRARY],
    appLayer: [ETECHAPPLICATIONLAYER.FRONTEND],
  },
  {
    guid: "tech-redux",
    name: "Redux",
    description: "A predictable state container for JavaScript apps.",
    category: [ETECHCATEGORY.LIBRARY],
    appLayer: [ETECHAPPLICATIONLAYER.FRONTEND],
  },
  {
    guid: "tech-jotai",
    name: "Jotai",
    description: "A primitive and flexible state management library for React.",
    category: [ETECHCATEGORY.LIBRARY],
    appLayer: [ETECHAPPLICATIONLAYER.FRONTEND],
  },
  {
    guid: "tech-zustand",
    name: "Zustand",
    description: "A small, fast, and scalable state-management solution for React.",
    category: [ETECHCATEGORY.LIBRARY],
    appLayer: [ETECHAPPLICATIONLAYER.FRONTEND],
  },
  {
    guid: "tech-valtio",
    name: "Valtio",
    description: "A proxy-state library for React state management.",
    category: [ETECHCATEGORY.LIBRARY],
    appLayer: [ETECHAPPLICATIONLAYER.FRONTEND],
  },

  // FRONTEND & BACKEND
  {
    guid: "tech-vite",
    name: "Vite",
    description: "A fast build tool and development server for modern web projects.",
    category: [ETECHCATEGORY.TOOL],
    appLayer: [ETECHAPPLICATIONLAYER.FRONTEND, ETECHAPPLICATIONLAYER.BACKEND],
  },

  {
    guid: "tech-typescript",
    name: "TypeScript",
    description: "A strongly typed programming language that builds on JavaScript.",
    category: [ETECHCATEGORY.LANGUAGE],
    appLayer: [ETECHAPPLICATIONLAYER.FRONTEND, ETECHAPPLICATIONLAYER.BACKEND],
  },
  {
    guid: "tech-javascript",
    name: "JavaScript",
    description: "A high-level, interpreted programming language for web development.",
    category: [ETECHCATEGORY.LANGUAGE],
    appLayer: [ETECHAPPLICATIONLAYER.FRONTEND, ETECHAPPLICATIONLAYER.BACKEND],
  },

  // BACKEND
  {
    guid: "tech-java",
    name: "Java",
    description: "A high-level, class-based, object-oriented programming language.",
    category: [ETECHCATEGORY.LANGUAGE],
    appLayer: [ETECHAPPLICATIONLAYER.BACKEND],
  },
  {
    guid: "tech-nodejs",
    name: "Node.js",
    description: "JavaScript runtime built on Chrome's V8 JavaScript engine",
    category: [ETECHCATEGORY.PLATFORM],
    appLayer: [ETECHAPPLICATIONLAYER.BACKEND],
  },
  {
    guid: "tech-spring-boot",
    name: "Spring Boot",
    description: "A framework for building stand-alone, production-grade Spring-based applications.",
    category: [ETECHCATEGORY.FRAMEWORK],
    appLayer: [ETECHAPPLICATIONLAYER.BACKEND],
  },

  {
    guid: "tech-webflux",
    name: "WebFlux",
    description: "A reactive-stack web framework, part of Spring Framework.",
    category: [ETECHCATEGORY.FRAMEWORK],
    appLayer: [ETECHAPPLICATIONLAYER.BACKEND],
  },
  {
    guid: "tech-python",
    name: "Python",
    description: "A high-level, interpreted programming language known for its readability and versatility.",
    category: [ETECHCATEGORY.LANGUAGE],
    appLayer: [ETECHAPPLICATIONLAYER.BACKEND],
  },
  {
    guid: "tech-django",
    name: "Django",
    description: "A high-level Python web framework that encourages rapid development and clean, pragmatic design.",
    category: [ETECHCATEGORY.FRAMEWORK],
    appLayer: [ETECHAPPLICATIONLAYER.BACKEND],
  },
  {
    guid: "tech-expressjs",
    name: "Express.js",
    description: "A minimal and flexible Node.js web application framework.",
    category: [ETECHCATEGORY.FRAMEWORK],
    appLayer: [ETECHAPPLICATIONLAYER.BACKEND],
  },
  {
    guid: "tech-nestjs",
    name: "NestJS",
    description:
      "A progressive Node.js framework for building efficient, reliable and scalable server-side applications.",
    category: [ETECHCATEGORY.FRAMEWORK],
    appLayer: [ETECHAPPLICATIONLAYER.BACKEND],
  },
  {
    guid: "tech-csharp",
    name: "C#",
    description:
      "A modern, object-oriented programming language developed by Microsoft for building a wide range of applications.",
    category: [ETECHCATEGORY.LANGUAGE],
    appLayer: [ETECHAPPLICATIONLAYER.BACKEND],
  },
  {
    guid: "tech-go",
    name: "Go",
    description: "An open source programming language designed for simplicity, reliability, and efficiency.",
    category: [ETECHCATEGORY.LANGUAGE],
    appLayer: [ETECHAPPLICATIONLAYER.BACKEND],
  },
  {
    guid: "tech-cpp",
    name: "C++",
    description: "A general-purpose programming language created as an extension of the C programming language.",
    category: [ETECHCATEGORY.LANGUAGE],
    appLayer: [ETECHAPPLICATIONLAYER.BACKEND],
  },
  {
    guid: "tech-scala",
    name: "Scala",
    description: "A strong static type, functional and object-oriented programming language for the JVM.",
    category: [ETECHCATEGORY.LANGUAGE],
    appLayer: [ETECHAPPLICATIONLAYER.BACKEND],
  },
  {
    guid: "tech-kotlin",
    name: "Kotlin",
    description:
      "A modern programming language that makes developers happier. Used for JVM, Android, and backend development.",
    category: [ETECHCATEGORY.LANGUAGE],
    appLayer: [ETECHAPPLICATIONLAYER.BACKEND],
  },
  {
    guid: "tech-rust",
    name: "Rust",
    description: "A language empowering everyone to build reliable and efficient software.",
    category: [ETECHCATEGORY.LANGUAGE],
    appLayer: [ETECHAPPLICATIONLAYER.BACKEND],
  },
  {
    guid: "tech-php",
    name: "PHP",
    description: "A popular general-purpose scripting language that is especially suited to web development.",
    category: [ETECHCATEGORY.LANGUAGE],
    appLayer: [ETECHAPPLICATIONLAYER.BACKEND],
  },
  {
    guid: "tech-rabbitmq",
    name: "RabbitMQ",
    description: "An open-source message-broker software that implements the Advanced Message Queuing Protocol.",
    category: [ETECHCATEGORY.TOOL],
    appLayer: [ETECHAPPLICATIONLAYER.BACKEND],
  },

  // BACKEND AND DATABASE
  {
    guid: "tech-kafka",
    name: "Kafka",
    description: "A distributed event streaming platform for high-performance data pipelines.",
    category: [ETECHCATEGORY.TOOL],
    appLayer: [ETECHAPPLICATIONLAYER.BACKEND, ETECHAPPLICATIONLAYER.DATABASE],
  },
  {
    guid: "tech-hibernate",
    name: "Hibernate",
    description: "An object-relational mapping tool for the Java programming language.",
    category: [ETECHCATEGORY.LIBRARY],
    appLayer: [ETECHAPPLICATIONLAYER.BACKEND, ETECHAPPLICATIONLAYER.DATABASE],
  },

  // DATABASE
  {
    guid: "tech-mongodb",
    name: "MongoDB",
    description: "A NoSQL database program that uses JSON-like documents",
    category: [ETECHCATEGORY.DATABASE],
    appLayer: [ETECHAPPLICATIONLAYER.DATABASE],
  },
  {
    guid: "tech-postgresql",
    name: "PostgreSQL",
    description: "A powerful, open source object-relational database system.",
    category: [ETECHCATEGORY.DATABASE],
    appLayer: [ETECHAPPLICATIONLAYER.DATABASE],
  },
  {
    guid: "tech-oracle",
    name: "Oracle",
    description: "A multi-model database management system produced and marketed by Oracle Corporation.",
    category: [ETECHCATEGORY.DATABASE],
    appLayer: [ETECHAPPLICATIONLAYER.DATABASE],
  },
  {
    guid: "tech-sql-server",
    name: "SQL Server",
    description: "A relational database management system developed by Microsoft.",
    category: [ETECHCATEGORY.DATABASE],
    appLayer: [ETECHAPPLICATIONLAYER.DATABASE],
  },
  {
    guid: "tech-mysql",
    name: "MySQL",
    description: "An open-source relational database management system.",
    category: [ETECHCATEGORY.DATABASE],
    appLayer: [ETECHAPPLICATIONLAYER.DATABASE],
  },
  {
    guid: "tech-redis",
    name: "Redis",
    description: "An in-memory data structure store, used as a database, cache, and message broker.",
    category: [ETECHCATEGORY.DATABASE],
    appLayer: [ETECHAPPLICATIONLAYER.DATABASE],
  },

  // INFRA
  {
    guid: "tech-aws",
    name: "AWS",
    description: "Amazon Web Services - Cloud computing services",
    category: [ETECHCATEGORY.PLATFORM, ETECHCATEGORY.SERVICE],
    appLayer: [ETECHAPPLICATIONLAYER.INFRA],
  },
  {
    guid: "tech-docker",
    name: "Docker",
    description: "Platform for developing, shipping, and running applications in containers",
    category: [ETECHCATEGORY.TOOL],
    appLayer: [ETECHAPPLICATIONLAYER.INFRA],
  },
  {
    guid: "tech-kubernetes",
    name: "Kubernetes",
    description:
      "An open-source system for automating deployment, scaling, and management of containerized applications.",
    category: [ETECHCATEGORY.TOOL],
    appLayer: [ETECHAPPLICATIONLAYER.INFRA],
  },
  {
    guid: "tech-docker-compose",
    name: "Docker Compose",
    description: "A tool for defining and running multi-container Docker applications.",
    category: [ETECHCATEGORY.TOOL],
    appLayer: [ETECHAPPLICATIONLAYER.INFRA],
  },
  {
    guid: "tech-terraform",
    name: "Terraform",
    description:
      "An open-source infrastructure as code software tool for building, changing, and versioning infrastructure.",
    category: [ETECHCATEGORY.TOOL],
    appLayer: [ETECHAPPLICATIONLAYER.INFRA],
  },
  {
    guid: "tech-pulumi",
    name: "Pulumi",
    description: "An infrastructure as code tool for creating, deploying, and managing cloud infrastructure.",
    category: [ETECHCATEGORY.TOOL],
    appLayer: [ETECHAPPLICATIONLAYER.INFRA],
  },
  {
    guid: "tech-ansible",
    name: "Ansible",
    description: "An open-source software provisioning, configuration management, and application-deployment tool.",
    category: [ETECHCATEGORY.TOOL],
    appLayer: [ETECHAPPLICATIONLAYER.INFRA],
  },
  {
    guid: "tech-azure",
    name: "Azure",
    description: "Microsoft Azure - Cloud computing services.",
    category: [ETECHCATEGORY.PLATFORM, ETECHCATEGORY.SERVICE],
    appLayer: [ETECHAPPLICATIONLAYER.INFRA],
  },
  {
    guid: "tech-google-cloud",
    name: "Google Cloud",
    description: "Google Cloud Platform - Cloud computing services.",
    category: [ETECHCATEGORY.PLATFORM, ETECHCATEGORY.SERVICE],
    appLayer: [ETECHAPPLICATIONLAYER.INFRA],
  },
  {
    guid: "tech-vmware",
    name: "VMWare",
    description: "A provider of cloud computing and virtualization technology.",
    category: [ETECHCATEGORY.PLATFORM],
    appLayer: [ETECHAPPLICATIONLAYER.INFRA],
  },
  {
    guid: "tech-linux",
    name: "Linux",
    description: "An open-source family of Unix-like operating systems.",
    category: [ETECHCATEGORY.PLATFORM],
    appLayer: [ETECHAPPLICATIONLAYER.INFRA],
  },
  {
    guid: "tech-windows-server",
    name: "Windows Server",
    description: "A group of server operating systems released by Microsoft.",
    category: [ETECHCATEGORY.PLATFORM],
    appLayer: [ETECHAPPLICATIONLAYER.INFRA],
  },

  // SECURITY

  {
    guid: "tech-oauth2",
    name: "OAuth2",
    description:
      "An open standard for access delegation commonly used for token-based authentication and authorization.",
    category: [ETECHCATEGORY.SERVICE, ETECHCATEGORY.TOOL],
    appLayer: [ETECHAPPLICATIONLAYER.SECURITY],
  },
  {
    guid: "tech-keycloak",
    name: "Keycloak",
    description: "An open-source identity and access management solution.",
    category: [ETECHCATEGORY.SERVICE, ETECHCATEGORY.TOOL],
    appLayer: [ETECHAPPLICATIONLAYER.SECURITY],
  },
  {
    guid: "tech-okta",
    name: "Okta",
    description: "A cloud-based identity and access management service.",
    category: [ETECHCATEGORY.SERVICE],
    appLayer: [ETECHAPPLICATIONLAYER.SECURITY],
  },
  {
    guid: "tech-kerberos",
    name: "Kerberos",
    description:
      "A network authentication protocol designed to provide strong authentication for client/server applications.",
    category: [ETECHCATEGORY.TOOL],
    appLayer: [ETECHAPPLICATIONLAYER.SECURITY],
  },
  {
    guid: "tech-entra-id",
    name: "EntraID",
    description:
      "Microsoft Entra ID (formerly Azure Active Directory) is a cloud-based identity and access management service.",
    category: [ETECHCATEGORY.SERVICE],
    appLayer: [ETECHAPPLICATIONLAYER.SECURITY],
  },
  {
    guid: "tech-auth0",
    name: "Auth0",
    description: "A flexible, drop-in solution to add authentication and authorization services to applications.",
    category: [ETECHCATEGORY.SERVICE],
    appLayer: [ETECHAPPLICATIONLAYER.SECURITY],
  },
  {
    guid: "tech-snyk",
    name: "Snyk",
    description:
      "A developer security platform for finding, prioritizing, and fixing vulnerabilities in code, dependencies, containers, and IaC.",
    category: [ETECHCATEGORY.TOOL],
    appLayer: [ETECHAPPLICATIONLAYER.SECURITY],
  },

  // NETWORK

  {
    guid: "tech-nginx",
    name: "NGINX",
    description: "A high-performance HTTP server, reverse proxy, and load balancer.",
    category: [ETECHCATEGORY.TOOL, ETECHCATEGORY.PLATFORM],
    appLayer: [ETECHAPPLICATIONLAYER.NETWORK],
  },
  {
    guid: "tech-cloudflare",
    name: "Cloudflare",
    description:
      "A global network designed to make everything you connect to the Internet secure, private, fast, and reliable.",
    category: [ETECHCATEGORY.SERVICE],
    appLayer: [ETECHAPPLICATIONLAYER.NETWORK],
  },
  {
    guid: "tech-tomcat",
    name: "Tomcat",
    description:
      "An open-source implementation of the Java Servlet, JavaServer Pages, and Java Expression Language technologies.",
    category: [ETECHCATEGORY.PLATFORM],
    appLayer: [ETECHAPPLICATIONLAYER.NETWORK],
  },
  {
    guid: "tech-jetty",
    name: "Jetty",
    description: "A Java-based HTTP (Web) server and Java Servlet container.",
    category: [ETECHCATEGORY.PLATFORM],
    appLayer: [ETECHAPPLICATIONLAYER.NETWORK],
  },
  {
    guid: "tech-iis",
    name: "IIS",
    description:
      "Internet Information Services (IIS) is an extensible web server created by Microsoft for use with Windows NT family.",
    category: [ETECHCATEGORY.PLATFORM],
    appLayer: [ETECHAPPLICATIONLAYER.NETWORK],
  },

  // NONE (Tools/Services not tied to a specific layer)
  {
    guid: "tech-vitest",
    name: "Vitest",
    description: "A blazing fast unit test framework powered by Vite.",
    category: [ETECHCATEGORY.TOOL],
    appLayer: [ETECHAPPLICATIONLAYER.NONE],
  },
  {
    guid: "tech-git",
    name: "Git",
    description: "A distributed version-control system for tracking changes in source code.",
    category: [ETECHCATEGORY.TOOL],
    appLayer: [ETECHAPPLICATIONLAYER.NONE],
  },
  {
    guid: "tech-gitlab",
    name: "GitLab",
    description: "A web-based DevOps lifecycle tool that provides a Git repository manager.",
    category: [ETECHCATEGORY.SERVICE, ETECHCATEGORY.TOOL],
    appLayer: [ETECHAPPLICATIONLAYER.NONE],
  },
  {
    guid: "tech-github",
    name: "GitHub",
    description: "A code hosting platform for version control and collaboration.",
    category: [ETECHCATEGORY.SERVICE, ETECHCATEGORY.TOOL],
    appLayer: [ETECHAPPLICATIONLAYER.NONE],
  },
  {
    guid: "tech-jenkins",
    name: "Jenkins",
    description: "An open-source automation server for building, testing, and deploying software.",
    category: [ETECHCATEGORY.TOOL],
    appLayer: [ETECHAPPLICATIONLAYER.NONE],
  },

  // BACKEND/INFRA (Multiple layers)
];
