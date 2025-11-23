
export enum ETECHCATEGORY {
    LANGUAGE = "Programming Language", // General-purpose or domain-specific programming language (e.g., Python, Java)
    FRAMEWORK = "Framework",           // Software framework for building applications (e.g., Django, Spring Boot)
    SERVICE = "Service",               // Hosted or managed service (e.g., Firebase, Auth0)
    LIBRARY = "Library",               // Reusable code library or package (e.g., React, Lodash)
    DATABASE = "Database",             // Database engine or technology (e.g., PostgreSQL, MongoDB)
    TOOL = "Tool",                     // Utility or tool aiding development, deployment, or operations (e.g., Git, Docker)
    PLATFORM = "Platform",             // Underlying platform or environment (e.g., AWS, Azure)
    OTHER = "Other",                   // Anything not covered by the above categories
}

export enum ETECHAPPLICATIONLAYER {
    FRONTEND = "Frontend",         // Client-side/UI layer of an application
    BACKEND = "Backend",           // Server-side/business logic layer
    DATABASE = "Database",         // Data storage and management layer
    INFRA = "Infrastructure",      // Underlying systems, servers, and cloud resources
    NETWORK = "Network",           // Networking and connectivity layer
    SECURITY = "Security",         // Security/authentication/authorization layer
    NONE = "None",                 // Not applicable to a specific layer
    OTHER = "Other",               // Any other or cross-cutting layer
}
