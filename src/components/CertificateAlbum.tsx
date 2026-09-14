import { motion, AnimatePresence } from "framer-motion";
import { Award } from "lucide-react";
import type { CertificateAlbum as AlbumType } from "@/data/certificates";

interface Props {
  album: AlbumType;
  isOpen: boolean;
  onToggle: () => void;
  certificateLabel?: string;
  certificatesLabel?: string;
  noPreviewLabel?: string;
}

const CertificateAlbum = ({
  album,
  isOpen,
  onToggle,
  certificateLabel = "Certificate",
  certificatesLabel = "Certificates",
  noPreviewLabel = "No Preview",
}: Props) => {
  // Safe Fallback jika certificates kosong
  const certificates = album.certificates || [];
  const coverImage = certificates[0]?.image || "";
  const stackImages = certificates.slice(1, 3);

  return (
    <div className="w-full">
      {/* Album Card - Stacked Look */}
      <button
        type="button"
        onClick={onToggle}
        className="relative w-full cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl text-left"
        aria-expanded={isOpen}
      >
        {/* Stacked layers behind */}
        {!isOpen &&
          stackImages.map((cert, i) => (
            <div
              key={cert.id}
              className="absolute inset-0 rounded-xl bg-card border border-border overflow-hidden"
              style={{
                transform: `rotate(${(i + 1) * (i % 2 === 0 ? 2.5 : -2)}deg) translateY(${(i + 1) * -4}px)`,
                zIndex: stackImages.length - i,
                opacity: 0.6 + i * 0.15,
              }}
            >
              <img
                src={cert.image}
                alt=""
                className="w-full h-full object-cover opacity-40"
              />
            </div>
          ))}

        {/* Main cover card */}
        <motion.div
          className="relative z-10 rounded-xl bg-card border border-border overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className="aspect-[4/3] overflow-hidden bg-muted">
            {coverImage ? (
              <img
                src={coverImage}
                alt={`${album.issuer} certificate`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                {noPreviewLabel}
              </div>
            )}
          </div>

          {/* Album info overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" style={{ color: `hsl(${album.color})` }} />
                <h3
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {album.issuer}
                </h3>
              </div>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: `hsl(${album.color})` }}
              >
                {certificates.length} {certificates.length === 1 ? certificateLabel : certificatesLabel}
              </span>
            </div>
          </div>
        </motion.div>
      </button>

      {/* Expanded certificates grid */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ delay: index * 0.08, type: "spring", stiffness: 350, damping: 25 }}
                  className="rounded-lg bg-card border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group/cert"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover/cert:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <p
                      className="text-sm font-medium text-foreground"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {cert.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{cert.issueDate}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CertificateAlbum;