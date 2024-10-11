import path from "path";

module.exports = {
  webpack: {
    alias: {
      "@apis": path.resolve(__dirname, "src/apis"),
      "@animations": path.resolve(__dirname, "src/animations"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@configs": path.resolve(__dirname, "src/configs"),
      "@components": path.resolve(__dirname, "src/components"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@store": path.resolve(__dirname, "src/store"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
};
