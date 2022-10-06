export interface IInfoLink {
    link: string;
    description: string;
}
export interface ISnippet {
    id: string;
    category: string;
    description: string;
    snippet: string;
    tags: string[];
    infoLinks: IInfoLink[];
}

export interface ISnippetDto extends Omit<ISnippet, 'id'> { }

