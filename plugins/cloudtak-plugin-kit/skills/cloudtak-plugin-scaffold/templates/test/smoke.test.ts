// Unit tests run with Node's built-in runner: npm test
// Keep tested logic in plain .ts modules under src/lib/ or src/domain/ with no Vue or DOM
// imports, so it runs without a browser. UI is verified in a running CloudTAK instead.
import { test } from 'node:test';
import assert from 'node:assert/strict';

test('scaffold runs', () => {
    assert.equal(1 + 1, 2);
});
