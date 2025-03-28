// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: {
    'eslintnode/prefer-global/process': 'off',
  },
})
