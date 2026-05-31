import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const ts = require("typescript");

const landingPath = new URL("../content/landing.ts", import.meta.url).pathname;
const source = fs.readFileSync(landingPath, "utf8");
const transpiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

const cjs = { exports: {} };
new Function("exports", "module", transpiled)(cjs.exports, cjs);
const { landingHome } = cjs.exports;

const enPath = new URL("../messages/en.json", import.meta.url).pathname;
const en = JSON.parse(fs.readFileSync(enPath, "utf8"));

en.Home = { ...landingHome };
en.Nav.joinWaitlist = "Join Early Access";
en.Footer.contactWaitlist = "Join Early Access";
en.Form.title = "Join Early Access";
en.Form.submit = "Join Early Access";

fs.writeFileSync(enPath, `${JSON.stringify(en, null, 2)}\n`);
console.log("Synced Home keys:", Object.keys(en.Home).length);
