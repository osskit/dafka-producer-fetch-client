<div align="center">
 
  ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/osskit/dafka-proudcer-fetch-client/bump) [![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/osskit/dafka-producer-fetch-client/blob/master/LICENSE.md) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

typescript-fetch client wrapper for `dafka-producer`  
</div>

## Install
```sh
yarn add @osskit/dafka-producer-fetch-client
```
## Usage
### Scoped
```ts
import { createProducer } from '@osskit/dafka-producer-fetch-client'

export const produce = createProducer<TEventData>('https://my-dafka-producer-url', 'my-topic', 'my-partition-key');

await produce<TEventData>(payload);
```

## API
### createProducer(url: string, topic: string, key?: string)
#### url
Type: `string`

The URL of `dafka-producer`

#### topic
Type: `string`

The Kafka Topic name

#### key
Type: `string`

The Kafka Topic Partition key, if not supplied then a random UUID is generated

#### returns
An instance of a function that receives `<T>(payload: T)`

## License
[MIT License](LICENSE)
