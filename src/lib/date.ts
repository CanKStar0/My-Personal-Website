import type { Locale } from "@/lib/translations";

const trMonths = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

const enMonths = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function formatBlogDate(dateStr: string, locale: Locale = "tr"): string {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;

  const year = parts[0];
  const monthIdx = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  if (isNaN(monthIdx) || isNaN(day) || monthIdx < 0 || monthIdx > 11) {
    return dateStr;
  }

  if (locale === "en") {
    return `${enMonths[monthIdx]} ${day}, ${year}`;
  }

  return `${day} ${trMonths[monthIdx]} ${year}`;
}
