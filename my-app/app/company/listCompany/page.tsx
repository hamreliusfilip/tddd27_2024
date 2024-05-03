import React from 'react'
import CompleteMenu from '../../../components/Main/completeMenu';
import Logo from '../../../components/Main/logo';
import Footer from '../../../components/Main/footer';
import CoList from '@/components/CompaniesSida/CompanyList';

export default function Page() {
    return (
        <div>
            <Logo />
            <CompleteMenu />
            <CoList />
            <Footer />
        </div>
    );
}