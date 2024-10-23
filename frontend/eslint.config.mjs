import pluginJs from "@eslint/js"
import pluginImport from "eslint-plugin-import"
import pluginPrettier from "eslint-plugin-prettier"
import pluginReact from "eslint-plugin-react"
import globals from "globals"

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    ...pluginJs.configs.recommended,
  },
  {
    ...pluginReact.configs.flat.recommended,
    plugins: {
      import: pluginImport,
      prettier: pluginPrettier,
    },
    rules: {
      "no-unused-vars": "off",
      "react/react-in-jsx-scope": "off",
      "import/order": [
        "error",
        {
          groups: [["builtin", "external"], "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "prettier/prettier": "error",
    },
  },
]
