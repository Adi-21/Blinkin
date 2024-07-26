import { useState, useEffect } from "react";
import { useWallet } from "./WalletAdapter";
import { initiateCall } from '../utils/program';

export default function InitiateEvent() {
    const [recipient, setRecipient] = useState("");
    const [tiplink, setTiplink] = useState("");
    const [loading, setLoading] = useState(false);
    const wallet = useWallet();

    useEffect(() => {
        if (wallet.connected && wallet.publicKey) {
            setRecipient(wallet.publicKey);
        }
    }, [wallet.connected, wallet.publicKey]);

    const initiateCallHandler = async () => {
        setLoading(true);
        try {
            if (!recipient) {
                console.log('Recipient is undefined');
                return;
            }
            const callData = await initiateCall(recipient, tiplink);
            console.log('Storing callData:', callData);
            window.localStorage.setItem('callData', JSON.stringify(callData));
            console.log('Call initiated successfully with callData:', callData);
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
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Recipient Public Key"
                className="border p-2 mb-4 w-full text-black font-black"
                readOnly
            />
            <input
                type="text"
                value={tiplink}
                onChange={(e) => setTiplink(e.target.value)}
                placeholder="Recipient Tiplink (Email)"
                className="border p-2 mb-4 w-full text-black font-black"
            />
            <button onClick={initiateCallHandler} disabled={loading} className="bg-blue-500 text-white p-2 rounded">
                {loading ? 'Initiating...' : 'Initiate Call'}
            </button>
        </div>
    );
}
