'use client';

import React from 'react';
import { useAccount, useBalance, useContractRead, useContractReads } from "wagmi";
import { DataTable } from './data-table';
import { Balance, columns } from './columns';


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

const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
    name: "getRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const

const chainlinkEthContract = {
  address: "0x13e3Ee699D1909E989722E753853AE30b17e08c5" as `0x${string}`,
  abi: aggregatorV3InterfaceABI,
}

const chainlinkOpContract = {
  address: '0x0D276FC14719f9292D5C1eA2198673d1f4269246' as `0x${string}`,
  abi: aggregatorV3InterfaceABI,
}

const chainlinksUsdContract = {
  address: '0x7f99817d87baD03ea21E05112Ca799d715730efe' as `0x${string}`,
  abi: aggregatorV3InterfaceABI,
}


export default function Wallet() {
    const { address, isConnected } = useAccount();

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
          ...chainlinkEthContract,
          functionName: 'decimals',
        },
        {
          ...chainlinkEthContract,
          functionName: 'latestRoundData',
        },
      ],
    })

    const opPriceFeed = useContractReads({
      contracts: [
        {
          ...chainlinkOpContract,
          functionName: 'decimals',
        },
        {
          ...chainlinkOpContract,
          functionName: 'latestRoundData',
        },
      ],
    })

    const sUsdPriceFeed = useContractReads({
      contracts: [
        {
          ...chainlinksUsdContract,
          functionName: 'decimals',
        },
        {
          ...chainlinksUsdContract,
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
