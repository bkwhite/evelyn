module.exports = {
	bracketSpacing: true,
	jsxBracketSameLine: true,
	singleQuote: true,
	trailingComma: 'none',
	printWidth: 100,
	useTabs: true,
	overrides: [
		{
			files: '*.yml',
			options: {
				useTabs: false
			}
		}
	]
};
