'use client';

import React from 'react';
import { useAccount, useBalance, useContractRead, useContractReads, useNetwork } from "wagmi";
import { DataTable } from './data-table';
import { Balance, columns } from './columns';
import { aggregatorV3InterfaceABI } from '../../constants/abis/aggregatorV3Interface'
import { ADDRESSES } from '../../constants/address'

function getWalletBalances(ethPriceFeed: any, ethBalance: any, opPriceFeed: any, opBalance: any, sUsdPriceFeed: any, sUsdBalance: any): Balance[] {
    return [
      {
        market: "Ethereum",
        amount: ethBalance?.data?.formatted,
        value: Number(ethPriceFeed?.data?.[1]?.result?.[1]?.valueOf()) / Math.pow(10, ethPriceFeed?.data?.[0]?.result),
      },
      {
        market: "Optimism",
        amount: opBalance?.data?.formatted,
        value: Number(opPriceFeed?.data?.[1]?.result?.[1]?.valueOf()) / Math.pow(10, opPriceFeed?.data?.[0]?.result),
      },
      {
        market: "Synthetic USD",
        amount: sUsdBalance?.data?.formatted,
        value: Number(sUsdPriceFeed?.data?.[1]?.result?.[1]?.valueOf()) / Math.pow(10, sUsdPriceFeed?.data?.[0]?.result),
      },
    ]
  }

export default function Wallet() {
    const { address, isConnected } = useAccount();
    const { chain, chains } = useNetwork()
    const ethBalance = useBalance({
        address: address,
      })

    const opBalance = useBalance({
        address: address,
        token: "0x4200000000000000000000000000000000000042",
      })
    const sUsdBalance = useBalance({
        address: address,
        token: "0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9",
      })

    const ethPriceFeed = useContractReads({
      contracts: [
        {
          address: ADDRESSES.ChainLinkETHUSD[chain?.id as number],
          abi: aggregatorV3InterfaceABI,
          functionName: 'decimals',
        },
        {
          address: ADDRESSES.ChainLinkETHUSD[chain?.id as number],
          abi: aggregatorV3InterfaceABI,
          functionName: 'latestRoundData',
        },
      ],
    })

    const opPriceFeed = useContractReads({
      contracts: [
        {
          address: ADDRESSES.ChainLinkOPUSD[chain?.id as number],
          abi: aggregatorV3InterfaceABI,
          functionName: 'decimals',
        },
        {
          address: ADDRESSES.ChainLinkOPUSD[chain?.id as number],
          abi: aggregatorV3InterfaceABI,
          functionName: 'latestRoundData',
        },
      ],
    })

    const sUsdPriceFeed = useContractReads({
      contracts: [
        {
          address: ADDRESSES.ChainLinkSUSDUSD[chain?.id as number],
          abi: aggregatorV3InterfaceABI,
          functionName: 'decimals',
        },
        {
          address: ADDRESSES.ChainLinkSUSDUSD[chain?.id as number],
          abi: aggregatorV3InterfaceABI,
          functionName: 'latestRoundData',
        },
      ],
    })
    
    const colData = getWalletBalances(ethPriceFeed, ethBalance, opPriceFeed, opBalance, sUsdPriceFeed, sUsdBalance)
     
    if (ethBalance?.isError) return <div>Error fetching balance</div>
    return (
        <div>
            {!isConnected
                ? <div>
                    <label className="text-zinc-400 block mb-2">No Wallet Connected</label>
                </div>
                : <div>
                    <label className="text-zinc-400 block mb-2">Wallet Address</label>
                    <code className="bg-zinc-700 text-zinc-200 p-4 rounded block mb-4"><pre>{address}</pre></code>
                    <DataTable columns={columns} data={colData} />
                </div>}
        </div>
    );
};
