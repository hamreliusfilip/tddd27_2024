import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button"
import Link from 'next/link';

import AdminList from "@/components/adminComponents/adminList";
import Logo from '@/components/logo';
import AdminInfo from "@/components/adminComponents/adminInfo";

export default async function Protected() {
    const { isAuthenticated } = getKindeServerSession();

    return (await isAuthenticated()) ? (
        <div className="mb-40">
            <Logo />
            <AdminInfo />
            <Link href="/admin" className=" m-10">
                <Button variant="outline" className="bg-black text-white ml-5">Tillbaka</Button>
            </Link>
            <AdminList />
        </div>
    ) : (
        <div className="flex flex-col items-center justify-center h-screen">
            <p className="ml-10 mb-5 mt-10 font-bold text-center"> Denna sida är skyddad. <br></br> Om du är du administratör kan du logga in. </p>
            <LoginLink>
                <Button variant="outline" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white ml-5">
                    Logga in
                </Button>
            </LoginLink>
        </div>
    );
}
