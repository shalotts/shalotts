import type { Config }             from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions }         from './tsconfig.json';

const config: Config = {
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  roots: [
    '<rootDir>/app/',
    '<rootDir>/src/',
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  notify: true,
  verbose: true,
};

export default config;