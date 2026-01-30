"use client";

import { useCart } from "@/hooks/use-cart";
import { useEffect } from "react";

export default function ClearCart() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Only clear once when the component mounts
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null; // This component is invisible
}