
import { isNull } from "./util.mjs";
import { SCHEMAS } from "./schema-org.mjs";

///////////////////////////////////////////////////////////////////////////////////////////////////////

function validateNotNull(value)
	{
	if (isNull(value))
		{
		throw new Error();
		}
	}

function validateNotBlank(value)
	{
	if (value.isBlank())
		{
		throw new Error();
		}
	}

function validateIsArray(value)
	{
	if (!Array.isArray(value))
		{
		throw new Error(typeof value);
		}
	}

function validateContains(value, required)
	{
	if (value.indexOf(required) < 0)
		{
		throw new Error(value);
		}
	}

function validateNotContains(value, forbidden)
	{
	if (value.indexOf(forbidden) >= 0)
		{
		throw new Error(value);
		}
	}

function validateSingleString(value)
	{
	validateNotNull(value);
	validateNotBlank(value);
	validateNotContains(value, ",");
	}

function validateComment(value)
	{
	validateNotNull(value);
	validateNotBlank(value);
	}

function validateBlankOrNot(value)
	{
	validateNotNull(value);

	if (value.isBlank())
		{
		return;
		}

	validateNotBlank(value);
	}

function validateBlankOrNotContainsComma(value)
	{
	validateNotNull(value);

	if (value.isBlank())
		{
		return;
		}

	validateNotBlank(value);
	validateNotContains(value, ",");
	}

function validatePartOf(value)
	{
	validateBlankOrNotContainsComma(value)

	if (!SCHEMAS.includes(value))
		{
		throw new Error(value);
		}
	}

export
	{
	validateSingleString,
	validateComment,
	validateBlankOrNot,
	validateBlankOrNotContainsComma,
	validatePartOf
	};
