# Find Last Issue

GitHub Action to find and export the number of last updated issue that has given labels.

### Inputs

#### `labels`

> required

Comma-separated label names that the issue must have.

### Outputs

#### `issue_number`

The number of the issue found, if any.

#### `has_found`

Response status. Will be `true` if some issue was found. `false` otherwise.

## Example usage

```yaml
uses: .github/actoins/find-latest-issue
with:
  labels: 'report,automated issue'
env:
  ## Optional since it uses the `GITHUB_TOKEN` by default
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

For third-party repositories, you can use the `GITHUB_REPOSITORY` environment variable:

```yaml
env:
  GITHUB_REPOSITORY: owner/repo_name
```
