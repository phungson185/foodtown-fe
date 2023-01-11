import * as api from "../api";
import { GETALLFOODS, GETFOOD } from "../constants/actionTypes";

export const getProducts = (page, filterField, searchingName) => async (dispatch) => {
    try {
        const {data} = await api.getProducts(page, filterField, searchingName);
        dispatch({
            type: GETALLFOODS,
            data
        });
    } catch (error) {
        console.log(error);
    }
}

export const getFoodById = (id) => async (dispatch) => {
    try {
        const res = await api.getFoodById(id);
        dispatch({
            type: GETFOOD,
            data: res.data
        });
    } catch (error) {
        console.log(error);
    }
}

export const createProduct = (productInfo, productImage) => async (dispatch) => {
    try {
        const product = new FormData();
        product.append('name', productInfo.name);
        product.append('description', productInfo.description);
        product.append('ingredients', productInfo.ingredients);
        product.append('price', productInfo.price);
        product.append('quantity', productInfo.quantity);
        product.append('image', productImage);
        const {data} = await api.createProduct(product);
        console.log({data});
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = (productInfo, productImage) => async (dispatch) => {
    try {
        const {data} = await api.updateProduct({...productInfo, image: productImage});
        console.log({data});
    } catch (error) {
        console.log(error);
    }
}