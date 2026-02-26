import type { JoinGroup } from '../../join-mapping-types';

type FileHeaders = {
  name: string;
  headers: string[];
};

function describeLink(link: { fileIndex: number; header: string }, files: FileHeaders[]): string {
  const file = files[link.fileIndex];
  const label = file ? file.name : `file-${link.fileIndex + 1}`;

  return `${label}:${link.header}`;
}

export function describeJoinMapping(groups: JoinGroup[], files: FileHeaders[]): string {
  return groups
    .map((group) => group.links.map((link) => describeLink(link, files)).join(' <-> '))
    .join(' | ');
}
