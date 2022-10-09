import { ISnippet } from "libs/interfaces/snippets.interface";

export const getSnippetExample = (category: string): ISnippet => ({
    id: '12345',
    category,
    description: 'description',
    snippet: `const example = () => {
    return ExampleCode;
}`,
    tags: ['tag1', 'tag2'],
    infoLinks: [
        { link: 'url', description: 'description' }
    ]
})