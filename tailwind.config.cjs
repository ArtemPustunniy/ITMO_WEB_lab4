module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{ts,tsx,js,jsx}"
	],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: "#22c55e",
					dark: "#16a34a"
				}
			}
		}
	},
	plugins: []
};

