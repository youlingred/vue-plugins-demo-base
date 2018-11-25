{
  "name": "{{libName}}",
  "version": "0.0.0",
  "description": "{{groupName}} | {{ComponentShortName}} | {{chineseName}} | for vue.js",
  "main": "./dist/index.js",
  "keywords": [
    "{{keywords}}",
    "vue",
    "component"
  ],
  "files": [
      "dist:component"
    ],
  "scripts": {
      "dist":"cross-env NODE_ENV=production webpack --config ./config.js --progress --hide-modules"
    },
  "repository": "https://gitlab.tydicdev.com/DS/fe-base/vue-components-base/master/src/components/${componentname}",
  "author": "{{author}}",
  "license": "MIT",
  "dependencies": {}
}
