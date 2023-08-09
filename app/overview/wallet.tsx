'use client';

import React from 'react';
import { useAccount, useBalance } from "wagmi";


export default function Wallet() {
    const { address, isConnected } = useAccount();
    const { data, isError, isLoading } = useBalance({
        address: address,
      })
     
    if (isLoading) return <div>Fetching balance…</div>
    if (isError) return <div>Error fetching balance</div>
    return (
        <div>
            {!isConnected
                ? <div>
                    <label className="text-zinc-400 block mb-2">No Wallet Connected</label>
                </div>
                : <div>
                    <label className="text-zinc-400 block mb-2">Wallet Address Connected</label>
                    <code className="bg-zinc-700 text-zinc-200 p-4 rounded block mb-4"><pre>{address}</pre></code>
                    <div>
                        Balance: {data?.formatted} {data?.symbol}
                    </div>
                </div>}
        </div>
    );
};
