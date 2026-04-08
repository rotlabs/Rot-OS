import { describe, it, expect } from 'vitest';
import { createUselessBot, isUseless, UselessError, doNothing, getNothing, isNothing } from './index';

describe('@useless/core', () => {
  describe('createUselessBot', () => {
    it('should create a void instance', () => {
      const app = createVoid();
      expect(app).toBeDefined();
      expect(isVoid(app)).toBe(true);
    });

    it('should accept options', () => {
      const app = createVoid({
        mode: 'production',
        debug: true,
      });
      const config = app.getConfig();
      expect(config.mode).toBe('production');
      expect(config.debug).toBe(true);
    });

    it('should have default values', () => {
      const app = createVoid();
      const config = app.getConfig();
      expect(config.mode).toBe('development');
      expect(config.debug).toBe(false);
      expect(config.plugins).toEqual([]);
    });
  });

  describe('VoidInstance', () => {
    it('should initialize successfully', async () => {
      const app = createVoid();
      expect(app.getStatus()).toBe('idle');
      
      await app.initialize();
      expect(app.getStatus()).toBe('ready');
    });

    it('should run successfully', async () => {
      const app = createVoid();
      await app.initialize();
      await app.run();
      expect(app.getStatus()).toBe('ready');
    });

    it('should throw error if run before initialize', async () => {
      const app = createVoid();
      
      await expect(app.run()).rejects.toThrow(VoidError);
      await expect(app.run()).rejects.toThrow('Void must be initialized before running');
    });

    it('should always return undefined from getResult', async () => {
      const app = createVoid();
      await app.initialize();
      await app.run();
      
      const result = app.getResult();
      expect(result).toBeUndefined();
    });

    it('should destroy successfully', async () => {
      const app = createVoid();
      await app.initialize();
      await app.destroy();
      
      expect(app.getStatus()).toBe('destroyed');
    });
  });

  describe('isVoid', () => {
    it('should return true for void instances', () => {
      const app = createVoid();
      expect(isVoid(app)).toBe(true);
    });

    it('should return false for non-void values', () => {
      expect(isVoid({})).toBe(false);
      expect(isVoid(null)).toBe(false);
      expect(isVoid(undefined)).toBe(false);
      expect(isVoid('void')).toBe(false);
      expect(isVoid(42)).toBe(false);
    });
  });

  describe('VoidError', () => {
    it('should be throwable', () => {
      expect(() => {
        throw new VoidError('test error');
      }).toThrow(VoidError);
    });

    it('should have correct name', () => {
      const error = new VoidError('test');
      expect(error.name).toBe('VoidError');
    });

    it('should be instance of Error', () => {
      const error = new VoidError('test');
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('doNothing', () => {
    it('should return a promise', () => {
      const result = doNothing();
      expect(result).toBeInstanceOf(Promise);
    });

    it('should resolve to nothing', async () => {
      const result = await doNothing();
      expect(result).toBeUndefined();
    });
  });

  describe('getNothing', () => {
    it('should return undefined', () => {
      const result = getNothing();
      expect(result).toBeUndefined();
    });
  });

  describe('isNothing', () => {
    it('should return true for undefined', () => {
      expect(isNothing(undefined)).toBe(true);
    });

    it('should return true for null', () => {
      expect(isNothing(null)).toBe(true);
    });

    it('should return false for other values', () => {
      expect(isNothing(0)).toBe(false);
      expect(isNothing('')).toBe(false);
      expect(isNothing(false)).toBe(false);
      expect(isNothing({})).toBe(false);
    });
  });

  describe('plugins', () => {
    it('should initialize plugins', async () => {
      let initialized = false;
      
      const plugin = {
        name: 'test-plugin',
        version: '1.0.0',
        initialize: async () => {
          initialized = true;
        },
      };

      const app = createVoid({ plugins: [plugin] });
      await app.initialize();
      
      expect(initialized).toBe(true);
    });
  });
});
