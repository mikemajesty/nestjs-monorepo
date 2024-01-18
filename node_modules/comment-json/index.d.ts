// Original from DefinitelyTyped. Thanks a million
// Type definitions for comment-json 1.1
// Project: https://github.com/kaelzhang/node-comment-json
// Definitions by: Jason Dent <https://github.com/Jason3S>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare const commentSymbol: unique symbol

export type CommentPrefix = 'before'
  | 'after-prop'
  | 'after-colon'
  | 'after-value'
  | 'after'

export type CommentDescriptor = `${CommentPrefix}:${string}`
  | 'before'
  | 'before-all'
  | 'after-all'

export type CommentSymbol = typeof commentSymbol

export class CommentArray<TValue> extends Array<TValue> {
  [commentSymbol]: CommentToken[]
}

export type CommentJSONValue = number
  | string
  | null
  | boolean
  | CommentArray<CommentJSONValue>
  | CommentObject

export interface CommentObject {
  [key: string]: CommentJSONValue
  [commentSymbol]: CommentToken[]
}

export interface CommentToken {
  type: 'BlockComment' | 'LineComment'
  // The content of the comment, including whitespaces and line breaks
  value: string
  // If the start location is the same line as the previous token,
  // then `inline` is `true`
  inline: boolean
  // But pay attention that,
  // locations will NOT be maintained when stringified
  loc: CommentLocation
}

export interface CommentLocation {
  // The start location begins at the `//` or `/*` symbol
  start: Location
  // The end location of multi-line comment ends at the `*/` symbol
  end: Location
}

export interface Location {
  line: number
  column: number
}

export type Reviver = (k: number | string, v: unknown) => unknown

/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 * @param json A valid JSON string.
 * @param reviver A function that transforms the results. This function is called for each member of the object.
 * @param removesComments If true, the comments won't be maintained, which is often used when we want to get a clean object.
 * If a member contains nested objects, the nested objects are transformed before the parent object is.
 */
export function parse(
  json: string,
  reviver?: Reviver,
  removesComments?: boolean
): CommentJSONValue

/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 * @param value A JavaScript value, usually an object or array, to be converted.
 * @param replacer A function that transforms the results or an array of strings and numbers that acts as a approved list for selecting the object properties that will be stringified.
 * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
 */
export function stringify(
  value: unknown,
  replacer?: (
    (key: string, value: unknown) => unknown
  ) | Array<number | string> | null,
  space?: string | number
): string


export function tokenize(input: string, config?: TokenizeOptions): Token[]

export interface Token {
  type: string
  value: string
}

export interface TokenizeOptions {
  tolerant?: boolean
  range?: boolean
  loc?: boolean
  comment?: boolean
}

export function assign<TTarget, TSource>(
  target: TTarget,
  source: TSource,
  // Although it actually accepts more key types and filters then`,
  // we set the type of `keys` stricter
  keys?: readonly (number | string)[]
): TTarget
