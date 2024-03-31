import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchAllProducts } from "../redux/reducer";
import {
  Grid,
  AppBar,
  Box,
  Toolbar,
  Button,
  Drawer,
  Typography,
} from "@mui/material";

import Product from "./Product";
import Cart from "./Cart";

const Main: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [openCart, setOpenCart] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  const products = useSelector((state: RootState) => state.products);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                setOpenCart(true);
              }}
            >
              Cart
            </Button>
            <Typography>Cart Application</Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        PaperProps={{
          sx: { width: "30%" },
        }}
        anchor={"left"}
        open={openCart}
        onClose={() => {
          setOpenCart(false);
        }}
      >
        <Cart />
      </Drawer>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "10px",
          padding: "10px",
        }}
      >
        {products.map((product) => {
          return (
            <Grid item md={4} xs={12} key={product._id}>
              <Product product={product} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
export default Main;
