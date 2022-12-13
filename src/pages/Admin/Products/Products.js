import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ProductForm from "../../../components/productForm/ProductForm";
import Product from "./Product/Product";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  COMMENT,
  LIKE,
  VIEW,
  RATING,
  QUANTITY,
} from "../../../constants/filterMode";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../actions/product";
import "./styles.css";

const Products = () => {
  const [isViewingProductList, setIsViewingProductList] = useState(true);
  const [updatingProduct, setUpdatingProduct] = useState({
    _id: "",
    name: "",
    description: "",
    quantity: "",
    price: "",
    ingredients: [],
    image: null,
  });
  const [page, setPage] = useState(1);
  const [searchingName, setSearchingName] = useState("");
  const [filterField, setFilterField] = useState(RATING);
  const [totalPage, setTotalPage] = useState(1);
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(page, filterField, searchingName));
  }, [dispatch, page, filterField, searchingName]);

  const onAddingProduct = () => {
    setIsViewingProductList(false);
  };

  useEffect(() => {
    setTotalPage(Math.round(products?.length / 4));
  }, [products]);

  return (
    <div className="products__management-container">
      {isViewingProductList ? (
        <>
          <div className="products__management-header">
            <div className="products__management-filters">
              <TextField
                label="Search Product..."
                variant="outlined"
                size="small"
                value={searchingName}
                onChange={(e) => setSearchingName(e.target.value)}
                fullWidth
              />
              <Box sx={{ width: 200 }}>
                <FormControl fullWidth>
                  <InputLabel id="orderBy">Order By</InputLabel>
                  <Select
                    value={filterField}
                    id="orderBy"
                    label="Order By"
                    onChange={(e) => setFilterField(e.target.value)}
                    size="small"
                    fullWidth
                  >
                    <MenuItem value={RATING}>Rating</MenuItem>
                    <MenuItem value={QUANTITY}>Quantity</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <Button variant="contained" onClick={onAddingProduct}>
              Add Product
            </Button>
          </div>
          {products ? (
            products?.map((product) => (
              <Product
                product={product}
                updateProduct={setIsViewingProductList}
                setUpdatingProduct={setUpdatingProduct}
              />
            ))
          ) : (
            <></>
          )}
          <div className="products__management-pagination">
            <Pagination
              count={totalPage}
              page={page}
              onChange={(event, value) => setPage(value)}
              showFirstButton
              showLastButton
            />
          </div>
        </>
      ) : (
        <ProductForm
          cancellingAddingProduct={setIsViewingProductList}
          updatingProduct={updatingProduct}
        />
      )}
    </div>
  );
};

export default Products;
