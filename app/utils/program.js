import { Connection, PublicKey, SystemProgram, SYSVAR_CLOCK_PUBKEY, Keypair } from '@solana/web3.js';
import { AnchorProvider, Program } from '@project-serum/anchor';
import bs58 from 'bs58';
import IDL from './idl.json';
import { PROGRAM_ID } from './constants';

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

const getProvider = () => {
    if (!window.solana) {
        alert('Please install a Solana wallet like Phantom to use this app');
        throw new Error('Solana wallet not found');
    }
    const wallet = window.solana;
    const provider = new AnchorProvider(
        connection,
        wallet,
        { preflightCommitment: 'confirmed' }
    );
    return provider;
};

const isValidBase58 = (str) => {
    try {
        bs58.decode(str);
        return true;
    } catch (e) {
        return false;
    }
};

export const initiateCall = async (recipient, recipientTiplink) => {
    const provider = getProvider();
    const program = new Program(IDL, PROGRAM_ID, provider);

    // Create a new keypair for the call data account
    const callDataAccount = Keypair.generate();

    try {
        const tx = await program.rpc.initiateCall(new PublicKey(recipient), recipientTiplink, {
            accounts: {
                callData: callDataAccount.publicKey,
                clock: SYSVAR_CLOCK_PUBKEY,
                initiator: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            },
            signers: [callDataAccount], // Include the new account as a signer
        });
        console.log(callDataAccount.publicKey);
        console.log('Transaction successful with ID:', tx);
        console.log('Call data account created:', callDataAccount.publicKey.toBase58());
        return callDataAccount.publicKey; // Return the call data account public key
    } catch (err) {
        console.error('Transaction error:', err);
        throw err;
    }
};

export const respondCall = async (callData, recipient) => {
    const provider = getProvider();
    const program = new Program(IDL, PROGRAM_ID, provider);

    try {
        if (!isValidBase58(callData)) {
            throw new Error('callData is missing');
        }
        else if (!isValidBase58(recipient)) {
            throw new Error('recipient is missing');
        }
        const tx = await program.rpc.respondCall({
            accounts: {
                callData: new PublicKey(callData),
                recipient: new PublicKey(recipient),
                systemProgram: SystemProgram.programId,
            },
            signers: [],
        });
        console.log('Transaction successful with ID:', tx);
    } catch (err) {
        console.error('Transaction error:', err);
        throw err;
    }
};
