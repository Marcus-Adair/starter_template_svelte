import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
	plugins: [
		enhancedImages(),
		tailwindcss(),
		sveltekit()
	],
	build: {
		// Use esbuild for CSS minification instead of lightningcss
		// lightningcss converts to range syntax which Safari <16.4 doesn't support
		cssMinify: 'esbuild'
	}
});
