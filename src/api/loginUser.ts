import axios from 'axios';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
}

async function loginUser(
  apiUrl: string,
  email: string,
  password: string
): Promise<LoginResponse> {
  const method = 'POST';
  const requestData: LoginRequest = { email, password };
  const fullUrl = `${apiUrl}/api/login`;
  const timeoutSeconds = 20;

  try {
    const response = await axios.post<LoginResponse>(
      fullUrl,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 1000 * timeoutSeconds,
      }
    );
    
    console.log(`${method} request successful to ${fullUrl}`, {
      status: response.status,
      data: { message: response.data.message, token: '******' } // Mask token in logs
    });
    
    return response.data;
  } catch (error) {
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

export default loginUser;