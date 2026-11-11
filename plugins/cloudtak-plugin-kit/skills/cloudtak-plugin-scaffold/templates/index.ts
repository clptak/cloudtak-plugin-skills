// CloudTAK's Vite build discovers plugins with
// import.meta.glob(['../plugins/*.ts', '../plugins/*/index.ts'])
// so this file is the entry point when the repo sits at <web>/plugins/__SLUG__/.
export { default, _typecheck } from './src/index.ts';
