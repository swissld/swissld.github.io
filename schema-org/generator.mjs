
import { writeFileSync } from "node:fs";
import { Parser } from "./parser.mjs";
import { isNull } from "./util.mjs";

function generate(types, destination)
	{
	let labels = [];

	for (let id in types)
		{
		let type = types[id];

		if (isNull(type.partOf))
			{
			type.id = id;

			writeFileSync(destination + "/" + type.label + ".json", JSON.stringify(type));

			labels.push(type.label);
			}
		}

	writeFileSync(destination + "/all.js", "let all = " + JSON.stringify(labels));
	}

async function generateAll(destination)
	{
	let parser = new Parser();

	let all = await parser.all();

	generate(all.properties, destination + "/properties");
	generate(all.types, destination + "/types");
	generate(all.enumerations, destination + "/enumerations");
	}

export { generateAll };
