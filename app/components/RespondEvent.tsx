// import { useState, useEffect } from 'react';
// import { useWallet } from "@solana/wallet-adapter-react";
// import { respondCall } from '../utils/program';

// interface RespondEventProps {
//   recipient: string;
// }

// export default function RespondEvent({ recipient }: RespondEventProps) {
//   const [loading, setLoading] = useState(false);
//   const [callData, setCallData] = useState('');
//   const wallet = useWallet();

//   useEffect(() => {
//     const storedCallData = window.localStorage.getItem('callData');
//     if (storedCallData) {
//       setCallData(storedCallData);
//     } else {
//       console.error('No callData found in local storage');
//     }
//   }, []);

//   const respondToCall = async () => {
//     setLoading(true);
//     try {
//       if (!callData || !recipient || !wallet.publicKey) {
//         console.error('callData, recipient, or wallet is missing');
//         return;
//       }
//       await respondCall(callData, recipient);
//       console.log('Call responded successfully');
//     } catch (error) {
//       console.error('Failed to respond to call:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-3xl font-bold mb-4">Respond to Call</h1>
//       <input
//         type="text"
//         value={wallet.publicKey?.toBase58() || ""}
//         placeholder="Responder Wallet Public Key"
//         className="border p-2 mb-4 w-full text-black font-black"
//         readOnly
//       />
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <button
//           onClick={respondToCall}
//           className="bg-blue-500 text-white p-2 rounded"
//         >
//           Respond
//         </button>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { respondCall } from "../utils/program";

export default function RespondEvent() {
  const [callData, setCallData] = useState("");
  const [loading, setLoading] = useState(false);
  const wallet = useWallet();

  const respondToCallHandler = async () => {
    if (!wallet.publicKey) {
      console.error("Wallet public key is not available.");
      return;
    }

    setLoading(true);
    try {
      await respondCall(callData, wallet.publicKey.toBase58());
      console.log("Call responded successfully");
    } catch (error) {
      console.error("Failed to respond to call:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Respond to Call</h1>
      <input
        type="text"
        value={wallet.publicKey ? wallet.publicKey.toBase58() : ""}
        placeholder="Responder Public Key"
        className="border p-2 mb-4 w-full text-black font-black"
        readOnly
      />
      <input
        type="text"
        value={callData}
        onChange={(e) => setCallData(e.target.value)}
        placeholder="Call Data Address"
        className="border p-2 mb-4 w-full text-black font-black"
      />
      <button onClick={respondToCallHandler} disabled={loading} className="bg-blue-500 text-white p-2 rounded">
        {loading ? "Responding..." : "Respond to Call"}
      </button>
    </div>
  );
}
