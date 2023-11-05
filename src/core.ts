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
  const { data } = await octokitClient.rest.issues.list({
    owner,
    repo,
    state,
    labels: labels.join(','),
    sort: 'updated',
    direction: 'desc',
    per_page: 1,
    page: 1,
  });
  return data[0];
}
