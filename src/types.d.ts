declare type ActionInputs = {
  /** The github token providing authorization to query issues for the repository. */
  githubToken: string;

  /** The target GitHub owner and name separated by slash. */
  githubRepository: string;

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
  /** The number of the issue found, if any. */
  issue_number: number;

  /** Response status. Will be `true` if some issue was found. `false` otherwise. */
  has_found: boolean;

  /**
   * Will be `true` if the found issue is closed. `false` otherwise.
   * The you can use `issue_number` to open it again with [another GitHub Action](https://github.com/marketplace/actions).
   */
  is_closed: boolean;
};
