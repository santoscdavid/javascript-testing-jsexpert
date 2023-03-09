const Fibonacci = require('./fibonacci');
const sinon = require('sinon');
const assert = require('assert');

// Fibonacci: the next value corresponds to the sum of the two previous ones
// given 3
// 0, 1, 1
// given 5
// 0, 1, 1, 2, 3

;(async () => {

  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    // generators returning iterators, (.next)
    // exists 3 forms for read data
    // using the functions .next, for await and rest/spread

    for await (const i of fibonacci.execute(3)) {
    }

    const expectedCallCount = 4;

    assert.deepEqual(spy.callCount, expectedCallCount);
  }
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    const [...results] = fibonacci.execute(5);

    // [0] input = 5, current = 0, next = 1
    // [1] input = 4, current = 1, next = 1
    // [2] input = 3, current = 1, next = 2
    // [3] input = 2, current = 2, next = 3
    // [4] input = 1, current = 3, next = 5
    // [5] input = 0 -> stop

    const { args } = spy.getCall(2);
    const expectedResult = [0, 1, 1, 2, 3];
    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2,
    });

    assert.deepEqual(args, expectedParams);
    assert.deepEqual(results, expectedResult);
  }
})();