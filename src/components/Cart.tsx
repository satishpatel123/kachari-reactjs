import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Box, Typography } from "@mui/material";

const Cart: FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart);

  let total = 0;
  cartItems.forEach((item) => {
    total += item.price * item.quantity;
  });

  return (
    <Box
      sx={{
        padding: "10px",
        textAlign: "center",
      }}
    >
      {cartItems.length > 0 ? (
        <>
          <Box>
            <Typography>Cart Details</Typography>
            {cartItems.map((item) => {
              return (
                <Box
                  sx={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <img
                    src={item.image}
                    height={40}
                    width={40}
                    alt={item.title}
                  />
                  <Typography>{item.title}</Typography>
                  <Typography>Quantity : {item.quantity}</Typography>
                  <Typography>Price : ${item.price}</Typography>
                </Box>
              );
            })}
          </Box>

          <Typography>Total : ${total}</Typography>
        </>
      ) : (
        <Typography>Cart is Empty</Typography>
      )}
    </Box>
  );
};
export default Cart;
