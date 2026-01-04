"use client";

import { useWishlistStore } from "@/store/wishlistStore";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex min-h-100 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-zinc-900" />
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-zinc-100">My Wishlist</h1>
        <div className="flex min-h-100 flex-col items-center justify-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mb-4 h-24 w-24 text-zinc-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h2 className="mb-2 text-2xl font-semibold text-zinc-100">
            Your wishlist is empty
          </h2>
          <p className="mb-6 text-zinc-400">
            Add some products to your wishlist to see them here.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-800"
          >
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-zinc-100">
        My Wishlist ({items.length} {items.length === 1 ? "item" : "items"})
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((product) => (
          <div
            key={product.id}
            className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
          >
            <Link href={`/product/${product.id}`}>
              <div className="relative w-full bg-zinc-50 pt-[100%]">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </Link>
            <div className="flex flex-1 flex-col p-4">
              <Link href={`/product/${product.id}`}>
                <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-zinc-900 hover:text-zinc-700">
                  {product.title}
                </h3>
              </Link>
              <div className="mt-auto">
                <p className="mb-4 text-2xl font-bold text-zinc-900">
                  ${product.price.toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(product.id)}
                  className="w-full cursor-pointer rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition-colors hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
