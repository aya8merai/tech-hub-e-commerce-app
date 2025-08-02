import { useParams, useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  CircularProgress
} from '@mui/material';
import { ShoppingCart, ArrowBack } from '@mui/icons-material';

const ProductDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(state?.product || null);
  const [loading, setLoading] = useState(!state?.product);

  useEffect(() => {
    if (!state?.product) {
      const cachedProducts = JSON.parse(localStorage.getItem('productsCache'));
      const cachedProduct = cachedProducts?.find(p => p.id.toString() === id);
      
      if (cachedProduct) {
        setProduct(cachedProduct);
        setLoading(false);
      } else {
        navigate('/products', { replace: true });
      }
    }
  }, [id, state, navigate]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <Typography variant="h6" sx={{ mt: 4 }}>
          Product not found
        </Typography>
        <Button 
          startIcon={<ArrowBack />} 
          onClick={() => navigate('/products')}
          sx={{ mt: 2 }}
        >
          Back to Products
        </Button>
      </Container>
    );
  }

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back to Products
      </Button>

      <Card>
        <Grid container>
          <Grid 
            size={{ xs:12, md:6 }}
            sx={{
              width: { xs: '100%', md: '50%'},
              minHeight: {xs:'300px', md: '500px'},
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              bgcolor: 'background.paper'
            }}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            sx={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              borderRadius: 1
            }}
          />
          </Grid>


          <Grid 
            size={{ xs:12, md:6 }}
            sx={{ width: { xs: '100%', md: '50%'}, p: 3 }}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                {product.title}
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', mb: 3 }}>
                <Chip 
                  label={product.category} 
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2, ml: 0.5 }}>
                  Product ID: {product.id}
                </Typography>
              </Box>
              
              <Typography variant="body1" sx={{ mb: 3, flexGrow: 1 }}>
                {product.description}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'start', mb: 3 }}>
                <Typography variant="h5"  sx={{ mr: 1 }}>                  
                  Price: 
                </Typography> 
                <Typography variant="h5" color="primary">
                  ${product.price}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={addToCart}
                sx={{ 
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  mt: 'auto'
                }}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default ProductDetails;