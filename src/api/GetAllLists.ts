import axios from "axios";

export interface Product {
  name: string;
  category: string;
  quantity: number;
  unit: string;
}

export interface ShoppingList {
  _id: string;
  date: string;
  products: Product[];
}

export interface GetAllListsResponse {
  data: ShoppingList[];
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
    const response = await axios.get<ShoppingList[]>(
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
    let errorMessage = `An unexpected error occurred during ${method} request`;
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        errorMessage = `${method} request to ${fullUrl} timed out after ${timeoutSeconds} seconds`;
      } else if (error.code === "ERR_NETWORK") {
        errorMessage = `Network error during ${method} request to ${fullUrl}`;
      } else if (error.response) {
        errorMessage =
          error.response.data?.message ||
          `${method} request failed with status ${error.response.status}`;
      }
    }
    throw error;
  }
}

export default GetAllLists;
