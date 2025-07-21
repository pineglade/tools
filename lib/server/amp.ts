import type { Handle } from "@sveltejs/kit";

import * as amp from "@sveltejs/amp";

import { minifyInternally } from "../minify";

export function resolveAmp(
	AMP?: boolean | string,
	callback?: (html: string) => string,
) {
	return async function ({ event, resolve }: Parameters<Handle>[0]) {
		let buffer = "";

		return await resolve(event, {
			transformPageChunk({ done, html }) {
				const newHtml = callback?.(html) || html;

				if (!AMP) {
					return newHtml;
				}

				buffer += newHtml;

				if (!done) {
					return newHtml;
				}

				return minifyInternally(
					amp
						.transform(buffer)
						.replace("<html", "<html amp")
						.replace('@charset "UTF-8";', "")
						.replace(/<!--.*?-->/g, ""),
				);
			},
		});
	};
}
