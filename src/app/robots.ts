import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				disallow: '/checklist/*',
				allow: '/'
			}
		],
		sitemap: process.env.NEXT_PUBLIC_APP_NAME + '/sitemap.xml'
	}
}