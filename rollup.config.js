import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/activengine.esm.js',
      format: 'es',
      name: 'activengine',
    },
    {
      file: 'dist/activengine.umd.js',
      format: 'umd',
      name: 'activengine',
    },
  ],
  plugins: [typescript()],
};