/* eslint-disable */
// @ts-nocheck

let ready = false;

export function hitYandexMetrika(
	yandexMetrikaId: number,
	from?: URL,
	to: URL = window.Location,
) {
	if (!ready) {
		(function (m, e, t, r, i, k, a) {
			m[i] =
				m[i] ||
				function () {
					(m[i].a = m[i].a || []).push(arguments);
				};
			m[i].l = 1 * new Date();
			for (var j = 0; j < document.scripts.length; j++) {
				if (document.scripts[j].src === r) {
					return;
				}
			}
			k = e.createElement(t);
			a = e.getElementsByTagName(t)[0];
			k.async = true;
			k.src = r;
			a.parentNode.insertBefore(k, a);
		})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

		window.ym(yandexMetrikaId, "init", {
			accurateTrackBounce: true,
			clickmap: true,
			trackLinks: true,
			webvisor: true,
		});

		ready = true;
	}

	window.ym(yandexMetrikaId, "hit", to.href, { referer: from?.href || "" });
}
