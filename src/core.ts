import type { Octokit } from './client.js';

interface FindOptions {
  withLabels: string[];
  withState: 'open' | 'closed' | 'all';
  repositoryOwner: string;
  repositoryName: string;
}

/** */
export async function findLastIssueWith(
  octokitClient: Octokit,
  {
    withLabels: labels,
    withState: state,
    repositoryOwner: owner,
    repositoryName: repo,
  }: FindOptions,
) {
  // See https://docs.github.com/en/rest/reference/issues
  const {
    data: [lastIssueFound],
  } = await octokitClient.request('GET /repos/{owner}/{repo}/issues', {
    headers: {
      accept: 'application/vnd.github.v3+json',
    },
    owner,
    repo,
    state,
    labels: labels.join(','),
    sort: 'updated',
    direction: 'desc',
    per_page: 1,
    page: 1,
  });

  return lastIssueFound;
}
