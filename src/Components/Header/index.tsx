"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export type HeaderConfig = {
    title: string;
    color: string;
};

const headerConfigMap: Record<string, HeaderConfig> = {
    "/": { title: "Crypto Price List", color: "#0079ff" },
    "/watch-list": { title: "My Watch List ", color: "#36ae7c" },
    "/watch-list/[id]": { title: "Trade History", color: "#ffcd4b" },
};

const Header: React.FC = () => {
    const path = usePathname();
    const router = useRouter();

    let header = headerConfigMap[path];

    if (!header) {
        if (path.startsWith("/watch-list/")) {
            header = headerConfigMap["/watch-list/[id]"];
        }
    }

    if (!header) {
        header = { title: "Erorr", color: "#cccccc" };
    }


    return (
        <div
            className="w-full flex items-center justify-center text-black h-20 px-4"
            style={{ backgroundColor: header.color }}
        >

            <div>{header.title}</div>
            {path === "/" ? (
                <Link href={`/watch-list`}>
                <button
            className="bg-green-600 hover:bg-green-500 ml-2 text-white font-bold py-2 px-4 rounded cursor-pointer top-5 right-12 fixed">
            Watch list
        </button>
        </Link>
    ):(
        <button
                onClick={() => router.back()}
            className="bg-yellow-500 hover:bg-yellow-400 ml-2 text-white font-bold py-2 px-4 rounded cursor-pointer top-5 right-12 fixed">
            Back
        </button>)}

        </div>
    );
};

export default Header;