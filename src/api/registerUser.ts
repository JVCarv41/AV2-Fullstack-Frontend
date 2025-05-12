import axios from 'axios';

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  message: string;
  user: {
    name: string;
    email: string;
    password: string;
    _id: string;
    __v: number;
  };
}

async function registerUser(
  apiUrl: string,
  name: string,
  email: string,
  password: string
): Promise<RegisterResponse> {
  const method = 'POST'; // Explicitly declare the HTTP method
  const requestData: RegisterRequest = { name, email, password };
  const fullUrl = `${apiUrl}/api/register`;
  const timeoutSeconds = 20

  try {
    const response = await axios.post<RegisterResponse>(
      fullUrl,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 1000*timeoutSeconds,
      }
    );
    
    // Success log with method
    console.log(`${method} request successful to ${fullUrl}`, {
      status: response.status,
      data: response.data
    });
    
    return response.data;
  } catch (error) {
    // Enhanced error logging with method
    if (axios.isAxiosError(error)) {
      console.error(`${method} request failed to ${fullUrl}`, {
        method,
        url: error.config?.url,
        status: error.response?.status,
        code: error.code,
        message: error.message,
        responseData: error.response?.data
      });

      if (error.code === 'ECONNABORTED') {
        throw new Error(`${method} request to ${fullUrl} timed out after ${timeoutSeconds} seconds`);
      } else if (error.code === 'ERR_NETWORK') {
        throw new Error(`Network error during ${method} request to ${fullUrl}`);
      } else if (error.response) {
        throw new Error(
          error.response.data?.message || 
          `${method} request failed with status ${error.response.status}`
        );
      }
    }
    
    console.error(`Unexpected error during ${method} request:`, error);
    throw new Error(`An unexpected error occurred during ${method} request`);
  }
}

export default registerUser;