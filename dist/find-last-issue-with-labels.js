"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findLastIssueWithLabels = void 0;
const client_js_1 = require("./client.js");
const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
async function findLastIssueWithLabels(labels) {
    const { data: [lastIssueFound] } = await client_js_1.octokit.request('GET /repos/{owner}/{repo}/issues', {
        headers: {
            accept: 'application/vnd.github.v3+json',
        },
        owner,
        repo,
        state: 'open',
        labels: labels.join(','),
        sort: 'updated',
        direction: 'desc',
        per_page: 1,
        limit: 1,
    });
    return lastIssueFound;
}
exports.findLastIssueWithLabels = findLastIssueWithLabels;
