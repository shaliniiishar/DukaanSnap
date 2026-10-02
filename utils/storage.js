const STORAGE_KEY = "dukaansnap_products";

export const getProducts = () => {
  try {
    const products = localStorage.getItem(STORAGE_KEY);
    return products ? JSON.parse(products) : [];
  } catch (error) {
    console.error("Could not read products:", error);
    return [];
  }
};

export const addProduct = (product) => {
  const products = getProducts();

  const newProduct = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([newProduct, ...products])
  );

  return newProduct;
};

export const updateProduct = (id, updatedProduct) => {
  const products = getProducts();

  const updatedProducts = products.map((product) =>
    product.id === id
      ? { ...product, ...updatedProduct }
      : product
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedProducts)
  );

  return updatedProducts.find((product) => product.id === id);
};

export const deleteProduct = (id) => {
  const products = getProducts();

  const filteredProducts = products.filter(
    (product) => product.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(filteredProducts)
  );
};