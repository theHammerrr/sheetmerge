'use strict';

type InspectResult = {
  sheets: string[];
  headers: string[];
  sheetName: string;
};

type CompatibilityResult = {
  compatible: boolean;
  headers: string[];
  mismatches: Array<{ index: number; headers: string[] }>;
};

export type { InspectResult, CompatibilityResult };
