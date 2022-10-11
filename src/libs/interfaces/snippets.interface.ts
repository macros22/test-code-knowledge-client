import { IInfoLink } from "./common.interface";

export interface ISnippet {
    id: string;
    category: string;
    description: string;
    snippet: string;
    tags: string[];
    infoLinks: IInfoLink[];
}

export interface ISnippetDto extends Omit<ISnippet, 'id'> { }

export interface ISnippetsPageProps extends Record<string, unknown> {
	category: string;
	skip: number;
	limit: number;
	fallback: Record<string, ISnippet[] | null>;
}