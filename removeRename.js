const fs = require("fs");

try {
  const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

  //   packageJson.scripts.postinstall = "patch-package && npx jetify";
  packageJson.scripts.postinstall = "npx jetify";

  delete packageJson.scripts.preinstall;

  fs.writeFileSync("./package.json", JSON.stringify(packageJson));
} catch {}
