import { useState, useEffect } from 'react';
import { respondCall } from '../utils/program';

interface RespondEventProps {
    recipient: string;
}

const RespondEvent: React.FC<RespondEventProps> = ({ recipient }) => {
    const [loading, setLoading] = useState(false);
    const [callData, setCallData] = useState('');

    useEffect(() => {
        // Retrieve callData from local storage when the component mounts
        const storedCallData = window.localStorage.getItem('callData');
        console.log('Retrieved callData:', storedCallData);
        if (storedCallData) {
            setCallData(storedCallData);
        } else {
            console.error('No callData found in local storage');
        }
    }, []);

    const respondToCall = async () => {
        setLoading(true);
        try {
            await respondCall(callData, recipient);
            console.log('Call responded successfully');
        } catch (error) {
            console.error('Failed to respond to call:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4">Respond to Call</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <button
                    onClick={respondToCall}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Respond to {recipient}
                </button>
            )}
        </div>
    );
}

export default RespondEvent;