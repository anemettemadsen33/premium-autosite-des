// fix-eslint.ts
import { Project } from "ts-morph";
import fg from "fast-glob";

(async () => {
  const paths = await fg(["src/**/*.ts", "src/**/*.tsx"], {
    ignore: ["**/*.d.ts", "node_modules"],
  });

  const project = new Project({
    tsConfigFilePath: "tsconfig.json",
  });

  const sourceFiles = project.addSourceFilesAtPaths(paths);

  let filesModified = 0;

  for (const file of sourceFiles) {
    const unusedImports = file.getImportDeclarations().filter((imp) => {
      const namedImports = imp.getNamedImports();
      return namedImports.every((i) => {
        const name = i.getNameNode().getText();
        const refs = file.getDescendantsOfKind(i.getKind()).filter((node) => node.getText() === name);
        return refs.length <= 1;
      });
    });

    const unusedVars = file.getVariableDeclarations().filter((v) => {
      const name = v.getNameNode().getText();
      const refs = v.findReferences();
      return refs.length === 1;
    });

    if (unusedImports.length || unusedVars.length) {
      unusedImports.forEach((imp) => imp.remove());
      unusedVars.forEach((v) => v.remove());

      file.saveSync();
      filesModified++;
      console.log(`✔️ Cleaned: ${file.getBaseName()}`);
    }
  }

  console.log(`\n✨ ${filesModified} file(s) cleaned!`);
})();
