import { jest } from '@jest/globals';
import { createProducer } from '../src/index.js';

describe('main', () => {
  describe('exports', () => {
    it('should expose a createProducer function', () => {
      expect(typeof createProducer).toBe('function');
    });
  });

  describe('createProducer', () => {
    it('should return a function', () => {
      const producer = createProducer({
        url: 'http://localhost:8080',
        topic: 'some-topic',
        fetch: global.fetch,
      });

      expect(typeof producer).toBe('function');
    });

    it('should call fetch with transformed records', async () => {
      const fetch = jest.fn();
      const producer = createProducer<{ foo: string }>({
        url: 'http://localhost:8080',
        topic: 'some-topic',
        fetch: fetch as typeof global.fetch,
      });

      await expect(producer([{ foo: 'bar' }])).resolves.toBeUndefined();

      expect(fetch).toHaveBeenCalledWith('http://localhost:8080', {
        body: expect.any(String),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'content-type': 'application/json' },
        method: 'POST',
      });
      const call = fetch.mock.calls?.[0];
      const options = call?.[1];
      const body = JSON.parse(typeof options === 'object' && options && 'body' in options ? (options.body as string) : '{}');

      expect(body).toHaveLength(1);
      expect(body[0]).toMatchObject({
        topic: 'some-topic',
        value: { foo: 'bar' },
      });
    });

    it('should call fetch with transformed records and keyExtractor', async () => {
      const fetch = jest.fn() as typeof global.fetch;
      const producer = createProducer<{ foo: string }>({
        url: 'http://localhost:8080',
        topic: 'some-topic',
        fetch,
        keyExtractor: (record) => record.foo,
      });

      await expect(producer([{ foo: 'bar' }])).resolves.toBeUndefined();

      expect(fetch).toHaveBeenCalledWith('http://localhost:8080', {
        body: JSON.stringify([
          {
            topic: 'some-topic',
            key: 'bar',
            value: { foo: 'bar' },
          },
        ]),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'content-type': 'application/json' },
        method: 'POST',
      });
    });

    it('should call fetch with extra headers', async () => {
      const fetch = jest.fn() as typeof global.fetch;
      const producer = createProducer<{ foo: string }>({
        url: 'http://localhost:8080',
        topic: 'some-topic',
        fetch,
      });

      await expect(producer([{ foo: 'bar' }], { 'x-foo': 'bar' })).resolves.toBeUndefined();

      expect(fetch).toHaveBeenCalledWith('http://localhost:8080', {
        body: expect.any(String),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'content-type': 'application/json', 'x-foo': 'bar' },
        method: 'POST',
      });
    });
  });
});
