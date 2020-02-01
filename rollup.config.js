import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup';

module.exports = {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/bundle.js',
            format: 'cjs',
            sourcemap: true
        },
        {
            file: 'dist/es.module.js',
            format: 'es',
            sourcemap: true
        },
    ],
    plugins: [
        babel({
          exclude: "node_modules/**",
          "presets": [
            ["@babel/preset-env", {"modules": false}],
            ["@babel/preset-react", {"modules": false}],
          ]
        }),
        resolve(),
        commonjs(),
        cleanup()
    ],
    external: ['react','react-dom']
  };