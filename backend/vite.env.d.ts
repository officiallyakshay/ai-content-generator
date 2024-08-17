// vite-env.d.ts
interface ImportMetaEnv {
  OPENAI_API_KEY: any;
  readonly VITE_API_URL: string;
  // Add other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
