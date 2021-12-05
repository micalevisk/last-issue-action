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
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const find_last_issue_with_labels_1 = require("./find-last-issue-with-labels");
async function main() {
    try {
        const labels = core.getInput('labels', { required: true, trimWhitespace: true }).split(',');
        const latestReportIssue = await (0, find_last_issue_with_labels_1.findLastIssueWithLabels)(labels);
        let hasFoundSome = false;
        if (latestReportIssue) {
            hasFoundSome = true;
            core.setOutput('issue_number', latestReportIssue.number);
        }
        core.setOutput('has_found', hasFoundSome);
    }
    catch (err) {
        if (err instanceof Error) {
            core.error(err.message);
        }
        core.setFailed('Something went wrong!');
    }
}
if (require.main === module) {
    main();
}
