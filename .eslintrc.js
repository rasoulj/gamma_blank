module.exports = {
  root: true,
  extends: '@react-native',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': ['error'],
  // overrides: [
  //   {
  //     files: ['*.ts', '*.tsx'],
  //     rules: {
  //       '@typescript-eslint/no-shadow': ['error'],
  //       'no-shadow': 'off',
  //       'no-undef': 'off',
  //     },
  //   },
  // ],
};
