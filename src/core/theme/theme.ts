const themeVariables = {
	colors: {
		/**#7E5A9B*/
		"Royal Purple": "#7E5A9B",
		/**#B288C0*/
		"African Violet": "#B288C0",
		/**#E4B7E5*/
		"Pink Lavender": "#E4B7E5",
		/**#63458A*/
		"Cyber Grape":"#63458A",
		/**#9A48D0*/
		"Dark Orchid": "#9A48D0",
		"White": "#FFFFFF",
		"Black": "#2a2a2a",
		"Overlay": "#00000033"
	},
};

export const theme = {
	colors: {
		lightAccent: themeVariables.colors["Royal Purple"],
		accent: themeVariables.colors["Cyber Grape"],
		white: themeVariables.colors["White"],
		backgroundColor: themeVariables.colors["Black"],
		overlayColor: themeVariables.colors["Overlay"]
	}
};