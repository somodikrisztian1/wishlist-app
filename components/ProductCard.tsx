"use client";

import { Product } from "@/types/product";
import { useWishlistStore } from "@/store/wishlistStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [mounted, setMounted] = useState(false);
  const addItem = useWishlistStore((state) => state.addItem);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const items = useWishlistStore((state) => state.items);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reactively check if item is in wishlist by depending on items array
  const inWishlist = mounted
    ? items.some((item) => item.id === product.id)
    : false;

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Check if item is currently in wishlist
    if (items.some((item) => item.id === product.id)) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
        <div className="relative w-full bg-zinc-50 pt-[100%]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 z-10 cursor-pointer rounded-full bg-white p-2 shadow-md transition-all hover:shadow-lg"
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill={inWishlist ? "#ef4444" : "none"}
              viewBox="0 0 24 24"
              stroke={inWishlist ? "#ef4444" : "#6b7280"}
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-zinc-900">
            {product.title}
          </h3>
          <div className="mt-auto">
            <p className="text-2xl font-bold text-zinc-900">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
