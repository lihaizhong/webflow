import Ajv from 'ajv'

/**
 * 定义标准的Schema
 * @param {string} title Schema名称
 * @param {object} schema
 */
export default function createSchema(title, schema = {}) {
  schema['title'] = title
  schema['$schema'] = 'http://json-schema.org/draft-07/schema#'
  const ajv = new Ajv({ allErrors: true, verbose: true })
  return ajv.compile(schema)
}

/**
 * schema type enum
 */
export const SchemaType = {
  String: 'string',
  Integer: 'integer',
  Number: 'number',
  Boolean: 'boolean',
  Object: 'object',
  Array: 'array',
  Null: 'null'
}

export const SchemaPattern = {
  Email: '',
  Mobile: ''
}
