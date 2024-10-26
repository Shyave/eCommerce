
import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const ProductFilter = ({filters, handleFilters}) => {
    return (
        <div className="bg-background rounded-lg shadow-sm">
            <div className="p-4 border-b text-left">
                <h2 className="text-lg font-extrabold">Filters</h2>
            </div>
            <div className="p-4 space-y-4">
                {
                    Object.keys(filterOptions).map(keyItem => {
                        return (
                            <Fragment key={keyItem}>
                                <div>
                                    <h3 className="text-base font-bold text-left">{keyItem.charAt(0).toUpperCase() + keyItem.slice(1)}</h3>
                                    <div className="grid gap-2 mt-2">
                                        {
                                            filterOptions[keyItem].map((option) => {
                                                return (
                                                    <Label key={option.id} className="flex items-center gap-2 font-medium cursor-pointer">
                                                        <Checkbox checked={ 
                                                            filters && Object.keys(filters).length > 0 && filters[keyItem] 
                                                            && filters[keyItem].indexOf(option.id) > -1
                                                        } onCheckedChange={() => handleFilters(keyItem, option.id)} /> {option.label}
                                                    </Label>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <Separator />
                            </Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProductFilter;
