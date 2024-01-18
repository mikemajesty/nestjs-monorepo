import type { TSESTree } from '@typescript-eslint/experimental-utils';
import { RequiredParserServices } from './parser-services';
export declare function getTypeFromTreeNode(node: TSESTree.Node, services: RequiredParserServices): import("typescript").Type;
