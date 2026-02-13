import { cp, mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const sourceDir =
  process.env.OBSIDIAN_ARTICLES_DIR ||
  "/Users/zeyuansun/Documents/Obsidian Vault/BiotechSite";
const targetDir = path.join(process.cwd(), "content/articles");

async function main() {
  await mkdir(targetDir, { recursive: true });

  const entries = await readdir(sourceDir, { withFileTypes: true });
  const markdownFiles = entries.filter(
    (entry) => entry.isFile() && /\.(md|markdown)$/i.test(entry.name)
  );

  for (const file of markdownFiles) {
    const sourcePath = path.join(sourceDir, file.name);
    const targetPath = path.join(targetDir, file.name);
    await cp(sourcePath, targetPath, { force: true });
  }

  console.log(
    `Synced ${markdownFiles.length} file(s) from ${sourceDir} to ${targetDir}`
  );
}

main().catch((error) => {
  console.error("Failed to sync Obsidian articles:", error.message);
  process.exit(1);
});
