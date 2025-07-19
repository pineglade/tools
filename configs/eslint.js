import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import perfectionist from "eslint-plugin-perfectionist";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import ts from "typescript-eslint";

const scriptName = process?.env?.npm_lifecycle_event || "";
const strictMode = scriptName.includes("lint") || scriptName.includes("build");

/**
 * @param {{ rules?: import('eslint').Linter.Config['rules'], svelteConfig?: import('@sveltejs/kit').Config }} [options = {}]
 * @return {import('eslint').Linter.Config}
 */
export function createConfig({ rules = {}, svelteConfig = {} } = {}) {
	return ts.config(
		js.configs.recommended,
		...ts.configs.recommended,
		...svelte.configs.recommended,
		prettier,
		...svelte.configs.prettier,
		perfectionist.configs["recommended-natural"],
		{
			languageOptions: {
				globals: {
					...globals.browser,
					...globals.node,
				},
			},
			rules: {
				"arrow-body-style": "error",
				complexity: ["error", 20],
				"consistent-return": "error",
				curly: "error",
				"default-case-last": "error",
				eqeqeq: "error",
				"func-style": ["error", "declaration"],
				"guard-for-in": "error",
				"max-params": ["error", 4],
				"no-console": [
					strictMode ? "error" : "off",
					{ allow: ["error", "info"] },
				],
				"no-debugger": strictMode ? "error" : "off",
				"no-dupe-keys": "error",
				"no-duplicate-imports": "error",
				"no-else-return": "error",
				"no-empty-function": "error",
				"no-extra-boolean-cast": "error",
				"no-implicit-coercion": "error",
				"no-inner-declarations": "error",
				"no-irregular-whitespace": "off",
				"no-labels": "error",
				"no-lone-blocks": "error",
				"no-lonely-if": "error",
				"no-loop-func": "error",
				"no-negated-condition": "error",
				"no-nested-ternary": "error",
				"no-new": "error",
				"no-new-wrappers": "error",
				"no-return-assign": "error",
				"no-self-compare": "error",
				"no-unneeded-ternary": "error",
				"no-useless-catch": "error",
				"no-useless-concat": "error",
				"no-useless-rename": "error",
				"no-useless-return": "error",
				"object-shorthand": [
					"error",
					"always",
					{ avoidExplicitReturnArrows: true },
				],
				"one-var": ["error", "never"],
				"prefer-destructuring": "error",
				"prefer-rest-params": "error",
				"prefer-spread": "error",
				"prefer-template": "error",
				"require-await": "error",
				"sort-vars": "error",
				"svelte/no-at-html-tags": "off",
				"vars-on-top": "error",
				yoda: "error",
				...rules,
			},
		},
		{
			files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
			languageOptions: {
				parserOptions: {
					extraFileExtensions: [".svelte"],
					parser: ts.parser,
					projectService: true,
					svelteConfig,
				},
			},
		},
		{
			ignores: ["build/", ".svelte-kit/", "*.min.*"],
		},
	);
}
