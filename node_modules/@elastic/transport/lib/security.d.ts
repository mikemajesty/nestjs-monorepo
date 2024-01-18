import { DiagnosticResult } from './types';
import { RedactionOptions } from './Transport';
/**
 * Clones an object and recursively loops through all keys, redacting their values if the key matches any of a list of strings.
 * @param obj: Object to clone and redact
 * @param additionalKeys: Extra keys that can be matched for redaction. Does not overwrite the default set.
 */
export declare function redactObject(obj: Record<string, any>, additionalKeys?: string[]): Record<string, any>;
/**
 * Redacts a DiagnosticResult object using the provided options.
 * - 'off' does nothing
 * - 'remove' removes most optional properties, replaces non-optional properties with the simplest possible alternative
 * - 'replace' runs `redactObject`, which replaces secret keys with `[redacted]`
 */
export declare function redactDiagnostic(diag: DiagnosticResult, options: RedactionOptions): DiagnosticResult;
