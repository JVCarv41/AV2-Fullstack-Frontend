import axios from "axios";
import { ShoppingListType } from "../interfaces/shoppingListInterfaces";

export interface PutListResponse {
  data: ShoppingListType;
}

async function PutList(
  apiUrl: string,
  token: string,
  listId: string,
  updatedList: ShoppingListType
): Promise<PutListResponse> {
  const fullUrl = `${apiUrl}/api/shopping/${listId}`;
  const timeoutSeconds = 20;

  try {
    const response = await axios.put<ShoppingListType>(
      fullUrl,
      updatedList,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        timeout: 1000 * timeoutSeconds,
      }
    );
    return { data: response.data };
  } catch (error) {
    let errorMessage = `An unexpected error occurred during PUT request.`;
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        errorMessage = `PUT request to ${fullUrl} timed out after ${timeoutSeconds} seconds.`;
      } else if (error.code === "ERR_NETWORK") {
        errorMessage = `Network error during PUT request to ${fullUrl}.`;
      } else if (error.response) {
        errorMessage =
          error.response.data?.message ||
          `PUT request failed with status ${error.response.status}.`;
        if (error.response.status === 401) {
          errorMessage += " Please, verify if the token is valid.";
        }
      }
    }
    console.error(errorMessage);
    throw error;
  }
}

export default PutList;