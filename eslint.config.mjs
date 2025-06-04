import configPrettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  {
    ignores: ["node_modules",".next", "public", "styles/*.css", "*.config.js", "*.config.mjs", "*.json"],
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  
  {
    rules: {
      ...configPrettier.rules,
    },
  },
]);
