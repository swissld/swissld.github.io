
String.prototype.isBlank = function()
	{
	return (this.trim().length === 0);
	};

String.prototype.ifBlank = function(blank, notBlank = this)
	{
	return this.isBlank() ? blank : notBlank;
	};

String.prototype.nullIfBlank = function()
	{
	return this.ifBlank(null, this);
	};

String.prototype.splitAndTrim = function(separator = ",")
	{
	return this.split(separator).map(value => value.trim());
	};

String.prototype.nullOrSplitAndTrim = function(separator = ",")
	{
	return this.ifBlank(null, this.splitAndTrim(separator));
	};

///////////////////////////////////////////////////////////////////////////////////////////////////////

console.assert("".isBlank());
console.assert("   ".isBlank());
console.assert(" \t   \r \n  ".isBlank());

console.assert("   ".ifBlank("blank") === "blank");
console.assert("not blank".ifBlank(null) === "not blank");

console.assert("   ".nullIfBlank() === null);

console.assert("     ".nullOrSplitAndTrim() === null);
console.assert("a,  b,   c   ".nullOrSplitAndTrim().join() === "a,b,c");

///////////////////////////////////////////////////////////////////////////////////////////////////////

function isNull(value)
	{
	return value === null;
	}

export { isNull };
