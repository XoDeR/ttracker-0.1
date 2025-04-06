export type Tag = {
  id: number;
  key: string;
  color: string;
};

export type TimeSpan = {
  id: number;
  start: Date;
  end: Date;
  tags: Tag[];
  note: string;
};