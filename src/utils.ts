import * as core from '@actions/core';
export { setFailed, error } from '@actions/core';

/**
 * Gets the values of an multiline input. Either as a new-line or comma-separed.
 * Each value is also trimmed.
 * Pretty much the same as `core.getMultilineInput` but allowing comma-separed
 * values.
 */
export const getInputAsArray = <Name extends keyof ActionInputs>(
  name: Name,
  options?: core.InputOptions,
) =>
  core
    .getInput(name, options)
    .split(/[\n,]+/)
    .map((value) => value.trim())
    .filter((val) => val !== '') as ActionInputs[typeof name];

/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * NOTE: This is a type-safe version of `core.setOutput` from `@actions/core`.
 */
export const getInput = <Name extends keyof ActionInputs>(
  name: Name,
  options?: core.InputOptions,
) => core.getInput(name, options) as ActionInputs[typeof name];

/**
 * Sets the value of an output.
 *
 * NOTE: This is a type-safe version of `core.setOutput` from `@actions/core`.
 */
export const setOutput = <Name extends keyof ActionOutputs>(name: Name, value: any) =>
  core.setOutput(name, value);
