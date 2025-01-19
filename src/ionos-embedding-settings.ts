import { OpenAICompatibleEmbeddingSettings } from "@ai-sdk/openai-compatible";

export type IonosEmbeddingModelId =
  | "sentence-transformers/paraphrase-multilingual-mpnet-base-v2"
  | "BAAI/bge-large-en-v1.5"
  | "BAAI/bge-m3"
  | (string & {});

export interface IonosEmbeddingSettings extends OpenAICompatibleEmbeddingSettings { }