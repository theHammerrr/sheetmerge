# Eliminate duplicate merge-spec schema sources

merge-spec schema is duplicated in docs and packages/core/schema, which risks drift. Define one canonical schema source and generate/copy the other artifact in CI or scripts with a drift check.
