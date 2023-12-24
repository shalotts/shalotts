import { defu }      from 'defu';
import { kebabCase } from 'scule';

/**
 * @description Translate JSON to console arguments
 * Example: { name: 'value' } -> { '--name': 'value' }
 * @param {object} arg - { name: 'value' }
 */
export const toConsoleArg = (arg: object) => {
  return Object.entries(arg).reduce((acc, arg) => {
    const [key, value] = arg;
    const argKey = '--' + kebabCase(key);
    const option = {} as any;
    option[argKey] = value;

    return defu(option, acc);
  }, {});
};