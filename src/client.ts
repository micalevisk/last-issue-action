import { debug, info, warning as warn, error } from '@actions/core';
import { Octokit } from '@octokit/rest';
export type { Octokit } from '@octokit/rest';

export const makeOctokitClient = (auth: string): Octokit =>
  new Octokit({
    auth,
    log: {
      debug,
      info,
      warn,
      error,
    },
  });
