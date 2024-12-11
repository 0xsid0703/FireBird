import apiClient from "@/lib/api-client";
import { TreasuryForm } from "@/types/treasury";

export const createTreasury = async (treasuryData: TreasuryForm) => {
  try {
    const { data } = await apiClient.post(`/treasury/create`, treasuryData);

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export const getTreasuries = async () => {
  try {
    const { data } = await apiClient.get(`/treasury/all`);

    if (data.error) {
      console.log("Error: ", data.error);
      throw new Error(data.error);
    }

    return data.data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export const getSells = async (tokenAddress: string) => {
  try {
    const { data } = await apiClient.get(`/treasury/sells`, {
      params: {
        tokenAddress,
      },
    });

    if (data.error) {
      throw new Error(data.error);
    }

    return data.data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export const getSellsPublic = async () => {
  try {
    const { data } = await apiClient.get(`/treasury/sells-public`);

    if (data.error) {
      throw new Error(data.error);
    }

    return data.data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};
