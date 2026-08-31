import adapter from '@sveltejs/adapter-static';
import { responsivePreprocess } from './src/lib/preprocessors/responsive.ts';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [responsivePreprocess()],
	compilerOptions: {
		// Force runes mode for the project, except for node_modules
		runes: ({ filename }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true
	},
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		})
	}
};

export default config;
