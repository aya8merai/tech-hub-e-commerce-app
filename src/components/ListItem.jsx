import {
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Button,
  Chip,
  Divider,
  Box
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

const ListItem = ({ product, addToCart }) => {
  return (
    <>
        <ListItemAvatar sx={{ width: { xs: '50%', md: 'auto'}}}>
          <Avatar
            alt={product.title}
            src={product.image}
            // variant="square"
            sx={{ width: { xs: '90%', md: 'auto'}, height: { xs: 'auto', md: '100%'}, mr: 2, borderRadius: 1 }}
          />
        </ListItemAvatar>
        
        <ListItemText
          primary={
            <Typography variant="h6" component="div">
              {product.title}
            </Typography>
          }
          secondary={
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
                <Chip 
                  label={product.category} 
                  size="small" 
                  sx={{ mr: 1 }}
                />
                <Typography variant="h6" color="primary">
                  ${product.price}
                </Typography>
              </Box>
              
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                {product.description}
              </Typography>
              
              <Button
                variant="contained"
                size="small"
                startIcon={<ShoppingCart />}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </>
          }
        />
      <Divider variant="inset" component="li" />
    </>
  );
};

export default ListItem;