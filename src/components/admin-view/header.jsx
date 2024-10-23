import { Button } from "../ui/button";
import { useState } from "react";
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logOutUser } from "@/store/auth-slice";

const AdminHeader = ({open, setOpen}) => {

    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logOutUser())
    }
    
    return (
        <header className="flex items-center justify-between py-3 bg-background border-b">
            <Button className="flex gap-2 lg:hidden sm:block" onClick={() => setOpen(true)} >
                <AlignJustify />
                <span className="sr-only">Toggle Menu</span>
            </Button>
            <div className="flex flex-1 justify-end">
                <Button className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow" onClick={handleLogOut}>
                    <LogOut /> Logout
                </Button>
            </div>
        </header>
    )
}

export default AdminHeader;