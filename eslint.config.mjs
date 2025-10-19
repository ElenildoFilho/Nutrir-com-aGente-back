// eslint.config.mjs
import js from '@eslint/js'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import prettierPlugin from 'eslint-plugin-prettier'
import configPrettier from 'eslint-config-prettier'

export default [
  // Ignorar pastas de build e deps
  { ignores: ['dist', 'node_modules'] },

  // JS (se tiver)
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node }
    },
    rules: {
      ...js.configs.recommended.rules
    }
  },

  // TypeScript (type-aware)
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: import.meta.dirname
      },
      globals: { ...globals.node }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin
    },
    rules: {
      // Base recomendado TS
      ...tsPlugin.configs.recommended.rules,

      // Boas práticas backend
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { attributes: false } }],

      // Limpeza/estilo
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': 'off',

      // MOSTRAR problemas de formatação do Prettier no lint
      'prettier/prettier': 'warn'
    }
  },

  // Por último: desativa regras que conflitam com Prettier
  configPrettier
]