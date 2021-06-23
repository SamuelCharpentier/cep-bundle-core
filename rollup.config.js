import externals from 'rollup-plugin-node-externals'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import packageJson from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    commonjs({ include: ['./src/index.ts', 'node_modules/**'] }),
    nodeResolve({ jsnext: true }),
    externals({
      builtins: true,
      deps: true,
      devDeps: false,
      peerDeps: true,
      optDeps: true,
    }),
    typescript({ useTsconfigDeclarationDir: true }),
  ],
}
