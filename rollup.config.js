import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { resolve } from 'path';

const root = process.cwd();

const input = resolve(root, 'src', 'index.js');
const plugins = [nodeResolve(), commonjs()];

export default [
  {
    input,
    plugins,
    output: {
      exports: 'default',
      file: resolve(root, 'index.cjs'),
      format: 'cjs',
    },
  },
  {
    input,
    plugins,
    output: {
      file: resolve(root, 'index.mjs'),
      format: 'es',
    },
  },
];
