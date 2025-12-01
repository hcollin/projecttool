// IMPORT: Core Libraries
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { DatesProvider } from "@mantine/dates";
import "dayjs/locale/fi";

// core styles are required for all packages
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/tiptap/styles.css";

// IMPORT: Themes
import maintheme from "./themes/maintheme";

// IMPORT: TenStack Router: generated route tree
import { routeTree } from "./routeTree.gen";

// IMPORT: Styles
import "./index.css";

const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <DatesProvider settings={{ locale: "fi", firstDayOfWeek: 1, weekendDays: [6, 0] }}>
                <MantineProvider defaultColorScheme="dark" theme={maintheme}>
                    <RouterProvider router={router} />
                </MantineProvider>
            </DatesProvider>
        </StrictMode>
    );
}
