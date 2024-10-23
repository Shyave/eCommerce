import { Fragment, useState } from "react";
import { ChartNoAxesCombined, LayoutDashboard, ShoppingBasket, SendToBack } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
  

export const adminSideBarMenuItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: <LayoutDashboard />
    },
    {
        id: 'products',
        label: 'Products',
        path: '/admin/products',
        icon: <ShoppingBasket />
    },
    {
        id: 'orders',
        label: 'Orders',
        path: '/admin/orders',
        icon: <SendToBack />
    }
];


const AdminSideBar = ({open, setOpen}) => {
    const navigate = useNavigate();
    

    const MenuItems = () => {
        const navigate = useNavigate();
        return (
            <nav className="flex mt-8 flex-col gap-2">
                {
                    adminSideBarMenuItems.map((menuObj) => {
                        return (
                            <div key={menuObj.id} onClick={() => { 
                                setOpen(false);
                                navigate(menuObj.path);
                            }} className="flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground text-xl">
                                {menuObj.icon}
                                <span>{menuObj.label}</span>
                            </div>
                        )
                    })
                }
            </nav>
        )
    }

    return (
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-[75%]">
                    <div className="flex flex-col h-full">
                        <SheetHeader>
                            <SheetTitle className="flex flex-row gap-2 items-center">
                                <ChartNoAxesCombined size={36} />
                                <h1 className="text-2xl font-extrabold mt-1">Admin Panel</h1>
                            </SheetTitle>
                            <SheetDescription>
                                <MenuItems />
                            </SheetDescription>
                        </SheetHeader>
                    </div>
                </SheetContent>
            </Sheet>
            <aside className="flex-col hidden w-64 border-r bg-background p-6 lg:flex">
                <div onClick={() => navigate('/admin/dashboard')} className="flex items-center cursor-pointer gap-2">
                    <ChartNoAxesCombined size={36} />
                    <h1 className="text-2xl mt-1 font-extrabold">Admin Panel</h1>
                </div>
                <MenuItems />
            </aside>
        </Fragment> 
    )
}

export default AdminSideBar;