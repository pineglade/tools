import {
	dayjs,
	type DayjsDate,
	daysInMonth,
	toDays,
	toW3CDatetime,
} from "./date";
import { xml } from "./mark-template";
import { minifyInternally } from "./minify";

type Page = {
	loc: string;
	priority?: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
	updatedAt?: DayjsDate;
};

export function createSitemapXml(pages: Page[]) {
	const body = minifyInternally(xml`
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="https://www.w3.org/1999/xhtml">
			${pages.map(mapPage).join("")}
		</urlset>
	`);

	return new Response(body, { headers: { "Content-Type": "application/xml" } });
}

function mapPage({ loc, priority, updatedAt }: Page) {
	let lastmod = "";
	let changefreq = "";

	if (updatedAt) {
		lastmod = toW3CDatetime(updatedAt);
		const diffInDays = toDays(Date.now() - dayjs(updatedAt).valueOf());

		if (diffInDays > 365) {
			changefreq = "";
		} else if (diffInDays > daysInMonth()) {
			changefreq = "yearly";
		} else if (diffInDays > 7) {
			changefreq = "monthly";
		} else if (diffInDays > 1) {
			changefreq = "weekly";
		} else {
			changefreq = "daily";
		}
	}

	return xml`
		<url>
			<loc>${loc}</loc>
			${priority ? xml`<priority>${priority.toFixed(1)}</priority>` : ""}
			${changefreq ? xml`<changefreq>${changefreq}</changefreq>` : ""}
			${lastmod ? xml`<lastmod>${lastmod}</lastmod>` : ""}
		</url>
	`;
}
