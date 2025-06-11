import { JestConfigWithTsJest } from 'ts-jest'

import baseConfig from './jest.config'

const coverageConfig: JestConfigWithTsJest = {
  ...baseConfig,
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['lcov', 'text'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/types/**/*.d.ts'],
}

export default coverageConfig
