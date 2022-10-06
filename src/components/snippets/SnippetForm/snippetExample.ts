import { ISnippet } from "interfaces/snippets.interface";

export const snippetExample: ISnippet = {
    id: '12345',
    category: 'JavaScript',
    description: 'description',
    snippet: `const example = () => {
    return ExampleCode;
}`,
    tags: ['tag1', 'tag2'],
    infoLinks: [
        { link: 'url', description: 'description' }
    ]
};