module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "comma-dangle": 0,
        "prefer-destructuring": ["error", {
            "array": true,
            "object": true
          }, {
            "enforceForRenamedProperties": false
          }]
    }
};