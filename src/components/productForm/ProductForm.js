import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux';
import './styles.css'
import { createProduct, updateProduct } from '../../actions/product';

const ProductForm = ({updatingProduct, cancellingAddingProduct}) => {
    const [productImage, setProductImage] = useState(updatingProduct.image);
    const [productForm, setProductForm] = useState({
        name: updatingProduct.name,
        ingredients: updatingProduct.ingredients,
        price: updatingProduct.price,
        quantity: updatingProduct.quantity,
        description: updatingProduct.description,
    })
    const dispatch = useDispatch();
    const onUpdateForm = (e) => {
        setProductForm(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }
    const onUpdateImage = (e) => {
        setProductImage(e.target.files[0]);
    }
    const onAddProduct = () => {
        dispatch(createProduct(productForm, productImage));
    }
    const onUpdateProduct = () => {
        dispatch(updateProduct(productForm, productImage));
    }
    const onCancelAddingProduct = () => {
        cancellingAddingProduct(true);
    }
    const ingredients = [
        "Rice",
        "Pork",
        "Beef",
        "Chicken",
        "Duck",
        "Veal",
        "Lamb",
        "Goat",
        "Fish",
        "Crab",
        "Shrimp",
        "Mantis shrimp",
        "Clam",
        "Snail",
        "Mussel",
        "Water morning glory",
        "Cabbage",
        "Brassica juncea",
        "Malabar spinach",
        "Katuk",
        "Tomato",
        "Mushroom",
        "Onion"
    ]
    return (
        <div className='product__form-container'>
            <div className='product__form-name'>
                <TextField label="Product Name" variant="outlined" name="name" onChange={onUpdateForm} value={productForm.name}/>
            </div>
            <div className='product__form-ingredients'>
                <Autocomplete
                    multiple
                    options={ingredients}
                    getOptionLabel={(option) => option}
                    filterSelectedOptions
                    // onInputChange={(event, newInputValue) => {console.log(newInputValue)}}
                    renderInput={(params) => (
                        <TextField
                            id="tags"
                            {...params}
                            label="Product Ingredients"
                            placeholder="Product Ingredients"
                            value={productForm.ingredients}
                            multiline
                            // onChange={(e) => console.log(e.target)}
                            maxRows={5}
                        />
                    )}
                    value={productForm.ingredients}
                    onChange={(event, newValue) => {
                        setProductForm(prev => {
                            return {
                                ...prev,
                                ingredients: newValue
                            }
                        })
                    }}
                />
            </div>
            <div className='product__form-price'>
                <TextField label="Product Price" variant="outlined" name="price" onChange={onUpdateForm} value={productForm.price} />
            </div>
            <div className='product__form-quantity'>
                <TextField label="Product Quantity" variant="outlined" name="quantity" onChange={onUpdateForm} value={productForm.quantity} />
            </div>
            <div className='product__form-description'>
                <TextField label="Product Description" variant="outlined" name="description" onChange={onUpdateForm} value={productForm.description} multiline rows={5} />
            </div>
            <div className='product__form-image'>
                <Button
                    variant="contained"
                    component="label"
                    >
                    Upload Image
                    <input
                        type="file"
                        hidden
                        onChange={onUpdateImage}
                    />
                </Button>
                <p>{productImage ? productImage.name : "No uploaded image"}</p>
            </div>
            <div className='product__form-buttons'>
                <Button variant="outlined" onClick={onCancelAddingProduct}>CANCEL</Button>
                <Button variant="contained" onClick={updatingProduct.name ? onUpdateProduct : onAddProduct}>{updatingProduct.name ? "UPDATE" : "ADD"}</Button>
            </div>
        </div>
    )
}

export default ProductForm