import test from 'node:test';
import assert from 'node:assert';

import Probe from './Probe';

// Simple mock function implementation
function createMockFn() {
  const mockFn = function (...args: any[]) {
    mockFn.calls.push(args);
    return mockFn.returnValue;
  };
  mockFn.calls = [] as any[][];
  mockFn.returnValue = undefined;
  mockFn.callCount = function() { return mockFn.calls.length; };
  mockFn.nthCall = function(n: number) { return mockFn.calls[n-1]; };
  return mockFn;
}

test('Probe', async (t) => {
  await t.test('should print property access path default', async () => {
    const mockCallback = createMockFn();
    const oldConsoleLog = console.log;
    console.log = mockCallback;

    const probe = new Probe();
    probe.a.b.c(1, 2).d;
    
    await new Promise(resolve => setTimeout(resolve, 1));
    assert.equal(mockCallback.calls.length, 1);
    assert.deepStrictEqual(mockCallback.calls[0], ['probe.a.b.c.(1, 2).d']);

    console.log = oldConsoleLog;
  });

  await t.test('should work with chained properties and methods', () => {
    const mockCallback = createMockFn();
    const probe = new Probe({ callback: mockCallback });
    
    probe.a.b(1, 2).c.d();

    assert.equal(mockCallback.calls.length, 6);
    assert.deepStrictEqual(mockCallback.calls[0], [['a']]);
    assert.deepStrictEqual(mockCallback.calls[1], [['a', 'b']]);
    assert.deepStrictEqual(mockCallback.calls[2], [['a', 'b', [1, 2]]]);
    assert.deepStrictEqual(mockCallback.calls[3], [['a', 'b', [1, 2], 'c']]);
    assert.deepStrictEqual(mockCallback.calls[4], [['a', 'b', [1, 2], 'c', 'd']]);
    assert.deepStrictEqual(mockCallback.calls[5], [['a', 'b', [1, 2], 'c', 'd', []]]);
  });
});