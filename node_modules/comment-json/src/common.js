const hasOwnProperty = require('has-own-prop')
const {
  isObject,
  isArray,
  isString,
  isNumber
} = require('core-util-is')

const PREFIX_BEFORE = 'before'
const PREFIX_AFTER_PROP = 'after-prop'
const PREFIX_AFTER_COLON = 'after-colon'
const PREFIX_AFTER_VALUE = 'after-value'
const PREFIX_AFTER = 'after'

const PREFIX_BEFORE_ALL = 'before-all'
const PREFIX_AFTER_ALL = 'after-all'

const BRACKET_OPEN = '['
const BRACKET_CLOSE = ']'
const CURLY_BRACKET_OPEN = '{'
const CURLY_BRACKET_CLOSE = '}'
const COMMA = ','
const EMPTY = ''
const MINUS = '-'

const SYMBOL_PREFIXES = [
  PREFIX_BEFORE,
  PREFIX_AFTER_PROP,
  PREFIX_AFTER_COLON,
  PREFIX_AFTER_VALUE,
  PREFIX_AFTER
]

const NON_PROP_SYMBOL_KEYS = [
  PREFIX_BEFORE,
  PREFIX_BEFORE_ALL,
  PREFIX_AFTER_ALL
].map(Symbol.for)

const COLON = ':'
const UNDEFINED = undefined

const symbol = (prefix, key) => Symbol.for(prefix + COLON + key)

const define = (target, key, value) => Object.defineProperty(target, key, {
  value,
  writable: true,
  configurable: true
})

const copy_comments_by_kind = (
  target, source, target_key, source_key, prefix, remove_source
) => {
  const source_prop = symbol(prefix, source_key)
  if (!hasOwnProperty(source, source_prop)) {
    return
  }

  const target_prop = target_key === source_key
    ? source_prop
    : symbol(prefix, target_key)

  define(target, target_prop, source[source_prop])

  if (remove_source) {
    delete source[source_prop]
  }
}

const copy_comments = (
  target, source, target_key, source_key, remove_source
) => {
  SYMBOL_PREFIXES.forEach(prefix => {
    copy_comments_by_kind(
      target, source, target_key, source_key, prefix, remove_source
    )
  })
}

const swap_comments = (array, from, to) => {
  if (from === to) {
    return
  }

  SYMBOL_PREFIXES.forEach(prefix => {
    const target_prop = symbol(prefix, to)
    if (!hasOwnProperty(array, target_prop)) {
      copy_comments_by_kind(array, array, to, from, prefix, true)
      return
    }

    const comments = array[target_prop]
    delete array[target_prop]

    copy_comments_by_kind(array, array, to, from, prefix, true)
    define(array, symbol(prefix, from), comments)
  })
}

const assign_non_prop_comments = (target, source) => {
  NON_PROP_SYMBOL_KEYS.forEach(key => {
    const comments = source[key]

    if (comments) {
      define(target, key, comments)
    }
  })
}

// Assign keys and comments
const assign = (target, source, keys) => {
  keys.forEach(key => {
    if (!isString(key) && !isNumber(key)) {
      return
    }

    if (!hasOwnProperty(source, key)) {
      return
    }

    target[key] = source[key]
    copy_comments(target, source, key, key)
  })

  return target
}

module.exports = {
  SYMBOL_PREFIXES,

  PREFIX_BEFORE,
  PREFIX_AFTER_PROP,
  PREFIX_AFTER_COLON,
  PREFIX_AFTER_VALUE,
  PREFIX_AFTER,

  PREFIX_BEFORE_ALL,
  PREFIX_AFTER_ALL,

  BRACKET_OPEN,
  BRACKET_CLOSE,
  CURLY_BRACKET_OPEN,
  CURLY_BRACKET_CLOSE,

  COLON,
  COMMA,
  MINUS,
  EMPTY,

  UNDEFINED,

  symbol,
  define,
  copy_comments,
  swap_comments,
  assign_non_prop_comments,

  assign (target, source, keys) {
    if (!isObject(target)) {
      throw new TypeError('Cannot convert undefined or null to object')
    }

    if (!isObject(source)) {
      return target
    }

    if (keys === UNDEFINED) {
      keys = Object.keys(source)
      // We assign non-property comments
      // if argument `keys` is not specified
      assign_non_prop_comments(target, source)
    } else if (!isArray(keys)) {
      throw new TypeError('keys must be array or undefined')
    } else if (keys.length === 0) {
      // Or argument `keys` is an empty array
      assign_non_prop_comments(target, source)
    }

    return assign(target, source, keys)
  }
}
