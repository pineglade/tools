/** Минификация для служебного пользования (только устранение DX-"сахара") */
export function minifyInternally(source: string) {
	return source.replace(/\t|\n|<!--.*?-->/g, "");
}
