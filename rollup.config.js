import node from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import meta from "./package.json" with {type: "json"};

const copyright = `// @observablehq/inspector v${meta.version} Copyright ${(new Date).getFullYear()} Observable, Inc.`;

const output = process.env.CI ? {
  format: 'esm',
  file: 'dist/inspector.esm.js',
} : {
  format: "umd",
  extend: true,
  name: "observablehq",
  file: "dist/inspector.js"
}

export default [
  {
    input: "src/index.js",
    plugins: [
      node(),
      process.env.CI ? null : terser({output: {preamble: copyright}})
    ],
    output,
  }
];
