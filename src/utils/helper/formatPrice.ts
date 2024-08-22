export function formatPrice(item) {
  const price = Math.round(Number(item) * 100) / 100;

  const formattedPrice = price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formattedPrice;
}
