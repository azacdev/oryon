"use client";

import { useEffect, useState } from "react";

interface CurrencyProps {
  value?: string | number;
}

const Currency = ({ value }: CurrencyProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <span className="font-semibold">NGN {Number(value).toLocaleString()}</span>;

};

export default Currency;
