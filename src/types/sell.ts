export type CreateSellData = {
  pool_id: string;
  token_address: string;
  token_amount: string;
  sol_amount: string;
  price: string;
  tx_id: string;
};

export type Sell = CreateSellData & {
  id: string;
  sell_at: string;
  buyback_tx: string;
};
