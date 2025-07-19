import { type DayjsDate, toRFC822 } from "./date";
import { xml } from "./mark-template";
import { minifyInternally } from "./minify";

type Page = {
	content: string;
	pubDate: DayjsDate;
	url: string;
};

type Project = {
	description: string;
	language?: string;
	pages: Page[];
	title: string;
	url: string;
};

export function createTurboRss(project: Project) {
	const body = minifyInternally(xml`
		<?xml version="1.0" encoding="UTF-8" ?>
		<rss xmlns:yandex="http://news.yandex.ru" xmlns:media="http://search.yahoo.com/mrss/" xmlns:turbo="http://turbo.yandex.ru" version="2.0">
			<channel>
				<title>${project.title}</title>
				<description>${project.description}</description>
				<link>${project.url}</link>
				<language>${project.language || "ru"}</language>
				${project.pages.map(mapPage).join("")}
			</channel>
		</rss>
	`);

	return new Response(body, { headers: { "Content-Type": "application/xml" } });
}

function mapPage(page: Page) {
	return xml`
		<item turbo="true">
			<turbo:extendedHtml>true</turbo:extendedHtml>
			<link>${page.url}</link>
			<turbo:content><![CDATA[${page.content}]]></turbo:content>
			<pubDate>${toRFC822(page.pubDate)}</pubDate>
		</item>
	`;
}
