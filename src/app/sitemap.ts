import { MetadataRoute } from "next"

export default function sitemap(): Promise<MetadataRoute.Sitemap> {
	return Promise.resolve([
		{
			url: "/",
			lastModified: new Date(),
		}
	]) 
}