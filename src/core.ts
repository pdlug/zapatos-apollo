export type Item = {
  id: string;
  title: string;
  description?: string | null;
  content?: string | null;
  publishedOn: string;
  keywords: string[];
};
