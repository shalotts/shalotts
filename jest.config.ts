import type { Config }             from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions }         from './tsconfig.json';

const config: Config = {
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  roots: [
    '<rootDir>/app/',
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  notify: true,
  verbose: true,

};

export default config;