/// <reference types="vite/client" />

interface ImportMetaEnv {
    // Allow these variables to be accessible in TypeScript
    // Accessible as import.meta.env
    readonly VITE_STATIC_BASE_PATH: string;
    readonly VITE_BUILD_STAGE: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
