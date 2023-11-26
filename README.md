<div align="center">
 
  ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/osskit/dafka-producer-fetch-client/publish.yml) [![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/osskit/dafka-producer-fetch-client/blob/master/LICENSE.md) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

typescript-fetch client wrapper for `dafka-producer`  
</div>

## Install
```sh
yarn add @osskit/dafka-producer-fetch-client
```
## Usage
```ts
import { createProducer } from '@osskit/dafka-producer-fetch-client';

export const produce = createProducer<Message>({
    url: 'http://dafka-producer',
    topic: 'my-topic',
    keyExtractor: (record) => record.id,
    fetch: global.fetch,
});

await produce(records);
```
### Extra headers
It is possible to add extra headers to the request
```ts
await produce(records, {
    'x-extra-header': 'value',
});
```

## API
### createProducer({ url, topic, keyExtractor, fetch })
#### url
Type: `string`

The URL of `dafka-producer`

#### topic
Type: `string`

The Kafka Topic name

#### keyExtractor
Type: `(record: Record) => string`

A function to extract the key from a record, defaults to a random `UUID`

#### fetch
Type: `typeof global.fetch`

The fetch function to use

#### returns
An instance of a function that receives `<Record>(records: Record[], extraHeaders?: object)` and returns `Promise<void>`

## License
[MIT License](LICENSE)
