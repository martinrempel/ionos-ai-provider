# AI SDK - IONOS AI Model Hub Provider

The IONOS AI Model Hub Provider for the [AI SDK](https://sdk.vercel.ai/docs) contains language model support for the IONOS AI Model Hub.

## Setup

The IONOS AI Model Hub Provider is available in the `@martinrempel/ionos-ai-provider` module. You can install it with

```bash
npm i @@martinrempel/ionos-ai-provider
```

## Provider Instance

You can import the default provider instance `ionos` from `@martinrempel/ionos-ai-provider`:

```ts
import { ionos } from '@martinrempel/ionos-ai-provider';
```

## Example

```ts
import { ionos } from '@martinrempel/ionos-ai-provider';
import { generateText } from 'ai';

const { text } = await generateText({
  model: ionos('meta-llama/Meta-Llama-3.1-70B-Instruct'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

## Documentation

Please check out the **[IONOS AI Model Hub](https://docs.ionos.com/cloud/ai/ai-model-hub)** and the **[AI SDK](https://sdk.vercel.ai/docs)** documentation for more information.
