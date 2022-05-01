import { makeOctokitClient } from './client';
import { findLastIssueWith } from './core';

interface IssueFilters {
  labels: string[];
  state: 'open' | 'closed' | 'all';
}

interface EnvData {
  githubToken: string;
  /** The target GitHub owner and name separated by slash. */
  githubRepository: string;
}

type Options = {
  inputs: IssueFilters;
  environment: EnvData;
};

interface IssueMetadata {
  issueNumber: number;
  isClosed: boolean;
}

type IssueInfo = { hasFound: false } | ({ hasFound: true } & IssueMetadata);

export async function fetchLastIssueInfo({ environment, inputs }: Options): Promise<IssueInfo> {
  const octokitClient = makeOctokitClient(environment.githubToken);
  const [owner, repo] = environment.githubRepository.split('/', 2);
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
