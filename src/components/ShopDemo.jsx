import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { ShopNavBar } from './Navbar';   


export const ShopDemo = ({cartOpen, setCartOpen}) => {
  // const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  

  const categories = ['electronics', 'clothing', 'accessories'];

  const handleAddToCart = (product) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      setCartItems(cartItems.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box>
      {/* <ShopNavBar 
        cartItemCount={cartItemCount}
        onCartClick={() => setCartOpen(true)}
        onMenuClick={() => console.log('Menu clicked')}
      />
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <ProductGrid 
        products={sampleProducts}
        onAddToCart={handleAddToCart} */}
      {/* /> */}
      <ShopNavBar
        cartItemCount={cartItemCount}
        onCartClick={() => setCartOpen(true)}
        onMenuClick={() => console.log('Menu clicked')}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Home 
      searchTerm={searchTerm} 
      onAddToCart={handleAddToCart}/>

      <CartDrawer 
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </Box>
  );
};