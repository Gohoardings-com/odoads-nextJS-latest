function generateSiteMap() {
  const date = new Date().toISOString();
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">      
     <url>
     <loc>https://odoads.com/</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </url>
     <url>
     <loc>https://odoads.com/about</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </url>
     <url>
     <loc>https://odoads.com/features</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </url>
     <url>
     <loc>https://odoads.com/pricing</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </url>
     <url>
     <loc>https://odoads.com/contact</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </url>
     </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the sitemaps for our site
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap();
  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();
  return {
    props: {},
  };
}

export default SiteMap;
