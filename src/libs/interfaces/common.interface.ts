export interface IInfoLink {
  link: string;
  description: string;
}

export interface IItemsInfo
  extends Record<
    string,
    {
      amount: number;
      categoryURLName: string;
    }
  > {}

export type ItemsName = 'snippets' | 'questions';
