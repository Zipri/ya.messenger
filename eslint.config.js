import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  js.configs.recommended,
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**'],
    files: ['src/**/*.{ts,js,scss}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'import': importPlugin,
      'unused-imports': unusedImports
    },
    rules: {
      // Требует новую строку в конце файла
      'eol-last': ['error', 'always'],
       // Отключаем все правила typescript
       '@typescript-eslint/*': 'off',  
       'no-extra-boolean-cast': 'off',  // Отключаем правило для !!
       'no-undef': 'off',  // Отключаем проверку неопределенных переменных
       'no-empty': 'off',  // Отключаем проверку пустых блоков
       'no-useless-catch': 'off',  // Отключаем проверку ненужных try/catch
       'no-case-declarations': 'off',  // Отключаем предупреждение о декларациях в case
       'no-unused-vars': 'off',
       // 'react-refresh/only-export-components': 'warn',     // Предупреждение если компонент не экспортируется
       'react/jsx-uses-react': 'off',                      // Отключает необходимость импорта React (для React 17+)
       'react/react-in-jsx-scope': 'off',                  // Тоже отключает необходимость импорта React
       //#region Нужные правила:
       'unused-imports/no-unused-imports': 'warn',         // Предупреждение если импорт не используется
       'import/order': [
           'warn',
           {
               'groups': [
                   "builtin",    // Встроенные модули Node.js (fs, path и т.д.)
                   "external",   // Установленные npm пакеты
                   "internal",   // Внутренние пути из настроек
                   "parent",     // Импорты из родительских директорий (../)
                   "sibling",    // Импорты из той же директории (./)
                   "index"       // Импорты из индексных файлов
               ],
               'pathGroupsExcludedImportTypes': ['builtin'],
               'newlines-between': 'always',
               'alphabetize': {
                   'order': 'asc',         // Сортировка по алфавиту
                   'caseInsensitive': true // Игнорировать регистр при сортировке
               }
           }
        ],
    },
  },
];