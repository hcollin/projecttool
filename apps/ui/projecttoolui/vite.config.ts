import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
	optimizeDeps: {
		include: ["@frosttroll/projecttoolmodels", "@frosttroll/projecttoolsdata", "@frosttroll/projecttoolutils"],
	},
	build: {
		commonjsOptions: {
			include: [/@frosttroll\/projecttoolmodels/, /@frosttroll\/projecttoolsdata/, /@frosttroll\/projecttoolutils/],
		},
	},

	plugins: [
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
		}),
		react(),
	],
});
