import apiClient from "@/lib/api-client";

export const authenticateUser = async ({ walletAddress, signature }: { walletAddress: string; signature: Uint8Array }) => {
  try {
    const { data } = await apiClient.post(`/auth/login`, { walletAddress, signature: Buffer.from(signature).toString("base64") });

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    throw new Error("Failed to authenticate!");
  }
};

export const validateToken = async (token: string): Promise<boolean> => {
  try {
    const response = await apiClient.post("/auth/validate-token", { token });
    return response.data.valid;
  } catch (error) {
    throw new Error("Error validating token:");
  }
};

export const refreshToken = async (oldToken: string) => {
  try {
    const {
      data: { token },
    } = await apiClient.post("/auth/refresh-token", { token: oldToken });
    return token;
  } catch (error) {
    throw new Error("Error refreshing token:");
  }
};
