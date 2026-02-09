import { appConfig } from "@/config";
import type { MetadataRoute } from "next";

/**
 * Generates the robots.txt configuration for the application.
 * - Allows all user agents to access the site except for the /dashboard/ path.
 * - Specifies the host and sitemap location.
 */

export default function robots(): MetadataRoute.Robots {
  return {
    host: appConfig.domainUrl,
    sitemap: [`${appConfig.domainUrl}/sitemap.xml`],
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/"]
      }
    ]
  };
}
