import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

// Nitro with Vercel preset — required so vallima-*.vercel.app does not 404.
// Do NOT also set `nitro: true` here (would conflict / use Cloudflare preset).
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      nitro({
        preset: "vercel",
      }),
    ],
  },
});
