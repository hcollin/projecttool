interface IRestServiceOptions {
    method: "http" | "https";
    server: string;
    port: number;
}

export class RestService {
    private options: IRestServiceOptions;

    private static instance: RestService;

    constructor(options?: IRestServiceOptions) {
        this.options = options || { method: "http", server: "localhost", port: 3000 };
    }

    public static getInstance(options?: IRestServiceOptions): RestService {
        if (!RestService.instance) {
            RestService.instance = new RestService(options);
        }
        return RestService.instance;
    }

    public async GET<T>(url: string, params?: Record<string, string>): Promise<T> {
        return this.request<T>("GET", this.buildUrl(url, params));
    }

    public async POST<T>(url: string, body?: unknown): Promise<T> {
        return this.request<T>("POST", this.buildUrl(url), body);
    }

    public async DELETE<T>(url: string, body?: unknown): Promise<T> {
        return this.request<T>("DELETE", this.buildUrl(url), body);
    }

    public async POSTwithResponse<T>(url: string, body?: unknown): Promise<T> {
        return this.request<T>("POST", this.buildUrl(url), body, true);
    }

    // Private Url builder
    private buildUrl(url: string, params?: Record<string, string>): string {
        let parsedUrl = url;
        if (!parsedUrl.startsWith("/")) {
            parsedUrl = "/" + parsedUrl;
        }
        if (params) {
            const queryString = new URLSearchParams(params).toString();
            parsedUrl += `?${queryString}`;
        }

        return `${this.options.method}://${this.options.server}:${this.options.port}${parsedUrl}`;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async request<T>(
        method: "GET" | "POST" | "PUT" | "DELETE",
        url: string,
        body?: any,
        responseExpectedForPost: boolean = false
    ): Promise<T> {
        const fullUrl = url;
        console.log(`Making ${method} request to: ${fullUrl}`);
        const res = await fetch(fullUrl, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        console.log(`Response: ${res.status}`, res);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        if (method === "DELETE" && res.status === 204) {
            return {} as T;
        }

        if (method === "POST" && res.status === 201 && !responseExpectedForPost) {
            return {} as T;
        }

        return (await res.json()) as T;
    }
}
