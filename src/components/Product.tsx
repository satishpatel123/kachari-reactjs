import { Button, Typography, Box, IconButton } from "@mui/material";
import { FC } from "react";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { AddToCart, RemoveToCart } from "../redux/action";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IProduct } from "../common/types";
interface productProps {
  product: IProduct;
}
const Product: FC<productProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleAddToCart = () => {
    dispatch(AddToCart(product));
  };

  const handleRemoveToCart = () => {
    dispatch(
      RemoveToCart({
        ...product,
        quantity: 0,
      })
    );
  };
  return (
    <Box
      sx={{
        textAlign: "center",
        border: "1px solid lightblue",
        padding: "18px",
      }}
    >
      <img src={product.image} alt="" height={100} width={100} />
      <Typography variant="h5">{product.title}</Typography>
      <Typography variant="h6">{product.description}</Typography>
      <Typography variant="h6">${product.price}</Typography>

      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <IconButton onClick={handleAddToCart}>
          <AddIcon />
        </IconButton>
        <Button variant="contained">Add To Cart</Button>
        <IconButton>
          <RemoveIcon onClick={handleRemoveToCart} />
        </IconButton>
      </Box>
    </Box>
  );
};
export default Product;
