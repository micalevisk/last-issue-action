import { makeOctokitClient } from './client';
import { findLastIssueWith } from './core';

interface IssueFilters {
  githubToken: string;
  /* The target GitHub owner and name separated by slash. */
  githubRepository: string;
  /* Supported issue filters. */
  labels: string[];
  state: 'open' | 'closed' | 'all';
}

type Options = {
  inputs: IssueFilters;
};

interface IssueMetadata {
  issueNumber: number;
  isClosed: boolean;
}

type IssueInfo = { hasFound: false } | ({ hasFound: true } & IssueMetadata);

export async function fetchLastIssueInfo({ inputs }: Options): Promise<IssueInfo> {
  const octokitClient = makeOctokitClient(inputs.githubToken);
  const [owner, repo] = inputs.githubRepository.split('/', 2);
  const latestReportIssue = await findLastIssueWith(octokitClient, {
    withLabels: inputs.labels,
    withState: inputs.state,
    repositoryOwner: owner,
    repositoryName: repo,
  });

  return latestReportIssue
    ? {
        hasFound: true,
        issueNumber: latestReportIssue.number,
        isClosed: latestReportIssue.state === 'closed',
      }
    : {
        hasFound: false,
      };
}
