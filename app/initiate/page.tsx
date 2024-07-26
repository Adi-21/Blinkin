"use client";

import React, { Suspense } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import AppWalletProvider from "../components/AppWalletProvider";
import InitiateEvent from "../components/InitiateEvent";

export default function InitiatePage() {
    return (
        <AppWalletProvider>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <Suspense fallback={<div>Loading...</div>}>
                    <InitiateEvent />
                </Suspense>
                <div className="border hover:border-slate-900 rounded">
                    <WalletMultiButton />
                </div>
            </main>
        </AppWalletProvider>
    );
}
