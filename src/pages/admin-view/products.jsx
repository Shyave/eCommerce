import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Fragment, useEffect, useState } from "react";
import { addProductFormElements } from "@/config";
import CommonForm from "@/components/common/form";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "@/components/admin-view/product-tile";

const initialFormData = {
    image: null,
    title: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    salesPrice: '',
    totalStock: ''
}

const AdminProducts = () => {
    const [openCreateProductDialogue, setOpenCreateProductDialogue] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const [imageLoadingState, setImageLoadingState] = useState(true);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const {productList} = useSelector(state => state.adminProducts)
    const dispatch = useDispatch();
    const {toast} = useToast();

    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (formData._id) {
            dispatch(editProduct({id: formData?._id, formData})).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllProducts());
                    setOpenCreateProductDialogue(false);
                    setFormData(initialFormData);
                    setCurrentEditedId(null);
                    toast({
                        title: 'Product updated successfully!'
                    });
                }
            });
        } else {
            dispatch(addNewProduct({
                ...formData,
                image: uploadedImageUrl
            })).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllProducts());
                    setOpenCreateProductDialogue(false);
                    setImageFile(null);
                    setFormData(initialFormData);
                    toast({
                        title: 'Product added successfully!'
                    });
                }
            });
        }

    }

    return (
        <Fragment>
            <div className="flex w-full mb-5 justify-end">
                <Button onClick={() => {
                    setOpenCreateProductDialogue(true)
                }}>Add New Product</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-4">
                {
                    productList && productList?.data?.length ? productList?.data?.map((productItem) => {
                        return <AdminProductTile key={productItem._id} setCurrentEditedId={setCurrentEditedId} setOpenCreateProductDialogue={setOpenCreateProductDialogue} setFormData={setFormData} product={productItem} />
                    }) : <div>No Products found! Click 'Add New Product' to add one</div>
                }
            </div>
            <Sheet open={openCreateProductDialogue} onOpenChange={() => {
                    setFormData(initialFormData);
                    setCurrentEditedId(null)
                    setOpenCreateProductDialogue(false)
                }}>
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader className="mb-4">
                        <SheetTitle>{currentEditedId !== null ? 'Edit Product' : 'Add New Product' }</SheetTitle>
                    </SheetHeader>
                    <SheetDescription>
                        <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} imageLoadingState={imageLoadingState} setImageLoadingState={setImageLoadingState} isEditMode={currentEditedId !== null} productItem={formData} ></ProductImageUpload>
                        <div className="py-6">
                            <CommonForm onSubmit={onSubmit} formData={formData} setFormData={setFormData} formControls={addProductFormElements} buttonText={ formData._id ? 'Edit Product' : 'Add Product'}></CommonForm>
                        </div>
                    </SheetDescription>
                </SheetContent>
            </Sheet>
        </Fragment>
    )
};

export default AdminProducts;