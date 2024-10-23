import { Outlet } from "react-router-dom";
import { useState } from "react";

import AdminHeader from "./header";
import AdminSideBar from "./sidebar";

const AdminLayout = () => {
    const [openSideBar, setOpenSideBar] = useState(false)

    return (
        <div className="flex min-h-screen w-full">
            <AdminSideBar open={openSideBar} setOpen={setOpenSideBar} />
            <div className="flex flex-1 flex-col">
                <AdminHeader open={openSideBar} setOpen={setOpenSideBar} />
                <main className="flex flex-col gap-2 flex-1 bg-muted/40 p-4 md:p-6">
                    <Outlet></Outlet>
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;