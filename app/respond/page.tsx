"use client";

import React, { Suspense } from "react";
// import { useSearchParams } from 'next/navigation';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import AppWalletProvider from "../components/AppWalletProvider";
import RespondEvent from "../components/RespondEvent";

export default function RespondPage() {
    // const searchParams = useSearchParams();
    // const recipient = searchParams.get('recipient') || 'defaultRecipientValue';

    return (
        <AppWalletProvider>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <Suspense fallback={<div>Loading...</div>}>
                    <RespondEvent
                    //  recipient={recipient} 
                    />
                </Suspense>
                <div className="border hover:border-slate-900 rounded">
                    <WalletMultiButton />
                </div>
            </main>
        </AppWalletProvider>
    );
}
