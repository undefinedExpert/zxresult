var OFF = 0, WARN = 1, ERROR = 2;

module.exports = exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
  "rules": {
    "max-len": 0,
    "import/no-unresolved": 0,
    "camelcase": 2,
    "brace-style": 0
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "./internals/webpack/webpack.test.babel.js"
      }
    }
  }
};