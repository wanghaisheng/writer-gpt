const path = require("path");

const isDev = process.env.NODE_ENV === "development";

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  runtimeCaching,
  disable: isDev,
  buildExcludes: ["app-build-manifest.json"]
});

const generateAppDirEntry = entry => {
  const packagePath = require.resolve("next-pwa");
  const packageDirectory = path.dirname(packagePath);
  const registerJs = path.join(packageDirectory, "register.js");

  return entry().then(entries => {
    if (entries["main-app"] && !entries["main-app"].includes(registerJs)) {
      if (Array.isArray(entries["main-app"])) {
        entries["main-app"].unshift(registerJs);
      } else if (typeof entries["main-app"] === "string") {
        entries["main-app"] = [registerJs, entries["main-app"]];
      }
    }
    return entries;
  });
};

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  webpack: config => {
    if (isDev) return config;

    const entry = generateAppDirEntry(config.entry);
    config.entry = () => entry;

    return config;
  }
};

module.exports = withPWA(nextConfig);
