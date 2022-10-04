
export interface ISnippet {
    id: string;
    category: string;
    description: string;
    snippet: string;
}

export interface ISnippetDto extends Omit<ISnippet, 'id'> { }

