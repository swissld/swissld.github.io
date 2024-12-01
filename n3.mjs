
import { writeFileSync } from "node:fs";
import { parse } from "./schema-org/n3.mjs";

let subjects = {};

await parse("n3/valais.n3", subjects);
await parse("n3/sierre.n3", subjects);

//console.log(subjects);

writeFileSync("n3.json", JSON.stringify(subjects, null, 4));
