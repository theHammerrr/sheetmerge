# Use stable file identity instead of file.name for keys/removal

FileList and join mapping key by file.name and remove by name, which breaks with duplicate filenames from different directories. Introduce stable per-file ids (e.g., derived from name+size+lastModified or generated ids) and update render keys plus remove handlers to target by id.
