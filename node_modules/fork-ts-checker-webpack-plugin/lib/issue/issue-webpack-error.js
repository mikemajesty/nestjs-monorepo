"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueWebpackError = void 0;
const path_1 = __importDefault(require("path"));
const webpack = __importStar(require("webpack"));
const forward_slash_1 = require("../utils/path/forward-slash");
const relative_to_context_1 = require("../utils/path/relative-to-context");
const issue_location_1 = require("./issue-location");
class IssueWebpackError extends webpack.WebpackError {
    constructor(message, pathType, issue) {
        super(message);
        this.issue = issue;
        this.hideStack = true;
        // to display issue location using `loc` property, webpack requires `error.module` which
        // should be a NormalModule instance.
        // to avoid such a dependency, we do a workaround - error.file will contain formatted location instead
        if (issue.file) {
            this.file =
                pathType === 'absolute'
                    ? (0, forward_slash_1.forwardSlash)(path_1.default.resolve(issue.file))
                    : (0, relative_to_context_1.relativeToContext)(issue.file, process.cwd());
            if (issue.location) {
                this.file += `:${(0, issue_location_1.formatIssueLocation)(issue.location)}`;
            }
        }
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.IssueWebpackError = IssueWebpackError;
