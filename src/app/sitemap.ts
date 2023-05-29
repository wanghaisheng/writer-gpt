import { url as mainURL } from "@config/seo";

const sitemap = async () =>
  [""].map(route => {
    const url = new URL(mainURL);
    url.pathname = route;

    return {
      url: url.href,
      lastModified: new Date().toISOString()
    };
  });

export default sitemap;
