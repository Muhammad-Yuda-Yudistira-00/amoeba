import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = process.env.NEXT_PUBLIC_APP_NAME

	return [
		{
			url: `${baseUrl}/`,
			lastModified: new Date().toISOString(),
		},
	]
}