import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

type METHOD = "get" | "post" | "put" | "delete";

interface UseEndpointProps {
  method: METHOD;
  isProtected?: boolean;
  url: string;
  data?: any;
  ismultipart?: boolean;
}

const useEndpoint = () => {
  const { token } = useContext(AuthContext);

  const callEndpoint = async ({
    method,
    isProtected = true,
    url,
    data = {},
    ismultipart = false,
  }: UseEndpointProps) => {
    try {
      const headers: Record<string, string> = {};

      if (isProtected && token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      if (!ismultipart) {
        headers["Content-Type"] = "application/json";
      }
      // Else: let browser set Content-Type with FormData boundary

      const response = await axios({
        method,
        url,
        data,
        headers,
      });

      return response.data;
    } catch (error: any) {
      return {
        error: true,
        message: error.response?.data?.message || error.message,
        status: error.response?.status || 500,
      };
    }
  };

  return callEndpoint;
};

export default useEndpoint;
