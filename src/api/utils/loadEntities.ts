// import path from "path";
// import fs from "fs";

// type EntitiesFolder = "books" | "authors" | "categories" | "publishers";

// /**
//  * Função para carregar dinamicamente entidades de pastas específicas dentro de `src/entities/`
//  * @param folders - Array com nomes das pastas dentro de `src/entities/`
//  * @returns Lista de entidades carregadas
//  */
// const loadEntities = (folders: EntitiesFolder[]): Function[] => {
//   const isCompiled = __dirname.includes("dist");

//   // 📌 Caminho base para `entities/` (src em dev, dist em produção)
//   const baseEntitiesPath = path.join(
//     __dirname,
//     isCompiled ? "../../.." : "../../",
//     "src/entities",
//   );
//   console.log("🚀 ~ Base Entities Path:", baseEntitiesPath);

//   const getEntityFiles = (dir: string): string[] => {
//     return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
//       const res = path.resolve(dir, entry.name);
//       return entry.isDirectory() ? getEntityFiles(res) : res;
//     });
//   };

//   // 📌 Buscar arquivos `.entity.ts` ou `.entity.js` dentro das pastas especificadas
//   const entityFiles = folders
//     .flatMap((folder) => {
//       const folderPath = path.join(baseEntitiesPath, folder);
//       return fs.existsSync(folderPath) ? getEntityFiles(folderPath) : [];
//     })
//     .filter((file) => file.endsWith(isCompiled ? ".entity.js" : ".entity.ts"));

//   console.log("📌 Arquivos de entidade encontrados:", entityFiles);

//   // 📌 Importar dinamicamente todas as entidades
//   const loadedEntities = entityFiles
//     .map((file) => require(file))
//     .flatMap((module) => Object.values(module))
//     .filter((entity) => typeof entity === "function");

//   console.log(
//     "📦 Entidades carregadas:",
//     loadedEntities.map((e) => e.name),
//   );

//   return loadedEntities;
// };

// export default loadEntities;

import path from "path";
import fs from "fs";

/**
 * Função para carregar dinamicamente entidades específicas dentro de `src/entities/`
 * @param foldersWithFiles - Objeto onde a chave é o nome da pasta e o valor é um array de arquivos a serem carregados
 * @returns Lista de entidades carregadas
 */
export const loadEntities = (
  foldersWithFiles: Record<string, string[]>,
): Function[] => {
  const isCompiled = __dirname.includes("dist");

  // 📌 Agora o caminho base precisa subir dois níveis para chegar até `src/`
  const baseEntitiesPath = path.join(
    __dirname,
    isCompiled ? "../../.." : "../../",
    "src/entities",
  );
  console.log("🚀 ~ Base Entities Path:", baseEntitiesPath);

  // 📌 Buscar os arquivos especificados dentro das pastas informadas
  const entityFiles = Object.entries(foldersWithFiles).flatMap(
    ([folder, files]) => {
      const folderPath = path.join(baseEntitiesPath, folder);
      return files
        .map((file) =>
          path.join(
            folderPath,
            file + (isCompiled ? ".entity.js" : ".entity.ts"),
          ),
        )
        .filter((filePath) => fs.existsSync(filePath));
    },
  );

  console.log("📌 Arquivos de entidade encontrados:", entityFiles);

  // 📌 Importar dinamicamente todas as entidades especificadas
  const loadedEntities = entityFiles
    .map((file) => require(file))
    .flatMap((module) => Object.values(module))
    .filter((entity) => typeof entity === "function");

  console.log(
    "📦 Entidades carregadas:",
    loadedEntities.map((e) => e.name),
  );

  return loadedEntities;
};
