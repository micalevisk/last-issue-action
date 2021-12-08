# Find Last Issue

GitHub Action to find and output the number of last updated issue that has given labels and state.

### Action inputs

| Name            | Description                                                                                                                                                                                                                                                                                                  | Default  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| **\*** `labels` | Comma or newline-separated list of labels that the issue must have                                                                                                                                                                                                                                           |
| `state`         | Issue state filter by. Can be one of the following strings: <ul><li> <code>"open"</code>: if you want to look up for open issues only </li><li> <code>"closed"</code>: if you want to look up for closed issues only </li><li> <code>"all"</code>: if you want to look up for open or closed ones </li></ul> | `"open"` |

### Action outputs

| Name           | Description                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `issue_number` | The number of the issue found, if any.                                                                                                                             |
| `has_found`    | Response status. Will be `true` if some issue was found. `false` otherwise.                                                                                        |
| `is_closed`    | Will be `true` if the found issue is closed. The you can use `issue_number` to open it again with [another GitHub Action](https://github.com/marketplace/actions). |

### Environment variables

| Name           | Description                                                                                                                                                                | Default                                 |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `GITHUB_TOKEN` | `GITHUB_TOKEN` or a `repo` scoped [Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) | `GITHUB_TOKEN` secret created by GitHub |

## Example usage

You can use this action along with [create-issue-from-file](https://github.com/peter-evans/create-issue-from-file) action, like:

```yaml
# ...

- name: Find the last open report issue
  id: last_issue
  uses: micalevisk/find-last-issue@v1
  with:
    state: open
    ## The issue must have the following labels
    labels: |
      report
      automated issue
  env:
    ## Optional since it uses the `GITHUB_TOKEN` created by GitHub by default
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

- run: echo ${{ steps.last_issue.outputs.issue_number }}

- name: Update last updated report issue
  if: ${{ steps.last_issue.outputs.has_found == 'true' }}
  uses: peter-evans/create-issue-from-file@v3
  with:
    title: Foo
    content-filepath: README.md
    issue-number: ${{ steps.last_issue.outputs.issue_number }}
    labels: |
      report
      automated issue
```
