/** @type {import('prettier').Config} */
export const baseConfig = {
	overrides: [
		{
			files: "*.svelte",
			options: {
				parser: "svelte",
			},
		},
		{
			files: "*.data.html",
			options: { printWidth: Infinity },
		},
	],
	plugins: ["prettier-plugin-svelte"],
};
