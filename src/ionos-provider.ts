import {
  FetchFunction,
  loadApiKey,
  withoutTrailingSlash,
} from "@ai-sdk/provider-utils";
import { IonosChatModelId, IonosChatSettings } from "./ionos-chat-settings.js";
import { EmbeddingModelV1, LanguageModelV1 } from "@ai-sdk/provider";
import {
  IonosEmbeddingModelId,
  IonosEmbeddingSettings,
} from "./ionos-embedding-settings.js";
import {
  OpenAICompatibleChatLanguageModel,
  OpenAICompatibleEmbeddingModel,
} from "@ai-sdk/openai-compatible";

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
  chatModel(
    modelId: IonosChatModelId,
    settings?: IonosChatSettings
  ): LanguageModelV1;

  /**
Creates a text embedding model for text generation.
*/
  textEmbeddingModel(
    modelId: IonosEmbeddingModelId,
    settings?: IonosEmbeddingSettings
  ): EmbeddingModelV1<string>;
}

export function createIonos(
  options: IonosProviderSettings = {}
): IonosProvider {
  const baseURL = withoutTrailingSlash(
    options.baseURL ?? "https://openai.inference.de-txl.ionos.com/v1"
  );
  const getHeaders = () => ({
    Authorization: `Bearer ${loadApiKey({
      apiKey: options.apiKey,
      environmentVariableName: "IONOS_API_KEY",
      description: "IONOS AI Model Hub API key",
    })}`,
    ...options.headers,
  });

  interface CommonModelConfig {
    provider: string;
    url: ({ path }: { path: string }) => string;
    headers: () => Record<string, string>;
    fetch?: FetchFunction;
  }

  const getCommonModelConfig = (modelType: string): CommonModelConfig => ({
    provider: `ionos.${modelType}`,
    url: ({ path }) => {
      const url = new URL(`${baseURL}${path}`);
      if (options.queryParams) {
        url.search = new URLSearchParams(options.queryParams).toString();
      }
      return url.toString();
    },
    headers: getHeaders,
    fetch: options.fetch,
  });

  const createChatModel = (
    modelId: IonosChatModelId,
    settings: IonosChatSettings = {}
  ) => {
    return new OpenAICompatibleChatLanguageModel(modelId, settings, {
      ...getCommonModelConfig("chat"),
      defaultObjectGenerationMode: "tool",
    });
  };

  const createTextEmbeddingModel = (
    modelId: IonosEmbeddingModelId,
    settings: IonosEmbeddingSettings = {}
  ) =>
    new OpenAICompatibleEmbeddingModel(
      modelId,
      settings,
      getCommonModelConfig("embedding")
    );

  const provider = (modelId: IonosChatModelId, settings?: IonosChatSettings) =>
    createChatModel(modelId, settings);

  // provider.completionModel = createCompletionModel;
  provider.chatModel = createChatModel;
  provider.textEmbeddingModel = createTextEmbeddingModel;

  return provider as IonosProvider;
}

export const ionos = createIonos();
