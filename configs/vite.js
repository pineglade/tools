import { sveltekit } from "@sveltejs/kit/vite";
import { readFile } from "node:fs/promises";
import sortMediaQueries from "postcss-sort-media-queries";

export function createPinegladePlugin({ watchedModules } = {}) {
	const pinegladePlugin = {
		async config() {
			const newPartial = {
				css: {
					postcss: {
						plugins: [sortMediaQueries()],
					},
				},
			};

			try {
				const additionalData = await readFile(
					`${process.cwd()}/src/scss/env.scss`,
					"utf-8",
				);
				if (additionalData) {
					newPartial.css.preprocessorOptions = {
						scss: { additionalData },
					};
				}
			} catch {
				// Обработка отсутствия файла
			}

			return newPartial;
		},
		name: "vite-plugin-pineglade",
	};

	if (watchedModules) {
		pinegladePlugin.configureServer = (server) => {
			const regexp = `/node_modules\\/(?!${watchedModules.join("|")}).*/`;
			const { watcher } = server;
			watcher.options = {
				...server.watcher.options,
				ignored: ["**/.git/**", new RegExp(regexp)],
			};
			watcher._userIgnored = undefined;
		};
	}

	return [sveltekit(), pinegladePlugin];
}
