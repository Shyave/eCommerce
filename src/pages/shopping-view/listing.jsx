import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowUpDownIcon } from "lucide-react";

import ProductFilter from "@/components/shopping-view/filter";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import { useSearchParams } from "react-router-dom";
import ProductDetails from "@/components/shopping-view/product-details";

const ShoppingListing = () => {
    const dispatch = useDispatch();
    const {productList, productDetails} = useSelector(state => state.shoppingProducts);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    const handleSort = (value) => {
        setSort(value); 
    }

    const handleGetProductDetails = (getCurrentProductId) => {
        dispatch(fetchProductDetails(getCurrentProductId))
    };

    const createSearchParamsHelper = (filters) => {
        const queryParams = [];
        for (const [key, value] of Object.entries(filters)) {
            if (Array.isArray(value) && value.length > 0) {
                const paramValue = value.join(',');
                queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
            }
        }        
        return queryParams.join('&');
    }

    const handleFilters = (getSectionId, getCurrentOption) => {
        let copyFilters = { ...filters };
        const indexOfCurrentSection = Object.keys(copyFilters).indexOf(getSectionId);
        
        if (indexOfCurrentSection === -1) {
            copyFilters = {
                ...copyFilters,
                [getSectionId]: [getCurrentOption]
            }
        } else {
            const indexOfCurrentOption = copyFilters[getSectionId].indexOf(getCurrentOption);
            
            if (indexOfCurrentOption === -1) {
                copyFilters[getSectionId].push(getCurrentOption);
            } else {
                copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
            }
        }

        setFilters(copyFilters);
        sessionStorage.setItem('filters', JSON.stringify(copyFilters));
    }

    useEffect(() => {
        setSort('price-lowtohigh');
        setFilters(JSON.parse(sessionStorage.getItem('filters')) || {});
    },[]);

    useEffect(() => {
        if (productDetails !== null) {
            setOpenDetailsDialog(true);
        }
    }, [productDetails])

    // Fetch list of Products...
    useEffect(() => {
        if (filters !== null && sort !== null) 
        dispatch(fetchAllFilteredProducts({filterParams: filters, sortParams: sort}));
    }, [dispatch, sort, filters])
    
    useEffect(() => {
        if (filters && Object.keys(filters).length > 0) {
            const createQueryString = createSearchParamsHelper(filters);
            setSearchParams(new URLSearchParams(createQueryString));
        }
    }, [filters]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
            <ProductFilter filters={filters} handleFilters={handleFilters}  />
            <div className="bg-background w-full rounded-lg shadow-sm">
                <div className="flex p-4 border-b items-center justify-between">
                    <h2 className="text-lg font-extrabold">All Products</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">{productList?.data?.length} Products</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <ArrowUpDownIcon className="h-4 w-4" /> Sort by
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]" >
                                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                                    {
                                        sortOptions.map((sortItem) => {
                                            return (
                                                <div key={sortItem.id}>
                                                    <DropdownMenuRadioItem value={sortItem.id}>{sortItem.label}</DropdownMenuRadioItem>
                                                </div>
                                            )
                                        })
                                    }
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                {
                    productList?.data?.length ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {
                                productList?.data?.length && productList.data.map((product) => {
                                    return (
                                        <ShoppingProductTile key={product._id} product={product} handleGetProductDetails={handleGetProductDetails} ></ShoppingProductTile>
                                    )
                                }) 
                            }
                        </div>
                    ) : <div className="flex w-full p-4 text-center font-semibold justify-center">No Product found!</div>
                }
            </div>
            <ProductDetails open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
        </div>
    )
};

export default ShoppingListing;