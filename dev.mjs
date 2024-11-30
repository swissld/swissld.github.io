
import { writeFileSync } from "node:fs";
import { SchemaOrg } from "./schema-org.mjs";

let so = new SchemaOrg();

let types = await so.types();

let map = {};

types.forEach(type =>
	{
	map[type.id] = type;
	});

writeFileSync("types.json", JSON.stringify(map, null, 2));
