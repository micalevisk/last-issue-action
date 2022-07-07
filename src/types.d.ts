declare type ActionInputs = {
  /** The GitHub token providing authorization to query issues for the repository. */
  token: string;

  /** The target GitHub owner and name separated by slash. */
  repository: string;

  /** Comma or newline-separated list of labels that the issue must have. */
  labels: string[];

  /**
   * Issue state filter by. Can be one of the following strings:
   *
   * - "open" (default): if you want to look up for open issues only
   * - "closed": if you want to look up for closed issues only
   * - "all": if you want to look up for open or closed ones
   */
  state?: 'open' | 'closed' | 'all';
};

declare type ActionOutputs = {
  /** The number of the issue found, otherwise empty. */
  ['issue-number']: number;

  /** Response status. Will be `true` if some issue was found, otherwise `false`. */
  ['has-found']: boolean;

  /**
   * Will be `true` if the issue found is closed, otherwise `false`.
   * Then you can use `issue-number` to open it again with [another GitHub Action](https://github.com/marketplace/actions).
   */
  ['is-closed']: boolean;
};
