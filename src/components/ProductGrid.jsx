import ProductCard from "./ProductCard";


export const ProductGrid = ({ products, onAddToCart }) => {
  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </Grid>
      ))}
    </Grid>
  );
};
