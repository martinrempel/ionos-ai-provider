import { loadApiKey, withoutTrailingSlash } from "@ai-sdk/provider-utils";
import { OpenAICompatibleChatLanguageModel, OpenAICompatibleEmbeddingModel } from "@ai-sdk/openai-compatible";
export function createIonos(options = {}) {
    var _a;
    const baseURL = withoutTrailingSlash((_a = options.baseURL) !== null && _a !== void 0 ? _a : 'https://openai.inference.de-txl.ionos.com/v1');
    const getHeaders = () => (Object.assign({ Authorization: `Bearer ${loadApiKey({
            apiKey: options.apiKey,
            environmentVariableName: 'IONOS_API_KEY',
            description: 'IONOS AI Model Hub API key',
        })}` }, options.headers));
    const getCommonModelConfig = (modelType) => ({
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
    const createChatModel = (modelId, settings = {}) => {
        return new OpenAICompatibleChatLanguageModel(modelId, settings, Object.assign(Object.assign({}, getCommonModelConfig('chat')), { defaultObjectGenerationMode: 'tool' }));
    };
    const createTextEmbeddingModel = (modelId, settings = {}) => new OpenAICompatibleEmbeddingModel(modelId, settings, getCommonModelConfig('embedding'));
    const provider = (modelId, settings) => createChatModel(modelId, settings);
    // provider.completionModel = createCompletionModel;
    provider.chatModel = createChatModel;
    provider.textEmbeddingModel = createTextEmbeddingModel;
    return provider;
}
export const ionos = createIonos();
