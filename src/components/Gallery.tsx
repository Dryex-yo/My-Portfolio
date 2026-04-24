import { useRef, useState, useCallback } from "react";
import gallery0 from"@/assets/gallery/tech7.jpg"
import gallery1 from "@/assets/gallery/tech2.jpeg"
import gallery2 from"@/assets/gallery/tech6.jpeg"
import gallery3 from"@/assets/gallery/tech4.jpeg"
import gallery4 from"@/assets/gallery/tech5.jpeg"

const galleryItems = [
  { src: gallery0, caption: "" },
  { src: gallery1, caption: "" },
  { src: gallery2, caption: "" },
  { src: gallery3, caption: "" },
  { src: gallery4, caption: "" },
 
];

const Gallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft ?? 0));
    setScrollLeft(scrollRef.current?.scrollLeft ?? 0);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !scrollRef.current) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 1.5;
      scrollRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft]
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  return (
   <>
      <div className="container mb-8 md:mb-12">
        <h2 className="text-3xl font-semibold tracking-tight">
          Gallery
        </h2>
        <p className="mt-2 text-muted-foreground">
         A collection of my tech journey.
        </p>
      </div>

      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`flex gap-5 md:gap-6 overflow-x-auto px-[max(1rem,calc((100vw-1400px)/2+2rem))] pb-6 scrollbar-thin snap-x snap-mandatory ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
        style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
      >
        {galleryItems.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 snap-start w-[280px] sm:w-[340px] md:w-[400px] group"
          >
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow duration-300 group-hover:shadow-md">
              <img
                src={item.src}
                alt={item.caption}
                width={800}
                height={600}
                loading="lazy"
                draggable={false}
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="mt-3 text-sm font-medium text-foreground/80 pl-1">
              {item.caption}
            </p>
          </div>
        ))}
      </div>
      </>
  );
};

export default Gallery;
