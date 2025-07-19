/**
 * Функция для пометок шаблонных строк,
 * в которых нужна поддержка HTML/SQL со стороны VS Code
 */
export function markTemplate(
	raw: TemplateStringsArray,
	...values: unknown[]
): string {
	return String.raw({ raw }, ...values);
}

export { markTemplate as html, markTemplate as xml };
