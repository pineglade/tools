export function loadScript(
	url: string,
	wait = true,
): Promise<HTMLScriptElement> {
	return new Promise((resolve, reject) => {
		for (const element of document.scripts) {
			if (element.src === url) {
				resolve(element);
				return;
			}
		}

		const scriptElement = document.createElement("script");
		scriptElement.src = url;
		scriptElement.async = true;

		if (wait) {
			scriptElement.addEventListener("load", () => {
				resolve(scriptElement);
			});
			scriptElement.addEventListener("error", () => {
				reject(scriptElement);
			});
		}

		document.head.append(scriptElement);
		resolve(scriptElement);
	});
}
