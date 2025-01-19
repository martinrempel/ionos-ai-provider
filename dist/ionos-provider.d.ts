import { FetchFunction } from "@ai-sdk/provider-utils";
import { IonosChatModelId, IonosChatSettings } from "./ionos-chat-settings.js";
import { EmbeddingModelV1, LanguageModelV1 } from "@ai-sdk/provider";
import { IonosEmbeddingModelId, IonosEmbeddingSettings } from "./ionos-embedding-settings.js";
export interface IonosProviderSettings {
    /**
  IONOS AI Model Hub API key.
  */
    apiKey?: string;
    /**
    Base URL for the API calls.
    */
    baseURL?: string;
    /**
    Custom headers to include in the requests.
    */
    headers?: Record<string, string>;
    /**
    Optional custom url query parameters to include in request urls.
    */
    queryParams?: Record<string, string>;
    /**
    Custom fetch implementation. You can use it as a middleware to intercept requests,
    or to provide a custom fetch implementation for e.g. testing.
    */
    fetch?: FetchFunction;
}
export interface IonosProvider {
    /**
  Creates a model for text generation.
  */
    (modelId: IonosChatModelId, settings?: IonosChatSettings): LanguageModelV1;
    /**
  Creates a chat model for text generation.
  */
    chatModel(modelId: IonosChatModelId, settings?: IonosChatSettings): LanguageModelV1;
    /**
  Creates a text embedding model for text generation.
  */
    textEmbeddingModel(modelId: IonosEmbeddingModelId, settings?: IonosEmbeddingSettings): EmbeddingModelV1<string>;
}
export declare function createIonos(options?: IonosProviderSettings): IonosProvider;
export declare const ionos: IonosProvider;
