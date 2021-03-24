module.exports = {
	root: true,
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
	},
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "react", "react-hooks", "prettier"],
	extends: [
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended'
	],
	plugins: ['@typescript-eslint', 'react'],
	parserOptions: {
		parser: 'babel-eslint',
		sourceType: "module",
		ecmaVersion: 2018,
		ecmaFeatures: {
			"tsx": true
		}
	},
	settings: {
		react: {
			version: "detect"
		}
	},
	rules: {
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"import/no-unresolved": 0,
		"react/jsx-filename-extension": [
			2,
			{
				"extensions": [".js", ".jsx", ".ts", ".tsx"]
			}
		],
		"react/jsx-indent": [2, "tab"],
		"react/jsx-indent-props": [2, "tab"],
		"@typescript-eslint/no-inferrable-types": "off",
		"@typescript-eslint/interface-name-prefix": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
	},
	overrides: [{
		files: [
			'**/__tests__/*.{j,t}s?(x)',
			'**/tests/unit/**/*.spec.{j,t}s?(x)',
		],
		rules: {
			"react/prop-types": "off"
		},
		env: {
			jest: true,
		},
	}, ],
};