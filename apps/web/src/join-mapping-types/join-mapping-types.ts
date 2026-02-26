export type JoinLink = {
  fileIndex: number;
  header: string;
};

export type JoinGroup = {
  id: string;
  links: JoinLink[];
};

export type JoinKeyMap = {
  key: string;
  byFile: Record<number, string>;
};
