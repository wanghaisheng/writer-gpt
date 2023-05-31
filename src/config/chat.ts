export const content = `Write highly detailed and informative paragraphs for {{heading}}, with subpoints including a lot of details, evidence or examples: {{subpoints}}. Make it a first-person narrative. Add personal insights. Incorporate humor into writing. Include markdown tables and bullet points or numbered list when possible.
respond in markdown, for heading use ## and for subpoints ###
Respond with max 200 words
`;

export const structure = `
Write a creative outline for keywords {{keywords}}, like the following structure:
Title (should be attention-grabbing, descriptive)
Introduction (introduction should be engaging, hooking the reader, providing context)
Section (It should have a clear and descriptive heading that tells the reader what the section is about)
Subpoints (are smaller, more specific pieces of information that support the main points within a section of a blog post)
Conclusion (should be a brief summary of the main points discussed in the post, as well as a call to action or final thoughts).
Write at least 10 sections, 3 subpoints each and 6 faq.
`;

export const keywordsCommand = `
Please give more related keywords to this list: {{keywords}}
`;

export const keywordsSystem = `
you will only respond with list of keywords, they should be separated by newline char, example:
- keyword 1
- keyword 2
- keyword 3
`;

export const system = `You are a wise expert writer who shares an abundance of detail and information on a topic ranging from high level overviews to niche subtopics all the way down to rarely known small details.`;

export const apiURL = "https://api.openai.com/v1/chat/completions";
