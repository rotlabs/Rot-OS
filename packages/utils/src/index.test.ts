import { describe, it, expect } from 'vitest';
import {
  noop,
  identity,
  constant,
  sleep,
  asyncNoop,
  empty,
  emptyObject,
  times,
  isUndefined,
  isNull,
  isNullish,
  omit,
  pick,
  deepClone,
  randomId,
  safeJsonParse,
} from './index';

describe('@useless/utils', () => {
  describe('noop', () => {
    it('should do nothing', () => {
      const result = noop();
      expect(result).toBeUndefined();
    });
  });

  describe('identity', () => {
    it('should return input unchanged', () => {
      expect(identity(42)).toBe(42);
      expect(identity('test')).toBe('test');
      expect(identity(null)).toBe(null);
      expect(identity(undefined)).toBe(undefined);
    });
  });

  describe('constant', () => {
    it('should return a function that returns the same value', () => {
      const getVoid = constant(undefined);
      expect(getVoid()).toBeUndefined();
      expect(getVoid()).toBeUndefined();
      
      const getZero = constant(0);
      expect(getZero()).toBe(0);
    });
  });

  describe('sleep', () => {
    it('should wait for specified duration', async () => {
      const start = Date.now();
      await sleep(50);
      const end = Date.now();
      
      expect(end - start).toBeGreaterThanOrEqual(45);
    });
  });

  describe('asyncNoop', () => {
    it('should return a resolved promise', async () => {
      const result = await asyncNoop();
      expect(result).toBeUndefined();
    });
  });

  describe('empty', () => {
    it('should return an empty array', () => {
      const arr = empty();
      expect(arr).toEqual([]);
      expect(arr.length).toBe(0);
    });
  });

  describe('emptyObject', () => {
    it('should return an empty object', () => {
      const obj = emptyObject();
      expect(obj).toEqual({});
      expect(Object.keys(obj).length).toBe(0);
    });
  });

  describe('times', () => {
    it('should call function n times', () => {
      const result = times(5, (i) => i * 2);
      expect(result).toEqual([0, 2, 4, 6, 8]);
    });
    
    it('should handle zero', () => {
      const result = times(0, () => 1);
      expect(result).toEqual([]);
    });
  });

  describe('type guards', () => {
    it('isUndefined should check for undefined', () => {
      expect(isUndefined(undefined)).toBe(true);
      expect(isUndefined(null)).toBe(false);
      expect(isUndefined(0)).toBe(false);
    });

    it('isNull should check for null', () => {
      expect(isNull(null)).toBe(true);
      expect(isNull(undefined)).toBe(false);
      expect(isNull(0)).toBe(false);
    });

    it('isNullish should check for null or undefined', () => {
      expect(isNullish(null)).toBe(true);
      expect(isNullish(undefined)).toBe(true);
      expect(isNullish(0)).toBe(false);
      expect(isNullish('')).toBe(false);
    });
  });

  describe('omit', () => {
    it('should omit specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = omit(obj, ['b']);
      expect(result).toEqual({ a: 1, c: 3 });
    });
  });

  describe('pick', () => {
    it('should pick specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = pick(obj, ['a', 'c']);
      expect(result).toEqual({ a: 1, c: 3 });
    });
  });

  describe('deepClone', () => {
    it('should deep clone objects', () => {
      const obj = { a: 1, b: { c: 2 } };
      const cloned = deepClone(obj);
      
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.b).not.toBe(obj.b);
    });
  });

  describe('randomId', () => {
    it('should generate random strings', () => {
      const id1 = randomId();
      const id2 = randomId();
      
      expect(typeof id1).toBe('string');
      expect(id1).not.toBe(id2);
    });
  });

  describe('safeJsonParse', () => {
    it('should parse valid JSON', () => {
      const result = safeJsonParse('{"a":1}');
      expect(result).toEqual({ a: 1 });
    });

    it('should return undefined for invalid JSON', () => {
      const result = safeJsonParse('invalid');
      expect(result).toBeUndefined();
    });
  });
});
