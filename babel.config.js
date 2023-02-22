module.exports = {
  presets: ['@vue/app',
  ["@babel/preset-env",{"modules": "commonjs"}]
  ],
  plugins: [
    ["transform-es2015-modules-commonjs"],
    [
      'component',
      {
        libraryName: 'usp-ui',
        libDir: 'componentsLib',
        camel2Dash: false,
        style: false
      }
    ],
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      },
      'element-ui'
    ]
  ]
}
