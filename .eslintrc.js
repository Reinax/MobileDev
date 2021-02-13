module.exports = {
  root: true,
  extends: '@react-native-community',
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  "parser": [
    "babel-eslint" 
  ],
  extends: [
    "plugin:prettier/recommended",
    "prettier/flowtype",
    "prettier/react"
  ],
  "rules": {
    "linebreak-style": ["error", "windows"]
  }
};

