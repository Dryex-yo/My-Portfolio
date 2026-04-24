import { useEffect, useState } from "react";

interface TypewriterProps {
  words: string[];
  typingSpeed?: number; // ms per char
  pauseTime?: number; // ms at end
}

export function Typewriter({ words, typingSpeed = 80, pauseTime = 1200 }: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];

    if (!deleting && subIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pauseTime);
      return () => clearTimeout(t);
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((s) => s + (deleting ? -1 : 1));
    }, deleting ? typingSpeed / 2 : typingSpeed);

    return () => clearTimeout(timeout);
  }, [words, index, subIndex, deleting, typingSpeed, pauseTime]);

  const text = words[index % words.length].substring(0, subIndex);

  return (
    <span className="after:inline-block after:w-0.5 after:h-5 after:bg-primary after:ml-1 after:align-middle after:animate-pulse">
      {text}
    </span>
  );
}
