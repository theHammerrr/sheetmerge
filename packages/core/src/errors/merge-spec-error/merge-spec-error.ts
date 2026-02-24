'use strict';

export class MergeSpecError extends Error {
  details: string[] | null;

  constructor(message: string, details?: string[] | null) {
    super(message);
    this.name = 'MergeSpecError';
    this.details = details ?? null;
  }
}
