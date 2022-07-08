<div align="center">

# Find Last Issue

![](https://img.badgesize.io/micalevisk/last-issue-action/gh-actions/bundle/index.js.svg?style=flat&color=purple&compression=brotli)

GitHub Action to find and output the number of last updated issue that has given labels and state.

</div>

### Action inputs

| Name            | Description                                                                                                                                                                                                                                                                                                     | Default                                            |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `repository`    | The target GitHub owner and name separated by slash. For example: `micalevisk/last-issue-action`.                                                                                                                                                                                                               | `github.repository`                                |
| `token`         | A [`repo`][settings-create-scoped-token] scoped [Personal Access Token][docs-token-pat] with at least [`issues: read` permissions][docs-token-permissions].                                                                                                                                                     | `github.token` (generated automatically by GitHub) |
| **\*** `labels` | Comma or newline-separated list of labels that the issue must have                                                                                                                                                                                                                                              |                                                    |
| `state`         | Issue state to filter by. Can be one of the following strings: <ul><li> <code>"open"</code>: if you want to look up for open issues only </li><li> <code>"closed"</code>: if you want to look up for closed issues only </li><li> <code>"all"</code>: if you want to look up for open or closed ones </li></ul> | `"open"`                                           |

[docs-token-pat]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
[docs-token-permissions]: https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token
[settings-create-scoped-token]: https://github.com/settings/tokens/new?scopes=repo:status,repo_deployment,public_repo

### Action outputs

| Name           | Description                                                                                                                                                                            |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `issue-number` | The number of the issue found, otherwise empty.                                                                                                                                        |
| `has-found`    | Response status. Will be `true` if some issue was found, otherwise `false`.                                                                                                            |
| `is-closed`    | Will be `true` if the issue found is closed, otherwise `false`. Then you can use `issue-number` to open it again with [another GitHub Action](https://github.com/marketplace/actions). |

Note that none of the above will be defined if any error occurs (eg: fetching a repository that doesn't exists).

If `has-found` is `true`, then `issue-number` and `is-closed` will be defined as well.

## Example usage

You can use this action along with [create-issue-from-file](https://github.com/peter-evans/create-issue-from-file) action, like:

```yaml
# ...

- name: Find the last open report issue
  id: last-issue
  uses: micalevisk/last-issue-action@v2
  with:
    state: open
    # Find the last updated open issue that has these labels:
    labels: |
      report
      automated issue

- name: Update last updated report issue
  if: ${{ steps.last-issue.outputs.has-found == 'true' }}
  uses: peter-evans/create-issue-from-file@v4
  with:
    title: Foo
    content-filepath: README.md
    # Update an existing issue if one was found (issue-number),
    # otherwise an empty value creates a new issue:
    issue-number: ${{ steps.last-issue.outputs.issue-number }}
    # Add a label(s) that `last-issue` can use to find this issue,
    # and any other relevant labels for the issue itself:
    labels: |
      report
      automated issue
```
