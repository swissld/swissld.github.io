
import { parse } from "csv-parse/sync";

function splitByComma(text)
	{
	text = text.trim();

	if (0 === text.length)
		{
		return null;
		}

	return text.split(",").map(value => value.trim());
	}

class SchemaOrg
	{
	constructor()
		{
		}

	url(what, release = "28.1", https = "https")
		{
		return `https://github.com/schemaorg/schemaorg/raw/refs/heads/main/data/releases/${release}/schemaorg-all-${https}-${what}.csv`;
		}

	async types()
		{
		let csv = await this.download(this.url("types"));

		let records = parse(csv, {columns: true, skip_empty_lines: true});

		return records.map(record =>
			{
			let type =
				{
				id: record.id,
				label: record.label,
				comment: record.comment,
				subTypeOf: splitByComma(record.subTypeOf)
				};

			return type;
			});
		}

	/**
	 * @param {String} url
	 */
	async download(url)
		{
		let request = await fetch(url);

		let text = await request.text();

		return text;
		}
	}

/*
TYPE:
{
id: 'https://schema.org/ZoneBoardingPolicy',
label: 'ZoneBoardingPolicy',
comment: 'The airline boards by zones of the plane.',
subTypeOf: '',

enumerationtype: 'https://schema.org/BoardingPolicyType',
equivalentClass: '',
properties: '',
subTypes: '',
supersedes: '',
supersededBy: '',
isPartOf: ''
}
*/

const _SchemaOrg = SchemaOrg;

export
	{
	_SchemaOrg as SchemaOrg
	};
