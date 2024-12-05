export type TreasuryForm = {
  token_name: string;
  token_address: string;
  decimals: number;
  deposit_count: number;
  duration: number;
  dex_pool: string;
};

export type Treasury = TreasuryForm & {
  id: string;
  created_at: string;
  completed: boolean;
};
