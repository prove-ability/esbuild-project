import { build } from "esbuild";
import { pnpPlugin } from "@yarnpkg/esbuild-plugin-pnp";

let definePlugin = {
  name: "auto-node-env",
  setup(build) {
    const options = build.initialOptions;
    options.define = options.define || {};
    options.define["process.env.NODE_ENV"] = options.minify
      ? '"production"'
      : '"development"';
  },
};

build({
  entryPoints: ["./src/App.tsx"],
  bundle: true,
  outfile: "./public/bundle.js",
  minify: true,
  target: "es2020",
  platform: "node",
  sourcemap: true,
  plugins: [definePlugin, pnpPlugin()],
});
