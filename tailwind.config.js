/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: { Urbanist: "'Urbanist-web'" },
			colors: { primary: "#151515" },
			backgroundImage: {
				"gradient-145":
					"linear-gradient(145deg, var(--tw-gradient-stops))",
			},
			animation: {
				fade: "fade 2000ms ease-in-out forwards",
			},
			keyframes: {
				fade: {
					"0%": { opacity: "1" },
					"100%": { opacity: "0" },
				},
			},
		},
	},
	plugins: [],
};
