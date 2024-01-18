"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginMetadataPrinter = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const SERIALIZED_METADATA_FILENAME = 'metadata.ts';
const TYPE_IMPORT_VARIABLE_NAME = 't';
/**
 * Prints the metadata to a file.
 */
class PluginMetadataPrinter {
    print(metadata, typeImports, options, tsBinary) {
        const objectLiteralExpr = tsBinary.factory.createObjectLiteralExpression(Object.keys(metadata).map((key) => this.recursivelyCreatePropertyAssignment(key, metadata[key], tsBinary)));
        const exportAssignment = tsBinary.factory.createExportAssignment(undefined, undefined, tsBinary.factory.createArrowFunction([tsBinary.factory.createToken(tsBinary.SyntaxKind.AsyncKeyword)], undefined, [], undefined, tsBinary.factory.createToken(tsBinary.SyntaxKind.EqualsGreaterThanToken), tsBinary.factory.createBlock([
            this.createTypeImportVariableStatement(typeImports, tsBinary),
            tsBinary.factory.createReturnStatement(objectLiteralExpr),
        ], true)));
        const printer = tsBinary.createPrinter({
            newLine: tsBinary.NewLineKind.LineFeed,
        });
        const resultFile = tsBinary.createSourceFile('file.ts', '', tsBinary.ScriptTarget.Latest, 
        /*setParentNodes*/ false, tsBinary.ScriptKind.TS);
        const filename = (0, path_1.join)(options.outputDir, options.filename ?? SERIALIZED_METADATA_FILENAME);
        const eslintPrefix = `/* eslint-disable */\n`;
        (0, fs_1.writeFileSync)(filename, eslintPrefix +
            printer.printNode(tsBinary.EmitHint.Unspecified, exportAssignment, resultFile));
    }
    recursivelyCreatePropertyAssignment(identifier, meta, tsBinary) {
        if (Array.isArray(meta)) {
            return tsBinary.factory.createPropertyAssignment(tsBinary.factory.createStringLiteral(identifier), tsBinary.factory.createArrayLiteralExpression(meta.map(([importExpr, meta]) => tsBinary.factory.createArrayLiteralExpression([
                importExpr,
                tsBinary.factory.createObjectLiteralExpression(Object.keys(meta).map((key) => this.recursivelyCreatePropertyAssignment(key, meta[key], tsBinary))),
            ]))));
        }
        return tsBinary.factory.createPropertyAssignment(tsBinary.factory.createStringLiteral(identifier), tsBinary.isObjectLiteralExpression(meta)
            ? meta
            : tsBinary.factory.createObjectLiteralExpression(Object.keys(meta).map((key) => this.recursivelyCreatePropertyAssignment(key, meta[key], tsBinary))));
    }
    createTypeImportVariableStatement(typeImports, tsBinary) {
        return tsBinary.factory.createVariableStatement(undefined, tsBinary.factory.createVariableDeclarationList([
            tsBinary.factory.createVariableDeclaration(tsBinary.factory.createIdentifier(TYPE_IMPORT_VARIABLE_NAME), undefined, undefined, tsBinary.factory.createObjectLiteralExpression(Object.keys(typeImports).map((ti) => this.createPropertyAssignment(ti, typeImports[ti], tsBinary)), true)),
        ], tsBinary.NodeFlags.Const |
            tsBinary.NodeFlags.AwaitContext |
            tsBinary.NodeFlags.ContextFlags |
            tsBinary.NodeFlags.TypeExcludesFlags));
    }
    createPropertyAssignment(identifier, target, tsBinary) {
        return tsBinary.factory.createPropertyAssignment(tsBinary.factory.createComputedPropertyName(tsBinary.factory.createStringLiteral(identifier)), tsBinary.factory.createIdentifier(target));
    }
}
exports.PluginMetadataPrinter = PluginMetadataPrinter;
