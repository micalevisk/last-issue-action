import * as utils from './utils';
import { fetchLastIssueInfo } from './fetch-last-issue-info';

// Check if is running as a script
if (require.main === module) {
  fetchLastIssueInfo({
    inputs: {
      githubRepository: utils.getInput('repository', { required: true }),
      githubToken: utils.getInput('token', { required: true }),
      labels: utils.getInputAsArray('labels', { required: true, trimWhitespace: true }),
      state: utils.getInput('state', { required: false, trimWhitespace: true }) || 'open',
    },
  })
    .then((outputData) => {
      if (outputData.hasFound) {
        utils.setOutput('issue-number', outputData.issueNumber);
        utils.setOutput('is-closed', outputData.isClosed);
      }

      utils.setOutput('has-found', outputData.hasFound);
    })
    .catch((err) => {
      if (err instanceof Error) {
        utils.error(err.message);
      }

      utils.setFailed('Something went wrong!');
    });
}
