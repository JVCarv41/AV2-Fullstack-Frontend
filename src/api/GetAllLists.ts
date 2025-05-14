import axios from "axios";
import { ShoppingListType } from "../interfaces/shoppingListInterfaces";
export interface GetAllListsResponse {
  data: ShoppingListType[];
  count: number;
}
async function GetAllLists(
  apiUrl: string,
  token: string
): Promise<GetAllListsResponse> {
  const method = "GET";
  const fullUrl = `${apiUrl}/api/shopping`;
  const timeoutSeconds = 20;

  try {
    console.log("Requesting all lists from user", {
      url: fullUrl,
      token: token,
    });
    const response = await axios.get<ShoppingListType[]>(
      fullUrl,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        timeout: 1000 * timeoutSeconds,
      }
    );

    console.log("Response from backend:", response.data);
    const listCount: number = response.data.length;

    return {
      data: response.data,
      count: listCount,
    };
  } catch (error) {
    let errorMessage = `An unexpected error occurred during ${method} request.`;
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        errorMessage = `${method} request to ${fullUrl} timed out after ${timeoutSeconds} seconds.`;
      } else if (error.code === "ERR_NETWORK") {
        errorMessage = `Network error during ${method} request to ${fullUrl}.`;
      } else if (error.response) {
        errorMessage =
          error.response.data?.message ||
          `${method} request failed with status ${error.response.status}.`;
          if (error.status === 401){
            errorMessage += " Please, verify if the token is valid."
          }
      }
    }
    console.error(errorMessage)
    throw error;
  }
}

export default GetAllLists;
