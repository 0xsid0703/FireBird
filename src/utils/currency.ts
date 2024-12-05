export function formatCurrency(value: string, decimals: number) {
  const divisor = BigInt(10 ** decimals);
  const lamports = BigInt(value);
  const decimalPart = Number(lamports / divisor);
  const fractionPart = Number(lamports % divisor);

  return `${decimalPart}.${fractionPart.toString().padStart(decimals, "0")}`;
}
