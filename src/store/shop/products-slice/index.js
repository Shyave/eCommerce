import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const SHOP_URI = `http://localhost:5001/api/shop/products/`;

const initialState = {
    isLoading: false,
    productList: [],
    productDetails: null
}

export const fetchAllFilteredProducts = createAsyncThunk('/products/fetchAllProducts', async ({filterParams, sortParams}) => {
    const query = new URLSearchParams({...filterParams, sortBy: sortParams});
    const response = await axios.get(`${SHOP_URI}list?${query}`);
    return response?.data;
});

export const fetchProductDetails = createAsyncThunk('/products/fetchProductDetails', async (id) => {
    const response = await axios.get(`${SHOP_URI}get/${id}`);
    return response?.data;
});

const shoppingProductSlice = createSlice({
    name: 'shoppingProductsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFilteredProducts.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload
            })
            .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
                state.isLoading = false; 
                state.productDetails = null
            })
            .addCase(fetchProductDetails.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productDetails = action.payload.data;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.isLoading = false; 
                state.productDetails = null
            })
    }
})

export default shoppingProductSlice.reducer;