import shumai from 'shumai';

export const help = new shumai.Flag()
  .withName('help')
  .withIdentifier('help')
  .withShortIdentifier('h');

export const buildPackage = new shumai.Flag()
  .withName('build:package')
  .withIdentifier('build:package')
  .withShortIdentifier('b:p');

export default [help, buildPackage];
