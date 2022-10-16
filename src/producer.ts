import { randomUUID } from 'node:crypto';

const toProduceRequest = <T>(key: string, topic: string, value: T) => ({
  topic,
  key,
  value,
});

const produce = <T>(payload: T, url: string, topic: string, key?: string) =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(
      Array.isArray(payload)
        ? payload.map((p) => toProduceRequest(key ?? randomUUID(), topic, p))
        : toProduceRequest(key ?? randomUUID(), topic, payload),
    ),
  });

export const createProducer =
  <T>(url: string, topic: string, key?: string) =>
  (payload: T) =>
    produce<T>(payload, url, topic, key);
