import { randomUUID } from 'node:crypto';

type Fetch = typeof global.fetch;

const toKafkaRecord = <Record>(key: string, topic: string, value: Record) => ({
  topic,
  key,
  value,
});

const produce = async <Record>({
  records,
  url,
  keyExtractor,
  fetch,
  topic,
  extraHeaders,
}: {
  fetch: Fetch;
  records: Record[];
  url: string;
  topic: string;
  keyExtractor?: (record: Record) => string;
  extraHeaders?: object;
}) => {
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(records.map((record) => toKafkaRecord(keyExtractor?.(record) ?? randomUUID(), topic, record))),
    headers: {
      ...extraHeaders,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'content-type': 'application/json',
    },
  });
};

export interface ProducerOptions<Record> {
  url: string;
  topic: string;
  fetch: Fetch;
  keyExtractor?: (record: Record) => string;
}

export const createProducer =
  <Record>({ url, topic, fetch, keyExtractor }: ProducerOptions<Record>) =>
  async (records: Record[], extraHeaders?: object) => {
    if (!records.length) {
      return;
    }

    await produce<Record>({
      fetch,
      records,
      url,
      topic,
      keyExtractor,
      extraHeaders,
    });
  };
