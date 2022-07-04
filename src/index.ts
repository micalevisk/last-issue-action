import * as utils from './utils';
import { fetchLastIssueInfo } from './fetch-last-issue-info';

// Check if is running as a script
if (require.main === module) {
  fetchLastIssueInfo({
    inputs: {
      githubRepository: utils.getInput('gh-repository', { required: true }),
      githubToken: utils.getInput('gh-token', { required: true }),
      labels: utils.getInputAsArray('labels', { required: true, trimWhitespace: true }),
      state: utils.getInput('state', { required: false, trimWhitespace: true }) || 'open',
    },
  })
    .then((outputData) => {
      if (outputData.hasFound) {
        utils.setOutput('issue_number', outputData.issueNumber);
        utils.setOutput('is_closed', outputData.isClosed);
      }

      utils.setOutput('has_found', outputData.hasFound);
    })
    .catch((err) => {
      if (err instanceof Error) {
        utils.error(err.message);
      }

      utils.setFailed('Something went wrong!');
    });
}
