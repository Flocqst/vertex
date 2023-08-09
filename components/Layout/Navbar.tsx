import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ModeToggle } from "./ModeToggle";


function Navbar() {
    return (
    <nav className="fixed top-0 z-30 flex-no-wrap relative flex w-full items-center justify-between bg-orange-100 px-6 py-3">
        <div className="flex w-full flex-wrap items-center justify-between px-4">
            <ul className="list-style-none mr-auto flex flex-col pl-0 lg:flex-row">
                <li className="mb-4 lg:mb-0 lg:pr-8">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/vertex.svg" alt="logo" width={30} height={30} />
                        <p className="font-mono text-slate-900 max-xs:hidden">Vertex</p>
                    </Link>
                </li>
                <li className="mb-4 lg:mb-0 lg:pr-4">
                    <Link href="/overview" className="flex items-center gap-2">
                        <p className="text-neutral-600 transition duration-200 hover:text-neutral-900 hover:ease-in-out focus:text-neutral-600 motion-reduce:transition-none">Overview</p>
                    </Link>
                </li>
                <li className="mb-4 lg:mb-0 lg:pr-4">
                    <Link href="/futures" className="flex items-center gap-2">
                        <p className="text-neutral-600 transition duration-200 hover:text-neutral-900 hover:ease-in-out focus:text-neutral-600 motion-reduce:transition-none">Futures</p>
                    </Link>
                </li>
                <li className="mb-4 lg:mb-0 lg:pr-4">
                    <Link href="/docs" className="flex items-center gap-2">
                        <p className="text-neutral-600 transition duration-200 hover:text-neutral-900 hover:ease-in-out focus:text-neutral-600 motion-reduce:transition-none">Docs</p>
                    </Link>
                </li>
            </ul>

        </div>
        <div className="relative flex items-center">
            <ConnectButton/>
            <ModeToggle/>
        </div>
    </nav>
    )
}

export default Navbar;
