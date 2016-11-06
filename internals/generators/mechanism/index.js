/**
 * Component Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add an mechanism',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'SagaMechanism',
    validate: value => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? 'Mechanism with this name already exists' : true;
      }

      return 'The name is required';
    },
  }],
  actions: data => {
    // Generate index.js and index.test.js
    const actions = [
      {
        type: 'add',
        path: '../../app/mechanisms/{{properCase name}}/index.js',
        templateFile: './component/index.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/mechanisms/{{properCase name}}/mechanism.js',
        templateFile: './component/mechanism.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/mechanisms/{{properCase name}}/tests/index.test.js',
        templateFile: './component/index.test.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/mechanisms/{{properCase name}}/tests/mechanism.test.js',
        templateFile: './component/mechanism.test.hbs',
        abortOnFail: true,
      },
    ];

    return actions;
  },
};
