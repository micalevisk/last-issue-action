declare type ActionInputs = {
  /** Comma or newline-separated list of labels that the issue must have. */
  labels: string[];

  /**
   * Issue state. Can be one of the following strings:
   *
   * - "open": if you want to look up for open issues only
   * - "closed": if you want to look up for closed issues only
   * - "all": if you want to look up for open or closed ones
   */
  state: 'open' | 'closed' | 'all';
};

declare type ActionOutputs = {
  /** The number of the issue found, if any. */
  issue_number: number;

  /** Response status. Will be `true` if some issue was found. `false` otherwise. */
  has_found: boolean;
};
