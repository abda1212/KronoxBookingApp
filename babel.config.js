module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env', // Alias for accessing environment variables
          path: '.env',       // Path to the .env file
          safe: false,        // Whether to enforce all environment variables to be defined
          allowUndefined: true, // Allows undefined variables
        },
      ],
    ],
  };
};
