const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');


const config = getDefaultConfig(__dirname, { isCSSEnabled: true });

config.resolver.assetExts.push('db');

module.exports = withNativeWind(config, { input: './src/globals/global.css' });



