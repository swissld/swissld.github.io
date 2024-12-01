
import { writeFileSync } from "node:fs";
import { Parser } from "./parser.mjs";
import { isNull } from "./util.mjs";

async function generate(destination)
	{
	let parser = new Parser();

	//let properties = await parser.properties();
	let types = await parser.types();

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

	writeFileSync(destination + "/types.js", "let types = " + JSON.stringify(labels));
	}

export { generate };
