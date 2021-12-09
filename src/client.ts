import { debug, info, warning, error } from '@actions/core';
import { Octokit } from '@octokit/rest';

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  log: {
    debug,
    info,
    warn: warning,
    error,
  },
});
