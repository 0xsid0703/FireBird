export type Token = {
  token_id: string;
  token: string;
  sol_amount: string;
  token_amount: string;
  token_burnt: string;
  percentage: string;
  transactions: string;
};

export type TokenSummary = {
  id: string;
  symbol: string;
  icon: string;
  name: string;
  price: string;
};
