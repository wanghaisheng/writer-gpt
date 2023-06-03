export const contentPrompt = `Write highly detailed and informative paragraphs for {{heading}}, with subpoints including a lot of details, evidence or examples: {{subpoints}}, use these keywords:

{{keywords}}

in the response. Make it a first-person narrative. Add personal insights. Incorporate humor into writing. Include markdown tables and bullet points or numbered list when possible.

respond in markdown, for heading use ## and for subpoints ###
`;

export const outlinePrompt = `
Write a creative outline with these keywords in it {{keywords}}, like the following structure:
Title (should be attention-grabbing, descriptive)
Introduction (introduction should be engaging, hooking the reader, providing context)
Section (It should have a clear and descriptive heading that tells the reader what the section is about)
Subpoints (are smaller, more specific pieces of information that support the main points within a section of a blog post)
Conclusion (should be a brief summary of the main points discussed in the post, as well as a call to action or final thoughts).
FAQ (list of common questions that people often ask about a particular topic or subject)
`;

export const outlineRegeneratePromptSystem = `
you will receive an outline, a selected part of it that you will rewrite, but will keep the same context related to the outline and the format of the selection, only respond with the new rewritten text
`;

export const outlineRegeneratePrompt = `
here is the selection:
{{section}}

here is the outline:
{{outline}}
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
you will receive an outline pick the all the headings and subpoints respond with json format like this:
[{ heading: "string", subpoints: ["string array", ...] }, ...]
`;
