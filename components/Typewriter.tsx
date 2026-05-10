'use client';

import { useState, useEffect } from 'react';

export const Typewriter = ({ words, delay = 1500 }: { words: string[], delay?: number }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const timeout2 = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (index === words.length) {
      setIndex(0);
      return;
    }

    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), delay); // Wait before deleting
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      },
      reverse ? 50 : 100 + Math.random() * 50 // Typing is slightly random, deleting is fast
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, delay]);

  return (
    <span className="inline-flex items-center min-h-[1.1em]">
      <span>{words[index].substring(0, subIndex)}</span>
      <span
        className={`inline-block w-[3px] md:w-[5px] h-[0.85em] bg-current ml-1 rounded-full transition-opacity duration-100 ${
          blink ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </span>
  );
};
