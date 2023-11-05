import { debug, info, warning as warn, error } from '@actions/core';
import * as github from '@actions/github';

export type Octokit = ReturnType<typeof makeOctokitClient>;

export const makeOctokitClient = (auth: string) =>
  github.getOctokit(auth, {
    log: {
      debug,
      info,
      warn,
      error,
    },
  });
