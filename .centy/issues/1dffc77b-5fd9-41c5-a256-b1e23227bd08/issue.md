# Standardize web error model for i18n and diagnostics

Web merge path throws a mix of translation keys and plain text errors. Normalize to a typed/app-error model with explicit i18n keys and optional debug details so user-facing messages stay consistent and actionable.
