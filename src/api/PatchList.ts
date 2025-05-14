import axios from "axios";
import { ShoppingListType } from "../interfaces/shoppingListInterfaces";

export interface PatchListResponse {
  data: ShoppingListType;
}

async function PatchList(
  apiUrl: string,
  token: string,
  listId: string,
  partialList: Partial<ShoppingListType>
): Promise<PatchListResponse> {
  const fullUrl = `${apiUrl}/api/shopping/${listId}`;
  const timeoutSeconds = 20;

  console.log(`[PatchList] PATCH ${fullUrl}`);
  console.log(`[PatchList] Payload:`, partialList);
  try {
    const response = await axios.patch<ShoppingListType>(
      fullUrl,
      partialList,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        timeout: 1000 * timeoutSeconds,
      }
    );
    console.log(`[PatchList] Success:`, response.data);
    return { data: response.data };
  } catch (error) {
    let errorMessage = `An unexpected error occurred during PATCH request.`;
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        errorMessage = `PATCH request to ${fullUrl} timed out after ${timeoutSeconds} seconds.`;
      } else if (error.code === "ERR_NETWORK") {
        errorMessage = `Network error during PATCH request to ${fullUrl}.`;
      } else if (error.response) {
        errorMessage =
          error.response.data?.message ||
          `PATCH request failed with status ${error.response.status}.`;
        if (error.response.status === 401) {
          errorMessage += " Please, verify if the token is valid.";
        }
      }
    }
    console.error(`[PatchList] Error:`, errorMessage);
    throw error;
  }
}

export default PatchList;