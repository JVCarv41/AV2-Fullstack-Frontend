import axios from "axios";

export interface DeleteListResponse {
  message: string;
  success?: boolean;
}

async function DeleteList(
  apiUrl: string,
  token: string,
  listId: string
): Promise<DeleteListResponse> {
  const method = "DELETE";
  const fullUrl = `${apiUrl}/api/shopping/${listId}`;
  const timeoutSeconds = 20;

  try {
    console.log("Deleting list", {
      url: fullUrl,
      token: token,
      listId: listId,
    });
    const response = await axios.delete<DeleteListResponse>(
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

    console.log("Delete response from backend:", response.data);
    return response.data;
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

export default DeleteList;