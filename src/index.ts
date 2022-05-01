import * as utils from './utils';

import { makeOctokitClient } from './client';
import { findLastIssueWith } from './core';

interface EnvData {
  githubToken: string;
  /** The target GitHub owner and name separated by slash. */
  githubRepository: string;
}

async function main({ githubToken, githubRepository }: EnvData): Promise<void> {
  const inputs = {
    labels: utils.getInputAsArray('labels', { required: true, trimWhitespace: true }),
    state: utils.getInput('state', { required: false, trimWhitespace: true }) || 'open',
  };

  const octokitClient = makeOctokitClient(githubToken);
  const [owner, repo] = githubRepository.split('/', 2);
  const latestReportIssue = await findLastIssueWith(octokitClient, {
    withLabels: inputs.labels,
    withState: inputs.state,
    repositoryOwner: owner,
    repositoryName: repo,
  });

  let hasFoundSome = false;

  if (latestReportIssue) {
    hasFoundSome = true;
    utils.setOutput('issue_number', latestReportIssue.number);
    utils.setOutput('is_closed', latestReportIssue.state === 'closed');
  }

  utils.setOutput('has_found', hasFoundSome);
}

// Check if is running as a script
if (require.main === module) {
  main({
    githubToken: process.env.GITHUB_TOKEN,
    githubRepository: process.env.GITHUB_REPOSITORY,
  }).catch((err) => {
    if (err instanceof Error) {
      utils.error(err.message);
    }

    utils.setFailed('Something went wrong!');
  });
}
