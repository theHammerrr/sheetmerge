'use strict';

import { MergeSpecError } from '../../errors/merge-spec-error';
import { mergeSpecValidation } from '../../validation/merge-spec-validation';
import { validateInputs } from '../../validation/validate-inputs';
import { applyColumns } from '../apply-columns';
import { mergeRows } from '../merge-rows';
import { readInputRows } from '../read-input-rows';
import { writeOutputBuffer } from '../write-output-buffer';
import type { MergeSpec } from '../merge-types';
import type { MergeReport, MergeResult } from '../merge-workbooks-types';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isMergeSpec(value: unknown): value is MergeSpec {
  if (!isRecord(value)) {
    return false;
  }

  if (!Array.isArray(value.inputs)) {
    return false;
  }

  if (!isRecord(value.sheet)) {
    return false;
  }

  if (!isRecord(value.merge)) {
    return false;
  }

  if (!isRecord(value.output)) {
    return false;
  }

  return true;
}

export function mergeWorkbooks(
  inputs: Array<Buffer | Uint8Array | ArrayBuffer>,
  spec: unknown
): MergeResult {
  validateInputs(inputs);
  mergeSpecValidation.assertValidMergeSpec(spec);

  if (!isMergeSpec(spec)) {
    throw new MergeSpecError('MergeSpec shape is invalid.');
  }

  if (spec.inputs.length !== inputs.length) {
    throw new MergeSpecError('Inputs count does not match MergeSpec inputs.');
  }

  const inputReads = inputs.map((input, index) =>
    readInputRows(input, spec, spec.inputs[index], index)
  );
  const rowSets = inputReads.map((entry) => entry.rows);
  const mergedRows = mergeRows(rowSets, spec.merge);
  const finalRows = applyColumns(mergedRows, spec.merge.columns);
  const buffer = writeOutputBuffer(finalRows, spec.output);
  const report: MergeReport = {
    mode: spec.merge.mode,
    inputs: inputReads.map((entry, index) => ({
      index,
      id: spec.inputs[index].id,
      label: spec.inputs[index].label,
      rowCount: entry.rowCount,
    })),
    output: {
      rowCount: finalRows.length,
      format: spec.output.format,
      sheetName: spec.output.sheetName,
      fileName: spec.output.fileName,
    },
    warnings: [],
  };

  return { buffer, report };
}
