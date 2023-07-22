/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_WS: string
    readonly VITE_IMAGE_SENDER: string
    readonly VITE_IMAGE_RECEIVER: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
