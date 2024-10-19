import pluginJs from "@eslint/js"
import globals from "globals"

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
  pluginJs.configs.recommended,
]
