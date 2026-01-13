import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1.0
    },
    {
      url: baseUrl + '/collections',
      changeFrequency: "weekly",
      priority: 8.0
    },
  ]
} 