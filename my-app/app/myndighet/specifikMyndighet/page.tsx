import React from 'react'
import CompleteMenu from '../../../components/completeMenu';
import Logo from '../../../components/logo';
import Footer from '../../../components/footer';

export default function Page() {
    return (
        <div>
            <Logo />
            <CompleteMenu />
            <h1>Specifik sida för myndighet</h1>
            <Footer />
        </div>
    );
}