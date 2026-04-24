import c1 from "@/assets/certificates/cert1.jpg";

export interface Certificate {
  id: string;
  title: string;
  issueDate: string;
  image: string;
}

export interface CertificateAlbum {
  id: string;
  issuer: string;
  color: string;
  certificates: Certificate[];
}

export const certificateAlbums: CertificateAlbum[] = [
  {
    id: "freeCodeCamp",
    issuer: "freeCodeCamp",
    color: "217 91% 60%",
    certificates: [
      { id: "c1", title: "Responsive Web Design", issueDate: "Aug 2025", image: c1 }
    ],
  }
];
