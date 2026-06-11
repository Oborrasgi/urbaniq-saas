const SLUG_WORD_OVERRIDES: Record<string, string> = {
  malaga: "Málaga",
  gipuzkoa: "Gipuzkoa",
  el: "El",
  la: "La",
  los: "Los",
  las: "Las",
  de: "de",
  del: "del"
};

export function cityNameFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map(
      (part) =>
        SLUG_WORD_OVERRIDES[part.toLowerCase()] ?? part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join(" ");
}
