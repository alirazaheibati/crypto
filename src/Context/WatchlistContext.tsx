import React, { createContext, useContext, useState, useEffect } from 'react';

type WatchlistContextType = {
    watchlistSymbols: string[];
    addToWatchlist: (symbol: string) => void;
    removeFromWatchlist: (symbol: string) => void;
};

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [watchlistSymbols, setWatchlistSymbols] = useState<string[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('watchlistSymbols');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('watchlistSymbols', JSON.stringify(watchlistSymbols));
        }
    }, [watchlistSymbols]);

    const addToWatchlist = (symbol: string) => {
        console.log('Adding symbol to watchlist:', symbol);
        console.log('Current watchlist:', watchlistSymbols);
        setWatchlistSymbols((prev) => {
            const newList = prev.includes(symbol) ? prev : [...prev, symbol];
            console.log('New watchlist will be:', newList);
            return newList;
        });
    };

    const removeFromWatchlist = (symbol: string) => {
        setWatchlistSymbols((prev) => prev.filter((s) => s !== symbol));
    };

    return (
        <WatchlistContext.Provider
            value={{
                watchlistSymbols,
                addToWatchlist,
                removeFromWatchlist,
            }}
        >
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => {
    const context = useContext(WatchlistContext);
    if (!context) throw new Error('useWatchlist must be used within WatchlistProvider');
    return context;
};