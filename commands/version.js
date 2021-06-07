module.exports = {
  name: 'version',
  description: "Display the current bot's version.",
  execute() {
    const response = {
      data: {
        type: 4,
        data: {
          content: `I'm currently running version \`${process.env.npm_package_version}\`\n[Learn more about this version here](https://github.com/epodol/bearbot/releases/tag/v${process.env.npm_package_version}).`,
        },
      },
    };
    return response;
  },
};
