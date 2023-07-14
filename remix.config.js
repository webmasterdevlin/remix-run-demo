/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  future: {
    unstable_tailwind: true,
    v2_errorBoundary: true,
    v2_routeConvention: true,
  },
  serverDependenciesToBundle: [
    "axios",
  ],
};
