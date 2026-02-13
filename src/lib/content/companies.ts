import { promises as fs } from "node:fs";
import path from "node:path";
import { companies as fallbackCompanies, type Company } from "@/data/companies";

const COMPANIES_DATA_FILE =
  process.env.COMPANIES_DATA_FILE || path.join(process.cwd(), "content/companies.json");

function isCompanyArray(value: unknown): value is Company[] {
  if (!Array.isArray(value)) return false;
  return value.every((item) => {
    if (!item || typeof item !== "object") return false;
    const candidate = item as Partial<Company>;
    return Boolean(candidate.slug && candidate.name && candidate.nameEn);
  });
}

export async function getAllCompanies(): Promise<Company[]> {
  try {
    const raw = await fs.readFile(COMPANIES_DATA_FILE, "utf8");
    const parsed: unknown = JSON.parse(raw);
    if (isCompanyArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return fallbackCompanies;
  } catch {
    return fallbackCompanies;
  }
}

export async function getCompanyBySlug(slug: string): Promise<Company | undefined> {
  const companies = await getAllCompanies();
  return companies.find((company) => company.slug === slug);
}
