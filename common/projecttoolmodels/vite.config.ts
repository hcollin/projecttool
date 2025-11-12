import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
	build: {
		lib: {
			entry: "src/index.ts",
			name: "@frosttroll/projecttoolmodels",
			formats: ["es", "cjs"],
			fileName: (format) => `index.${format}.js`,
		},
		rollupOptions: {
			external: [
				// Add external deps you don't want bundled
			],
		},
		outDir: "dist",
	},
	plugins: [
		dts({
			tsconfigPath: "./tsconfig.json",
			// rollupTypes: true,
			insertTypesEntry: true,
		}),
	],
});
