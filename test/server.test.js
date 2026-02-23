const test = require('node:test');
const assert = require('node:assert/strict');
const { buildAiReply } = require('../server');

test('buildAiReply greets user', () => {
  const output = buildAiReply('hello there');
  assert.match(output, /Hello/i);
});

test('buildAiReply handles empty input', () => {
  const output = buildAiReply('   ');
  assert.match(output, /didn't catch/i);
});

test('buildAiReply echoes generic responses', () => {
  const output = buildAiReply('Explain event loops');
  assert.match(output, /You said/);
});
