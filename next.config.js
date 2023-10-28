// module.exports = {
// 	webpack(config, options) {
// 		config.module.rules.push({
// 			loader: '@svgr/webpack',
// 			issuer: /\.[jt]sx?$/,
// 			options: {
// 				prettier: false,
// 				svgo: true,
// 				svgoConfig: {
// 					plugins: [{
// 						name: 'preset-default',
// 						params: {
// 							override: {
// 								removeViewBox: false
// 							}
// 						}
// 					}],
// 				},
// 				titleProp: true,
// 			},
// 			test: /\.svg$/,
// 		});

// 		return config;
// 	},
// };

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false
});
module.exports = withBundleAnalyzer({});
