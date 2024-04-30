const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig();
  return {
    ...defaultConfig,
    transformer: {
      babelTransformerPath: require.resolve(
        "metro-react-native-babel-transformer"
      ),
    },
  };
})();
