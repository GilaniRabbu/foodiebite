export type Meal = {
  _id: string;
  name: string;
  category?: string;
  description?: string;
  type: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | "DESSERT";
  images: { url: string; altText: string }[];
  price: number;
  isAvailable: boolean;
  isDeleted: boolean;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
};
