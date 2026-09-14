import c1 from "@/assets/certificates/cert1.jpg";
import c2 from "@/assets/certificates/cert2.png";
import c3 from "@/assets/certificates/cert3.png";

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
      { id: "c1", title: "Responsive Web Design", issueDate: "Jan 2026", image: c1 },
    ],
  },
  {
    id: "kariermu",
    issuer: "Karier.mu",
    color: "142 71% 45%",
    certificates: [
      {
        id: "c2",
        title: "Manajemen Karyawan bagi Staf Sumber Daya Manusia",
        issueDate: "Okt 2023",
        image: c2,
      },
    ],
  },
  {
    id: "disnaker",
    issuer: "Disnakertrans",
    color: "38 92% 50%",
    certificates: [
      {
        id: "c3",
        title: "Sertifikat Kompetensi — Teknik Kendaraan Ringan",
        issueDate: "Mar 2017",
        image: c3,
      },
    ],
  },
];