export type PlanProductsType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  amount: number;
  unitPrice: number;
  currency: string;
  productId: number;
  planId: number;
  product: {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    name: string;
    image: string | null;
    description: string | null;
    amount: number;
    type: "physical" | "digital" | "raffle";
    status: "active" | "inactive";
    storeId: number;
    externalId: string;
    physicalProductId: number | null;
    digitalProductId: number | null;
    raffleProductId: number | null;
  };
};
