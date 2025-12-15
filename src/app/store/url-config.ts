const URLConfig = {
  auth: {
    uri: "/auth",
    context: {
      login: "/login",
      profile: "/me",
      tokenRefresh: "/refresh",
    },
  },
  products: {
    uri: "/api/products",
    context: {
      getAllProducts: "/api/products",
      getProductById: "/api/products",
      createProduct: "/api/products",
      updateProduct: "/api/products",
      deleteProduct: "/api/products",
    },
  },
};

export default URLConfig;
