import { readFile } from "node:fs/promises";

const CWD = process.cwd();

export type Data = {
	[page: string]: string;
};

export async function getData<ProjectId = number | string>(
	pages: string[],
	projectId: ProjectId,
): Promise<Data> {
	const texts = await Promise.all(
		pages.map(async (page) => {
			try {
				return await readFile(
					`${CWD}/src/routes/(${projectId})/data/${page}.data.html`,
					"utf-8",
				);
			} catch {
				// Do nothing
			}
			return "";
		}),
	);

	return pages.reduce(
		(acc: Data, page, i) => ({ ...acc, [page]: texts[i] }),
		{},
	);
}
