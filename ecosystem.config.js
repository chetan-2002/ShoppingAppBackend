module.exports = {
  apps: [
    {
      name: "backend",
      script: "./index.js",
      watch: true,
      exec_mode: "cluster",
      instances: "1",
    },
  ],
};
