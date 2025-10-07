/** @type {import('jest').Config} */
export default {
  // Использовать ts-jest для обработки TypeScript файлов
  preset: 'ts-jest',
  
  // Окружение для тестов (jsdom эмулирует браузер)
  testEnvironment: 'jsdom',
  
  // Корневая директория для поиска тестов
  roots: ['<rootDir>/src'],
  
  // Паттерны для поиска тестовых файлов
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  
  // Алиасы путей (должны совпадать с tsconfig.paths.json)
  moduleNameMapper: {
    '^@controllers(.*)$': '<rootDir>/src/controllers$1',
    '^@models(.*)$': '<rootDir>/src/models$1',
    '^@ui-pages(.*)$': '<rootDir>/src/ui/pages$1',
    '^@ui-blocks(.*)$': '<rootDir>/src/ui/blocks$1',
    '^@ui-components(.*)$': '<rootDir>/src/ui/components$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@styles(.*)$': '<rootDir>/src/ui/styles$1',
    
    // Мокирование стилей и шаблонов
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '\\.(hbs)\\?raw$': '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(hbs)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
  
  // Расширения файлов
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Покрытие кода
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/__tests__/**',
    '!src/main.ts',
    '!src/vite-env.d.ts',
  ],
  
  // Директория для отчетов о покрытии
  coverageDirectory: 'coverage',
  
  // Игнорировать node_modules и dist
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  
  // Трансформация файлов
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: {
        verbatimModuleSyntax: false,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      },
    }],
  },
};
