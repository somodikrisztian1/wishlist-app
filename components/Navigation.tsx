"use client";

import Link from "next/link";
import { useWishlistStore } from "@/store/wishlistStore";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [mounted, setMounted] = useState(false);
  const items = useWishlistStore((state) => state.items);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="shrink-0">
            <Link href="/" className="text-xl font-bold text-zinc-900">
              Wishlist App
            </Link>
          </div>
          <div className="flex space-x-1 md:space-x-5 lg:space-x-8">
            <Link
              href="/"
              className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-900"
            >
              Products
            </Link>
            <Link
              href="/wishlist"
              className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-900"
            >
              Wishlist {mounted && items.length > 0 && `(${items.length})`}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
