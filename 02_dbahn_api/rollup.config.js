import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import {config} from 'dotenv';
import replace from '@rollup/plugin-replace';

const production = !process.env.ROLLUP_WATCH;

console.log('Enviroment VARS', config().parsed);
const env = {
	isProd: production,
	...config().parsed
}
if (process.env.API_TOKEN) {
	console.log('Token was set');
	env.API_TOKEN = process.env.API_TOKEN;
}

function serve() {
	let server;
	
	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});
			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js',
	},
	plugins: [
    replace({  
      __app: JSON.stringify({
        env
      }),
		}),
		svelte({
			dev: !production,
			css: css => {
				css.write('bundle.css');
			},
			preprocess: sveltePreprocess()
		}),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({ sourceMap: !production }),
		!production && serve(),
		!production && livereload('public'),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
