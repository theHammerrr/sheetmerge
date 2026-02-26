import { describe, expect, it } from 'vitest';
import { useJoinMapping } from './use-join-mapping';

describe('useJoinMapping', () => {
  it('exports a hook function', () => {
    expect(typeof useJoinMapping).toBe('function');
  });
});
