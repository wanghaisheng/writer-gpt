export const contentPrompt = `Write highly detailed and informative paragraphs for {{heading}}, with subpoints including a lot of details, evidence or examples: {{subpoints}}. Make it a first-person narrative. Add personal insights. Incorporate humor into writing. Include markdown tables and bullet points or numbered list when possible.
respond in markdown, for heading use ## and for subpoints ###
`;

export const outlinePrompt = `
Write a creative outline with these in it {{keywords}}, like the following structure:
Title (should be attention-grabbing, descriptive)
Introduction (introduction should be engaging, hooking the reader, providing context)
Section (It should have a clear and descriptive heading that tells the reader what the section is about)
Subpoints (are smaller, more specific pieces of information that support the main points within a section of a blog post)
Conclusion (should be a brief summary of the main points discussed in the post, as well as a call to action or final thoughts).
FAQ (list of common questions that people often ask about a particular topic or subject)
`;

export const keywordsCommand = `
Please give more related keywords to this list: {{keywords}}, do not repeat the keywords.
`;

export const keywordsSystem = `
you will only respond with list of keywords, they should be separated by newline char, example:
- keyword 1
- keyword 2
- keyword 3
`;

export const secondaryKeywordsSystem = `
${keywordsSystem}

Make sure not to include this keywords in the reply: 
{{keywords}}
`;

export const systemPrompt = `
You are a wise expert writer who shares an abundance of detail and information on a topic ranging from high level overviews to niche subtopics all the way down to rarely known small details.
`;

export const outlineToArraySystemPrompt = `
you will only respond with json format
`;

export const outlineToArrayPrompt = `
Convert this outlines Section and Subpoints into array of objects like this:
[{ heading: "Section text value", subpoints: ["List of subpoints as string", ...] }, ...]

Outline:
{{outline}}

`;
