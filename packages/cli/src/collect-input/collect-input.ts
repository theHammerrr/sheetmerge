'use strict';

export function collectInput(value: string, previous: string[]): string[] {
  return previous.concat([value]);
}
