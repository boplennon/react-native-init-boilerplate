module.exports = {
  "trailingComma": "es5",
  "arrowParens": "always",
  "printWidth": 150,
  "useTabs": false,
  "tabWidth": 2,
  "jsxBracketSameLine": false,
  "parser": "typescript",
  "overrides": [
    {
      "files": "*.ts",
      "options": { "parser": "typescript" }
    },
    {
      "files": "*.tsx",
      "options": { "parser": "typescript" }
    },
    {
      "files": "*.json",
      "options": { "parser": "json" }
    },
    {
      "files": "*.js",
      "options": { "parser": "babylon" }
    },
    {
      "files": "*.graphql",
      "options": { "parser": "graphql" }
    },
    {
      "files": "*.prettierrc",
      "options": { "parser": "json" }
    },
    {
      "files": "*.eslintrc",
      "options": { "parser": "json" }
    },
    {
      "files": "*.md",
      "options": { "parser": "markdown" }
    }
  ]
}
