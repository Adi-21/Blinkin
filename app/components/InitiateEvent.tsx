import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { initiateCall } from "../utils/program";
// import { PublicKey } from "@solana/web3.js";

export default function InitiateEvent() {
  const [initiator, setInitiator] = useState("");
  const [recipient, setRecipient] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const wallet = useWallet();

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      setInitiator(wallet.publicKey.toBase58());
    }
  }, [wallet.connected, wallet.publicKey]);

  const initiateCallHandler = async () => {
    setLoading(true);
    try {
      await initiateCall(recipient, email);
      console.log("Call initiated successfully");
    } catch (error) {
      console.error("Failed to initiate call:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Initiate a Call</h1>
      <input
        type="text"
        value={initiator}
        placeholder="Initiator Public Key"
        className="border p-2 mb-4 w-full text-black font-black"
        readOnly
      />
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient Public Key"
        className="border p-2 mb-4 w-full text-black font-black"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Recipient Email"
        className="border p-2 mb-4 w-full text-black font-black"
      />
      {/* <input
        type="text"
        value={"Call Data Address"}
        placeholder="Call Data Address"
        className="border p-2 mb-4 w-full text-black font-black"
        readOnly
      /> */}
      {/* <button onClick={generateCallData} className="bg-gray-500 text-white p-2 rounded">
        Generate Call Data
      </button> */}
      <button onClick={initiateCallHandler} disabled={loading} className="bg-blue-500 text-white p-2 rounded ml-2">
        {loading ? "Initiating..." : "Initiate Call"}
      </button>
    </div>
  );
}
