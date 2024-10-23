import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URI = `http://localhost:5001/api/admin/products/`;

const initialState = {
    isLoading: false,
    productList: []
}

export const addNewProduct = createAsyncThunk('/products/addNewProduct', async (formData) => {
    const response = await axios.post(`${URI}add`, formData, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response?.data;
});

export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts', async () => {
    const response = await axios.get(`${URI}list`);
    return response?.data;
});

export const deleteProduct = createAsyncThunk('/products/deleteProduct', async (id) => {
    const response = await axios.delete(`${URI}delete/${id}`);
    return response?.data;
});

export const editProduct = createAsyncThunk('/products/editProduct', async ({id, formData}) => {
    const response = await axios.put(`${URI}edit/${id}`, formData, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response?.data;
});

const AdminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(addNewProduct.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(addNewProduct.fulfilled, (state) => {
            //     state.isLoading = false;
            //     state.productList = action.payload.success ? action.payload.products : [];
            // })
            // .addCase(addNewProduct.rejected, (state) => {
            //     state.isLoading = false;
            //     state.productList = [];
            // })
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                console.log("action - ", action.payload);
                state.isLoading = false;
                state.productList = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state) => {
                state.isLoading = false;
                state.productList = [];
            })
    }
});

export default AdminProductsSlice.reducer;
