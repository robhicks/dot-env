const { test } = require('uvu');
const assert = require('uvu/assert');

const dotenv = require('../src/index.js');

test('should handle a basic case', () => {
  debugger;
  dotenv('.env');
  assert.is(process.env.BASIC, 'basic')
})

test('should add a value after a comment line', () => {
  dotenv('.env');
  assert.is(process.env.AFTER_COMMENT_LINE_LINE, 'after_comment_line');
})

test('should not add a value for a name without a value', () => {
  dotenv('.env');
  assert.is(process.env.EMPTY, undefined);
})

test('should add a single-quoted value', () => {
  dotenv('.env');
  assert.is(process.env.SINGLE_QUOTES, 'single_quotes');
})

test('should not trim leading and trailing whitespace from a single-quoted string', () => {
  dotenv('.env');
  assert.is(process.env.SINGLE_QUOTES_SPACED, '    single quotes    ');
})

test('should add a double-quoted value value', () => {
  dotenv('.env');
  assert.is(process.env.DOUBLE_QUOTES, 'double_quotes');
})

test('should not trim leading and trailing whitespace from a double-quoted string', () => {
  dotenv('.env');
  assert.is(process.env.DOUBLE_QUOTES_SPACED, '    double quotes    ');
})

test('should add a name for lines starting with #', () => {
  dotenv('.env');
  assert.is(process.env['# COMMENTS'], undefined);
})

test('should include values with # in them', () => {
  dotenv('.env');
  assert.is(process.env.STRING_CONTAINS_POUND, 'foo#');
})

test('should include values with = in them', () => {
  dotenv('.env');
  assert.is(process.env.EQUAL_SIGNS, 'equals==');
})

test('should retain inner quotes', () => {
  dotenv('.env');
  assert.is(process.env.RETAIN_INNER_QUOTES, '{"foo": "bar"}');
})

test('should retain leading double quote', () => {
  dotenv('.env');
  assert.is(process.env.RETAIN_LEADING_DOUBLE_QUOTE, '"retained');
})

test('should retain leading single quote', () => {
  dotenv('.env');
  assert.is(process.env.RETAIN_LEADING_SINGE_QUOTE, "'retained");
})

test('should retain trailing double quote', () => {
  dotenv('.env');
  assert.is(process.env.RETAIN_TRAILING_DOUBLE_QUOTE, 'retained"');
})

test('should retain leading single quote', () => {
  dotenv('.env');
  assert.is(process.env.RETAIN_TRAILING_SINGLE_QUOTE, "retained'");
})

test('trim spaces from unquoted value', () => {
  dotenv('.env');
  assert.is(process.env.TRIM_SPACE_FROM_UNQUOTED, "some spaced out string");
})

test('correctly handle a username', () => {
  dotenv('.env');
  assert.is(process.env.USERNAME, "therealnerdybeast@example.tld");
})

test('correctly handle a spaced key', () => {
  dotenv('.env');
  assert.is(process.env.SPACED_KEY, "parsed");
})

test('handles an array of .env files', () => {
  dotenv(['.env', '.env-more', '.env-one-more']);
  assert.is(process.env.GRAPHQL_URL, "http://localhost:3000/graphql");
})

test.run();