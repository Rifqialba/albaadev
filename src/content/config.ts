import { defineCollection, z } from "astro:content"

const work = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.union([z.coerce.date(), z.string()]),
  }),
})
const certificate = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.union([z.coerce.date(), z.string()]),
  }),
})

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
})

// src/content/config.ts - Update projects schema
// src/content/config.ts - Update projects schema
const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    
    // Tambahkan field baru untuk demo page
    demoType: z.enum(["dashboard", "website", "ml", "program", "other"]).optional(),
    
    // Untuk semua tipe proyek
    resultImage: z.string().optional(),
    videoUrl: z.string().optional(),
    tools: z.array(z.string()).optional(),
    processSteps: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    
    // Khusus dashboard
    rawImage: z.string().optional(),
    
    // Khusus ML
    modelMetrics: z.array(z.object({
      name: z.string(),
      value: z.string(),
      description: z.string().optional(),
    })).optional(),
    
    datasetInfo: z.object({
      name: z.string().optional(),
      size: z.string().optional(),
      source: z.string().optional(),
      description: z.string().optional(),
    }).optional(),
    
    // Khusus website
    techStack: z.array(z.string()).optional(),
    deployment: z.object({
      platform: z.string().optional(),
      url: z.string().optional(),
      status: z.string().optional(),
    }).optional(),
  }),
});

const legal = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
})

export const collections = { work, blog, projects, legal, certificate }
