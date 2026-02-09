export interface Blog {
  title: string;
  description: string;
  image: string;
  id: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  authorId: string;
  tags: string[];
  isPublished: boolean;
  metaKeywords: string[];
  publishedAt: Date | null;
  metaTitle: string | null;
  metaDescription: string | null;
}
