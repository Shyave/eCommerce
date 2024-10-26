import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";


const ProductDetails = ({open, setOpen, productDetails}) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
                <div className="relative overflow-hidden rounded-lg">
                    <img src={productDetails?.image} alt={productDetails?.title} width={600} height={600} className="aspect-square w-full object-cover" />
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
                        <p className="text-2xl mb-5 mt-4 text-muted-foreground">{productDetails?.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className={`${productDetails?.salePrice > 0} ? 'line-through' : '' text-3xl font-bold text-primary`}>${productDetails?.price}</p>
                        {
                            productDetails?.salePrice > 0 ? <p className="text-3xl font-bold text-primary">${productDetails?.salePrice}</p> : null
                        }
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                            <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                            <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                            <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                            <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                        </div>
                        <span className="text-muted-foreground">(4.5)</span>
                    </div>
                    <div className="mt-5 mb-5">
                        <Button className="w-full">Add to Cart</Button>
                    </div>
                    <Separator />

                    <div className="max-h-[300px] overflow-auto mt-4">
                        <h2 className="text-xl font-bold mb-4">Reviews</h2>
                        <div className="grid gap-6">
                            <div className="flex gap-4">
                                <Avatar className="w-10 h-10 border">
                                    <AvatarFallback>VS</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold">Vinod Shyave</h3>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                                        <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                                        <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                                        <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                                        <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                                    </div>
                                    <p className="text-muted-foreground">This is an awesome product</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex gap-2">
                            <Input placeholder="Write a review..."></Input>
                            <Button>Add Review</Button>
                        </div>
                    </div>
                </div>
                
            </DialogContent>
        </Dialog>
    )
}

export default ProductDetails;