import type { NextConfig } from "next";

// Fully static build: the whole app runs in the browser, so it can be hosted
// anywhere and cached by the service worker for offline use.
const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
