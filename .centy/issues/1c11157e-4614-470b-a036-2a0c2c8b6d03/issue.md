# Revoke object URLs to prevent merge download memory leaks

setMergeResult creates Blob object URLs for downloads but existing URLs are never revoked on reset/re-merge/unmount. Track the active URL and call URL.revokeObjectURL at lifecycle boundaries to avoid memory leaks during repeated merges.
