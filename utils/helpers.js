export const formatPrice = (price) => {
  const number = Number(price);

  if (Number.isNaN(number)) {
    return price;
  }

  return `₹ ${number.toLocaleString("en-IN")}`;
};

export const getShopLink = () => {
  return `${window.location.origin}/shop`;
};