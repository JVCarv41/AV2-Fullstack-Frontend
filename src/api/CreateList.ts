import axios from "axios";
import { ShoppingListType } from "../interfaces/shoppingListInterfaces";

export interface CreateListResponse {
  data: ShoppingListType;
}

async function CreateList(
  apiUrl: string,
  token: string,
  list: Omit<ShoppingListType, "_id">
): Promise<CreateListResponse> {
  const fullUrl = `${apiUrl}/api/shopping`;
  const timeoutSeconds = 20;

  // Prepare the payload as JSON
  const payload = {
    date: list.date,
    products: list.products.map(product => ({
      name: product.name,
      category: product.category,
      quantity: product.quantity,
      unit: product.unit,
    })),
  };

  console.log(`[CreateList] POST ${fullUrl}`);
  console.log(`[CreateList] Payload:`, payload);
  try {
    const response = await axios.post<ShoppingListType>(
      fullUrl,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        timeout: 1000 * timeoutSeconds,
      }
    );
    console.log(`[CreateList] Success:`, response.data);
    return { data: response.data };
  } catch (error) {
    let errorMessage = `An unexpected error occurred during POST request.`;
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        errorMessage = `POST request to ${fullUrl} timed out after ${timeoutSeconds} seconds.`;
      } else if (error.code === "ERR_NETWORK") {
        errorMessage = `Network error during POST request to ${fullUrl}.`;
      } else if (error.response) {
        errorMessage =
          error.response.data?.message ||
          `POST request failed with status ${error.response.status}.`;
        if (error.response.status === 401) {
          errorMessage += " Please, verify if the token is valid.";
        }
      }
    }
    console.error(`[CreateList] Error:`, errorMessage);
    throw error;
  }
}

export default CreateList;