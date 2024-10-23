import { useEffect, useRef } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { FileIcon, Loader, SendToBack, UploadCloudIcon, XIcon } from "lucide-react"
import { Button } from "../ui/button"
import axios from "axios"
import { Skeleton } from "../ui/skeleton"

const ProductImageUpload = ({imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl, imageLoadingState, setImageLoadingStat, isEditMode, productItem}) => {
    const handleImageFile = (event) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) setImageFile(selectedFile)
    }

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) setImageFile(droppedFile);
    }

    const handleRemoveImage = () => {
        setImageFile(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    async function uploadImageToCloudinary() {
        const data = new FormData();
        data.append('my_file', imageFile);
        const response = await axios.post('http://localhost:5001/api/admin/products/upload-image', data);
        if (response) {
            setUploadedImageUrl(response?.data?.result?.url)
            setImageLoadingState(false)
        }
    }

    useEffect(() => {
        if (imageFile && imageFile !== null) uploadImageToCloudinary()
    }, [imageFile]);
    

    const inputRef = useRef(null);
    return (

        <div className="w-full max-w-md mx-auto">
            <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
            <div className="border-2 border-dashed rounded-lg p-4" onDragOver={handleDragOver} onDrop={handleDrop}>
                <Input id="image-upload" type="file" className="hidden" ref={inputRef} onChange={handleImageFile} disabled={isEditMode} />
                {
                    !imageFile ? (
                        <>
                            {
                                isEditMode ? (
                                    <img className="w-full h-[200px]" src={productItem.image} alt={productItem.title} />
                                ) : (
                                    <Label htmlFor="image-upload" className={`${isEditMode ? 'cursor-not-allowed' : ''} flex flex-col items-center justify-center h-32 cursor-pointer`}>
                                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2"></UploadCloudIcon>
                                        <span>Drag &amp; drop or Click to upload image</span>
                                    </Label>
                                )
                            }
                        </>
                    ) : (
                        imageLoadingState ? <Skeleton className="bg-gray-100 p-4 text-center">Uploading Image...</Skeleton> :
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <FileIcon className="w-8 h-8 text-primary mr-2"></FileIcon>
                            </div>
                            <p className="text-sm font-medium">{imageFile?.name}</p>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                                <XIcon className="w-4 h-4"></XIcon>
                                <span className="sr-only">Remove File</span>
                            </Button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ProductImageUpload