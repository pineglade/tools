/** Минификация для служебного пользования (только устранение DX-"сахара") */
export function minifyInternal(source: string) {
  return source.replace(/\t|\n+|<!--.*?-->/g, "");
}
