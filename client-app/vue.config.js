const bootstrapSassAbstractsImports = require('vue-cli-plugin-bootstrap-vue/sassAbstractsImports.js')
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
  },
	// css: {
	// 	loaderOptions: {
	// 		sass: {
	// 			additionalData: bootstrapSassAbstractsImports.join('\n')
	// 		},
	// 		scss: {
	// 			additionalData: [...bootstrapSassAbstractsImports, ''].join(';\n')
	// 		}
	// 	}
	// }
} 