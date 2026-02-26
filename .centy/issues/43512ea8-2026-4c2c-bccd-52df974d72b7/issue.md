# Fix join mapping group update/removal race in modal

In apps/web join mapping, onHeaderClick performs multiple setGroups updates and can remove a group immediately after creating/updating it when the clicked header already belongs to another group. Refactor to a single deterministic state transition and add regression tests for remap flows across files.
