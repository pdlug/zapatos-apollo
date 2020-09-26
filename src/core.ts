export type User = {
  id: string;
  email: string;
  name: string;
};

export type Item = {
  id: string;
  title: string;
  description?: string | null;
  content?: string | null;
  publishedOn: string;
  keywords: string[];
};
