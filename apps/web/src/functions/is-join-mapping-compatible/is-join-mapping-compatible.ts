import type { JoinGroup } from '../../join-mapping-types';

type FileHeaders = {
  name: string;
  headers: string[];
};

function hasHeader(file: FileHeaders, header: string): boolean {
  return file.headers.includes(header);
}

export function isJoinMappingCompatible(groups: JoinGroup[], files: FileHeaders[]): boolean {
  if (groups.length === 0 || files.length === 0) {
    return false;
  }

  return groups.every((group) =>
    group.links.every((link) => {
      const file = files[link.fileIndex];

      return Boolean(file) && hasHeader(file, link.header);
    })
  );
}
