import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const site = 'https://albaporto.vercel.app'; // pastikan ini sesuai dengan domain Anda

// Halaman statis
const staticPages = [
  '',
  '/blog',
  '/projects',
  '/work',
  '/certificate',
  '/search',
  '/cv',
];

export const GET: APIRoute = async () => {
  // Ambil semua konten dinamis
  const blogPosts = await getCollection('blog');
  const projects = await getCollection('projects');
  const certificates = await getCollection('certificate');

  // Gabungkan semua URL dengan lastmod
  const allUrls = [
    ...staticPages.map(url => ({
      url,
      lastmod: new Date().toISOString(),
    })),
    ...blogPosts.map(post => ({
      url: `/blog/${post.slug}`,
      lastmod: post.data.date,
    })),
    ...projects.map(proj => ({
      url: `/projects/${proj.slug}`,
      lastmod: proj.data.date,
    })),
    ...certificates.map(cert => ({
      url: `/certificate/${cert.slug}`,
      lastmod: cert.data.dateStart,
    })),
  ];

  // Buat XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls.map(({ url, lastmod }) => `
  <url>
    <loc>${site}${url}</loc>
    <lastmod>${new Date(lastmod).toISOString().split('T')[0]}</lastmod>
    <priority>${url === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};