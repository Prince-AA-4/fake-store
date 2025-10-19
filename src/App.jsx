import Home from "./pages/Home";
import { useState } from 'react';
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductDetails from "./pages/ProductDetails";
import { ShopNavBar } from "./components/Navbar";
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { ShopDemo } from "./components/ShopDemo";
import { CartDrawer } from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSummary from "./pages/OrderSummary";
import Signup from "./pages/SignUp";
import RequireAuth from "./pages/RequireAuth";
import AdminDashboard from './pages/AdminDashbord';
import {
  Drawer, List, ListItem, ListItemText
} from '@mui/material';
import Footer from "./components/Footer";
import {Box} from "@mui/material";

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkedOutItems, setCheckedOutItems] = useState([]);
  const [loginIntent, setLoginIntent] = useState(null);
  const [user, setUser] = useState(null);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);


  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

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

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh'}}>
    <BrowserRouter>
      <ShopNavBar
        cartItemCount={cartItemCount}
        onCartClick={() => setCartOpen(true)}
        onMenuClick={toggleDrawer(true)}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <List>
          <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
            <HomeIcon sx={{ mr: 1 }} />
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
            <StoreIcon sx={{ mr: 1 }} />
            <ListItemText primary="Shop" />
          </ListItem>
          <ListItem button component={Link} to="/checkout" onClick={toggleDrawer(false)}>
            <ShoppingCartIcon sx={{ mr: 1 }} />
            <ListItemText primary="Checkout" />
          </ListItem>
          <ListItem button component={Link} to="/order-summary" onClick={toggleDrawer(false)}>
            <AssignmentIcon sx={{ mr: 1 }} />
            <ListItemText primary="Order Summary" />
          </ListItem>
          <ListItem button component={Link} to="/admin" onClick={toggleDrawer(false)}>
            <AdminPanelSettingsIcon sx={{ mr: 1 }} />
            <ListItemText primary="Admin Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/login" onClick={toggleDrawer(false)}>
            <LoginIcon sx={{ mr: 1 }} />
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button component={Link} to="/signup" onClick={toggleDrawer(false)}>
            <PersonAddIcon sx={{ mr: 1 }} />
            <ListItemText primary="Sign Up" />
          </ListItem>
          </List>
      </Drawer>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} onAddToCart={handleAddToCart} />} />
        <Route path="/login" element={<Login setUser={setUser} loginIntent={loginIntent} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/shop" element={<ShopDemo cartOpen={cartOpen} setCartOpen={setCartOpen} />} />
        <Route path="/product-details/:id" element={<ProductDetails onAddToCart={handleAddToCart} />} />
        <Route path="/checkout" element={
          <RequireAuth user={user} setLoginIntent={setLoginIntent}>
            <Checkout
              cartItems={cartItems}
              setCartItems={setCartItems}
              setCheckedOutItems={setCheckedOutItems}
            />
          </RequireAuth>
        } />
        <Route path="/order-summary" element={<OrderSummary checkedOutItems={checkedOutItems} />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </Box>
  );
}

export default App;
