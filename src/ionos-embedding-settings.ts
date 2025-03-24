import { OpenAICompatibleEmbeddingSettings } from "@ai-sdk/openai-compatible";

// https://docs.ionos.com/cloud/ai/ai-model-hub/tutorials/text-embeddings
export type IonosEmbeddingModelId =
  | "sentence-transformers/paraphrase-multilingual-mpnet-base-v2"
  | "BAAI/bge-large-en-v1.5"
  | "BAAI/bge-m3"
  | (string & {});

export interface IonosEmbeddingSettings
  extends OpenAICompatibleEmbeddingSettings {}
