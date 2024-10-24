import { House, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { shoppingViewHeaderMenuItems } from "@/config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logOutUser } from "@/store/auth-slice";

const MenuItems = () => {
    return (
        <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
            {
                shoppingViewHeaderMenuItems.map(menuItem => {
                    return <Link className="text-sm font-medium" key={menuItem.id} to={menuItem.path}>{menuItem.label}</Link>
                })
            }
        </nav>
    )
}

const ShoppingHeader = () => {
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logOutUser());
    }

    const HeaderRightContent = () => {
        return (
            <div className="flex lg:items-center lg:flex-row flex-col gap-4">
                <Button variant="outline" size="icon">
                    <ShoppingCart className="w-6 h-6"></ShoppingCart>
                    <span className="sr-only">User Cart</span>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="bg-black">
                            <AvatarFallback className="bg-black text-white font-extrabold">
                                { user?.userName?.[0].toUpperCase() }
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side='right' className="w-56">
                        <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
                        <DropdownMenuSeparator></DropdownMenuSeparator>
                        <DropdownMenuItem onClick={() => navigate('/shop/account')}>
                            <UserCog className="mr-2 w-4 h-4" /> Account
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogOut}>
                            <LogOut className="mr-2 w-4 h-4"></LogOut>Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        )
    }

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <Link to='/shop/home' className="flex items-center gap-2">
                    <House className="h-6 w-6 justify-end">
                        <span className="font-bold">ECommerce</span>
                    </House>
                </Link>
                <Sheet>
                    <SheetTrigger>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <Menu className="w-6 h-6" />
                            <span className="sr-only">Toggle header Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-xs">
                        <MenuItems />
                        <HeaderRightContent />
                    </SheetContent>
                </Sheet>

                <div className="hidden lg:block">
                    <MenuItems />
                </div>
                
                <div className="hidden lg:block">
                    <HeaderRightContent />
                </div>
                    
            </div>
        </header>
    )
}

export default ShoppingHeader