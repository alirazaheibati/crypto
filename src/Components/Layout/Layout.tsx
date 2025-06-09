'use client'

import Header from "@/Components/Header";
import {WatchlistProvider} from "@/Context/WatchlistContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
    console.log('Layout component rendered');
    
    return (
        <>
            <WatchlistProvider>
                <Header/>
                {children}
            </WatchlistProvider>
        </>
    )
}

export default Layout;