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
		"Light Gray": "#5f5f5f",
		"Black": "#2a2a2a",
		"Dark Black": "#212121",
		"Overlay": "#00000033",
		"Error Red": "#991111",
	},
} as const;

export const theme = {
	colors: {
		error: themeVariables.colors["Error Red"],
		lightGray: themeVariables.colors["Light Gray"],
		lightAccent: themeVariables.colors["Royal Purple"],
		accent: themeVariables.colors["Cyber Grape"],
		white: themeVariables.colors["White"],
		backgroundColor: themeVariables.colors["Black"],
		darkBackgroundColor: themeVariables.colors["Dark Black"],
		overlayColor: themeVariables.colors["Overlay"]
	}
} as const;