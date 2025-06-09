import { defineConfig } from "wxt"

// See https://wxt.dev/api/config.html
export default defineConfig({
    manifest: {
        action: {},
        permissions: ["storage", "tabs"],
        background: {
            scripts: ["background/main.js"], // MV2-style background script
            persistent: true,
        },
    },
})
