const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './',
})

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    transformIgnorePatterns: [
        // Transform all node_modules that are ESM
        'node_modules/(?!(wagmi|viem|@rainbow-me|@tanstack|lucide-react)/)',
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
}

module.exports = createJestConfig(customJestConfig)
