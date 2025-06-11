export default {
  '*.{js,ts}': [
    'jest --bail --passWithNoTests --findRelatedTests',
    'echo'
  ],
}
