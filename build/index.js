#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const branch_delete_1 = __importDefault(require("./branch-delete"));
const branch_checkout_1 = __importDefault(require("./branch-checkout"));
const stage_files_1 = __importDefault(require("./stage-files"));
const discard_files_1 = __importDefault(require("./discard-files"));
const yargsBuilder = yargs_1.default
    .usage('Usage: $0 <command> [options]')
    .help('h')
    .alias('h', 'help');
branch_delete_1.default(yargsBuilder);
branch_checkout_1.default(yargsBuilder);
stage_files_1.default(yargsBuilder);
discard_files_1.default(yargsBuilder);
yargsBuilder.demandCommand(1, 'You need at least one command');
yargsBuilder.argv;
//# sourceMappingURL=index.js.map