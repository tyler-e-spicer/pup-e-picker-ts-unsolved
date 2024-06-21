export type View = "" | "favorited" | "unfavorited" | "create dog";

export interface Dog {
  id: number;
  image: string;
  description: string;
  isFavorite: boolean;
  name: string;
}