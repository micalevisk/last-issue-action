import * as core from '@actions/core';

import { findLastIssueWithLabels } from './find-last-issue-with-labels';

if (process.env.NODE_ENV === 'development') await import('dotenv');

try {
  const labels = core.getInput('labels', { required: true, trimWhitespace: true }).split(',');

  const latestReportIssue = await findLastIssueWithLabels(labels);

  let hasFoundSome = false;

  if (latestReportIssue) {
    hasFoundSome = true;
    core.setOutput('issue_number', latestReportIssue.number);
  }

  core.setOutput('has_found', hasFoundSome);
} catch(err) {
  if (err instanceof Error) {
    core.error(err.message);
  }

  core.setFailed('Something went wrong!');
}
