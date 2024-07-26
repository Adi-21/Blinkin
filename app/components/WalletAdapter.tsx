import { useState, useEffect } from 'react';

interface Wallet {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    on: (event: string, callback: () => void) => void;
    publicKey?: { toString: () => string };
}

export const useWallet = () => {
    const [publicKey, setPublicKey] = useState<string | null>(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const connectWallet = async (wallet: Wallet) => {
            try {
                await wallet.connect();
                wallet.on('connect', () => {
                    setPublicKey(wallet.publicKey?.toString() ?? null);
                    setConnected(true);
                });
                wallet.on('disconnect', () => {
                    setPublicKey(null);
                    setConnected(false);
                });
            } catch (error) {
                console.error('Error connecting to the wallet:', error);
            }
        };

        // Detect and connect to wallet
        // This is a placeholder for wallet detection logic
        // You might need to implement a more sophisticated method for detecting and selecting wallets
        if (window.solana) {
            connectWallet(window.solana as unknown as Wallet);
        } else {
            console.log('Wallet object not found! Make sure you have a wallet installed.');
        }

        // Cleanup function to remove listeners and disconnect
        return () => {
            if (window.solana) {
                window.solana.disconnect();
            }
        };
    }, []);

    return { publicKey, connected };
};