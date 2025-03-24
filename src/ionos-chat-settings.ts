import { OpenAICompatibleChatSettings } from "@ai-sdk/openai-compatible";

// https://docs.ionos.com/cloud/ai/ai-model-hub/tutorials/text-generation
export type IonosChatModelId =
  | "meta-llama/Llama-3.3-70B-Instruct"
  | "meta-llama/Meta-Llama-3.1-8B-Instruct"
  | "meta-llama/Meta-Llama-3.1-70B-Instruct"
  | "meta-llama/Meta-Llama-3.1-405B-Instruct-FP8"
  | "meta-llama/CodeLlama-13b-Instruct-hf"
  | "openGPT-X/Teuken-7B-instruct-commercial"
  | "mistralai/Mistral-7B-Instruct-v0.3"
  | "mistralai/Mixtral-8x7B-Instruct-v0.1"
  | (string & {});

export interface IonosChatSettings extends OpenAICompatibleChatSettings {}
