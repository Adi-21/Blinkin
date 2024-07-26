// "use client";

// import React, { Suspense } from "react";
// import { useSearchParams } from 'next/navigation';
// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
// import AppWalletProvider from "./components/AppWalletProvider";

// const InitiateEvent = React.lazy(() => import("./components/InitiateEvent"));
// const RespondEvent = React.lazy(() => import("./components/RespondEvent"));

// export default function Home() {

//   const searchParams = useSearchParams();
//   const recipient = searchParams.get('recipient') || 'defaultRecipientValue';

//   return (
//     <>
//       <AppWalletProvider >
//         <main className="flex min-h-screen flex-col items-center justify-between p-24">
//           <Suspense fallback={<div>Loading...</div>}>
//             <InitiateEvent />
//             {recipient && <RespondEvent recipient={recipient} />}
//           </Suspense>
//           <div className="border hover:border-slate-900 rounded">
//             <WalletMultiButton style={{}} />
//           </div>
//         </main>
//       </AppWalletProvider>
//     </>
//   );
// }


"use client";

import Link from 'next/link';

export default function Home() {

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Call Management App</h1>
      <div className="flex space-x-4">
        <Link href="/initiate">
          <button className="bg-blue-500 text-white p-2 rounded">Initiate Call</button>
        </Link>
        <Link href="/respond">
          <button className="bg-green-500 text-white p-2 rounded">Respond to Call</button>
        </Link>
      </div>
    </div>
  );
}


