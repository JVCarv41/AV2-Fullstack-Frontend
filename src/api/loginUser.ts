import axios from 'axios';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
}

async function LoginUser(
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
    let errorMessage = `An unexpected error occurred during ${method} request`;
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        errorMessage = `${method} request to ${fullUrl} timed out after ${timeoutSeconds} seconds`;
      } else if (error.code === 'ERR_NETWORK') {
        errorMessage = `Network error during ${method} request to ${fullUrl}`;
      } else if (error.response) {
        errorMessage =
          error.response.data?.message ||
          `${method} request failed with status ${error.response.status}`;
      }
    }
    // Only one error log here
    // console.error(errorMessage, error);
    throw error;
  }
}

export default LoginUser;