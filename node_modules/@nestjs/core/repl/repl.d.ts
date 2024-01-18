/// <reference types="node" />
import { DynamicModule, Type } from '@nestjs/common';
import type { ReplOptions } from 'repl';
export declare function repl(module: Type | DynamicModule, replOptions?: ReplOptions): Promise<import("repl").REPLServer>;
