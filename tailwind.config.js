/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				forest: {
					primary: "#1eb854",
					"primary-content": "#000c02",
					secondary: "#1db88e",
					"secondary-content": "#000c07",
					accent: "#1db8ab",
					"accent-content": "#000c0b",
					neutral: "#19362d",
					"neutral-content": "#cdd3d1",
					"base-100": "#171212",
					"base-200": "#120e0e",
					"base-300": "#0e0a0a",
					"base-content": "#cbc9c9",
					"--rounded-btn": "1.9rem"
				},
				blackCyber: {
					"color-scheme": "dark",
					fontFamily:
						"ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace",
					primary: "oklch(94.51% 0.179 104.32)",
					secondary: "oklch(83.33% 0.184 204.72)",
					accent: "oklch(71.86% 0.2176 310.43)",
					neutral: "oklch(74.22% 0.209 6.35)",
					"neutral-content": "oklch(10.04% 0.065 269.31)",
					"base-100": "oklch(23.04% 0.065 269.31)",
					"--rounded-box": "0",
					"--rounded-btn": "0",
					"--rounded-badge": "0",
					"--tab-radius": "0"
				}
			}
		]
	},
	plugins: [require("daisyui")]
};
