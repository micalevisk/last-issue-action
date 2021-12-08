import * as utils from './utils';

import { findLastIssueWith } from './core';

async function main(): Promise<void> {
  const inputs = {
    labels: utils.getInputAsArray('labels', { required: true, trimWhitespace: true }),
    state: utils.getInput('state', { required: false, trimWhitespace: true }) || 'open',
  };

  const latestReportIssue = await findLastIssueWith(inputs.labels, inputs.state);

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
  main().catch((err) => {
    if (err instanceof Error) {
      utils.error(err.message);
    }

    utils.setFailed('Something went wrong!');
  });
}
