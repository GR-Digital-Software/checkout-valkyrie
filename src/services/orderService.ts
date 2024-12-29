import axios, { AxiosError } from "axios";
interface Customer {
  name: string;
  cpf: string;
  email: string;
  phone: string;
}

interface Address {
  country: string;
  state: string;
  city: string;
  zipCode: string;
  street: string;
  streetNumber: string;
  district: string;
  complement?: string;
}

interface Shipping {
  fee: number;
  address: Address;
}

interface Card {
  number: string;
  holderName: string;
  holderDocument: string;
  expMonth: number;
  expYear: number;
  cvv: string;
  billingAddress: Address;
}

interface Item {
  salesPlanProductId: number;
  name: string;
  unitPrice: number;
  quantity: number;
}

interface OrderData {
  customer: Customer;
  shipping?: Shipping;
  paymentMethod: "credit_card" | "pix" | "boleto"; // Example of more payment methods
  card?: Card;
  installments?: number;
  items: Item[];
  value: number;
  couponCode?: string; // Optional property
}

const BASE_URL_API = process.env.NEXT_PUBLIC_API_URL;
export async function createOrder(
  orderData: OrderData,
  storeId: string
): Promise<any> {
  try {
    const response = await axios.post(`${BASE_URL_API}/orders`, orderData, {
      headers: {
        "X-Store-Id": storeId,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating order:",
      (error as AxiosError).response?.data || (error as AxiosError).message
    );
    throw error;
  }
}

export async function getOrderInfo(orderId: string): Promise<any> {
  try {
    const response = await axios.get(`${BASE_URL_API}/orders/${orderId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating order:",
      (error as AxiosError).response?.data || (error as AxiosError).message
    );
    throw error;
  }
}
