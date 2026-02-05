module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000"],
      startServerCommand: "npx serve . -p 3000",
      startServerReadyTimeout: 10000,
      numberOfRuns: 3,
    },
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        "categories:performance": ["warn", { minScore: 0.9 }],
        "categories:accessibility": ["warn", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.9 }],
        "categories:seo": ["warn", { minScore: 0.9 }],
        // Infrastructure limitations
        "uses-http2": "off",
        "redirects-http": "off",
        "uses-long-cache-ttl": "off",
        // Font Awesome CDN issues (will be resolved by replacing with inline SVGs - see TODO)
        "font-display-insight": "off",
        "network-dependency-tree-insight": "off",
        "unused-css-rules": "off",
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
