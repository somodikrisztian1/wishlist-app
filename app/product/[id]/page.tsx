"use client";

import { use, useEffect, useState } from "react";
import { Product } from "@/types/product";
import { useWishlistStore } from "@/store/wishlistStore";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const addItem = useWishlistStore((state) => state.addItem);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const items = useWishlistStore((state) => state.items);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://fakestoreapi.com/products/${resolvedParams.id}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <LoadingSpinner />
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold">
            Error: {error || "Product not found"}
          </p>
          <Link
            href="/"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            ← Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const inWishlist = mounted
    ? items.some((item) => item.id === product.id)
    : false;

  const toggleWishlist = () => {
    // Check if item is currently in wishlist
    if (items.some((item) => item.id === product.id)) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center font-medium text-zinc-100 hover:text-zinc-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Products
      </Link>

      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <div className="grid gap-8 p-8 md:grid-cols-2">
          {/* Image Section */}
          <div className="relative w-full rounded-lg bg-zinc-50 pt-[100%]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-8"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col">
            <div className="mb-4">
              <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700">
                {product.category}
              </span>
            </div>

            <h1 className="mb-4 text-3xl font-bold text-zinc-900">
              {product.title}
            </h1>

            <div className="mb-4 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating.rate)
                        ? "text-yellow-400"
                        : "text-zinc-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-zinc-600">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
            </div>

            <p className="mb-6 text-4xl font-bold text-zinc-900">
              ${product.price.toFixed(2)}
            </p>

            <p className="mb-8 leading-relaxed text-zinc-700">
              {product.description}
            </p>

            <div className="mt-auto">
              <button
                onClick={toggleWishlist}
                className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors ${
                  inWishlist
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-zinc-900 text-white hover:bg-zinc-800"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill={inWishlist ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
