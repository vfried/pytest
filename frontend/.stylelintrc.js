module.exports = {
    extends: [
      'stylelint-config-standard',
      // 'stylelint-config-rational-order',
      // 'stylelint-prettier/recommended',
    ],
    rules: {
      // // Stylelint
      // 'declaration-empty-line-before': null,
      // 'function-name-case': null,
      // 'no-descending-specificity': null,
      // 'no-empty-source': null,
      // 'value-keyword-case': null,
      // 'function-whitespace-after': null,
  
      // // Doesn't have the ignoreAtRules option to ignore tailwind keywords
      // 'no-invalid-position-at-import-rule': null,
  
      // // Order
      // 'order/properties-order': [],
      // 'plugin/rational-order': [
      //   true,
      //   {
      //     'border-in-box-model': false,
      //     'empty-line-between-groups': false,
      //   },
      // ],
    },
  };