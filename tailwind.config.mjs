/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: '#36783B', //Verde Leiva
				secondary: '#769a75', //verde musgo
				lightGreen: "#eefeed",
				beige: "#f6edd9",
				btnBlue: "#64a0ec"
				
			}
		},
	},
	plugins: [],
}
