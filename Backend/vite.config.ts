import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";
import dotenv from "dotenv";

dotenv.config();
const { PORT } = process.env;

export default defineConfig({
    server: {
        port: 3000,
        fs: {
            allow: [
                // Add the directory where your file is located
                'F:/ttcs/webComics_NodeJs/Store-book-main/Backend/src/middlewares/tmp',
                // Add the project root to avoid restrictions
                'F:/ttcs/webComics_NodeJs/Store-book-main/Client'
            ]
        }
    },
    

    plugins: [
        ...VitePluginNode({
            adapter: "express",
            appPath: "./src/app.js",
            exportName: "viteNodeApp",
            tsCompiler: "esbuild",
            swcOptions: {},
         
        }),
    ],
    optimizeDeps: {},
});
