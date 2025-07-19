/** @type {import('prettier').Config} */
export const baseConfig = {
	overrides: [
		{
			files: "*.svelte",
			options: {
				parser: "svelte",
			},
		},
	],
	plugins: ["prettier-plugin-svelte"],
};
