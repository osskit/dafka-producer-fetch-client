import { createProducer } from '../src/index.js';

describe('main', () => {
  describe('exports', () => {
    it('should expose a createProducer function', () => {
      expect(typeof createProducer).toBe('function');
    });
  });
});
