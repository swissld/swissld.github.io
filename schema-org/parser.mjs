
import { parse } from "csv-parse/sync";
import { validateSingleString, validateComment, validateBlankOrNot, validateBlankOrNotContainsComma, validatePartOf } from "./validator.mjs";

///////////////////////////////////////////////////////////////////////////////////////////////////////

class Parser
	{
	/**
	 * @param {String} release
	 */
	constructor(release = "28.1")
		{
		this.release = release;
		}

	async properties()
		{
		let csv = await this.download(this.url("properties"));

		let records = parse(csv, {columns: true, skipEmptyLines: true});

		let properties = records.map(record =>
			{
			validateSingleString(record.id);
			validateSingleString(record.label);
			validateComment(record.comment);
			//domainIncludes: nullIfBlankOrSplitAndTrim(record.domainIncludes),
			validateBlankOrNot(record.supersedes);
			validateBlankOrNotContainsComma(record.supersededBy);
			validatePartOf(record.isPartOf);

			let property = {};

			property.id = record.id.nullIfBlank();
			property.label = record.label.nullIfBlank();
			property.comment = record.comment.nullIfBlank();
			property.supersedes = record.supersedes.nullOrSplitAndTrim();
			property.supersededBy = record.supersedes.nullIfBlank();
			property.partOf = record.isPartOf.nullIfBlank();

			return property;
			});

		let map = {};

		properties.forEach(property =>
			{
			let id = property.id;

			delete property.id;

			map[id] = property;
			});

		return map;
		}

	async types()
		{
		let csv = await this.download(this.url("types"));

		let records = parse(csv, {columns: true, skipEmptyLines: true});

		let types = records.map(record =>
			{
			validateSingleString(record.id);
			validateSingleString(record.label);
			validateComment(record.comment);
			validateBlankOrNot(record.subTypeOf);
			validateBlankOrNot(record.subTypes);
			validateBlankOrNot(record.properties);
			validateBlankOrNot(record.supersedes);
			validateBlankOrNotContainsComma(record.supersededBy);
			validatePartOf(record.isPartOf);

			let type = {};

			type.id = record.id.nullIfBlank();
			type.label = record.label.nullIfBlank();
			type.comment = record.comment.nullIfBlank();
			type.subTypeOf = record.subTypeOf.nullOrSplitAndTrim();
			type.subTypes = record.subTypes.nullOrSplitAndTrim();
			type.properties = record.properties.nullOrSplitAndTrim();
			type.supersedes = record.supersedes.nullOrSplitAndTrim();
			type.supersededBy = record.supersedes.nullIfBlank();
			type.partOf = record.isPartOf.nullIfBlank();

			return type;
			});

		let map = {};

		types.forEach(type =>
			{
			let id = type.id;

			delete type.id;

			map[id] = type;
			});

		return map;
		}

	/**
	 * @param {String} what
	 */
	url(what)
		{
		return `https://github.com/schemaorg/schemaorg/raw/refs/heads/main/data/releases/${this.release}/schemaorg-all-https-${what}.csv`;
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

const _Parser = Parser;

///////////////////////////////////////////////////////////////////////////////////////////////////////

export { _Parser as Parser };
