export default {
	plugins: {
		// postcss-media-minmax converts range syntax to traditional
		// (width <= 700px) → (max-width: 700px) for Safari <16.4
		'postcss-media-minmax': {}
	}
};
