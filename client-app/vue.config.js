// module.exports = {
//   css: {
//     loaderOptions: {
//       sass: {
//         data: `@import "@/assets/scss/main.scss";`
//       }
//     }
//   }
// };

module.exports = {
    devServer: {
        port: 3454,
    },
    runtimeCompiler: true,
    configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm-bundler.js'
      }
    }
  }
    // resolve: {
    //   alias: {
    //     'vue$': 'vue/dist/vue.esm.js'
    //   }
    // }
} 