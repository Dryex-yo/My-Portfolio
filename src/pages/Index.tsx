import profileImg from "@/assets/profile.jpg";
import s1 from "@/assets/skills/html.jpg"
import s2 from "@/assets/skills/css.jpg";
import s3 from "@/assets/skills/javascript.png";
import s4 from "@/assets/skills/tailwind.jpg";
import s5 from "@/assets/skills/react.jpg";
import s6 from "@/assets/skills/typescript.png";
import s7 from "@/assets/skills/next.png";
import s8 from "@/assets/skills/nodejs.jpg";
import s9 from "@/assets/skills/express.jpg";
import s10 from "@/assets/skills/mysql.jpg";
import s11 from "@/assets/skills/mongo.png";
import s12 from "@/assets/skills/git.png";
import s13 from "@/assets/skills/supabase.jpg";
import s14 from "@/assets/skills/docker.png";
import s15 from "@/assets/skills/postgre.png";
import s16 from "@/assets/skills/Laravel.png";
import p1 from "@/assets/projects/project-1.jpg";
import p2 from "@/assets/projects/project-2.jpg";
import p3 from "@/assets/projects/project-3.jpg";
import nabatiLogo from "@/assets/workexperience/nabati.png";
import metaLogo from "@/assets/workexperience/meta.png";
import dapodikLogo from "@/assets/workexperience/dapodik.png";
import resumeID from "@/assets/CV_Dery_Supriyadi_ID.pdf";
import resumeEN from "@/assets/CV_Dery_Supriyadi_EN.pdf";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useInView } from "@/hooks/use-in-view";
import { Typewriter } from "@/components/Typewriter";
import { Linkedin, Github, SquareArrowOutUpRightIcon, Download, Copy, Send } from "lucide-react";
import { FormEvent, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import "@/App.css";
import { LoadingScreen } from "@/components/LoadingScreen";
import CertificateAlbum from "@/components/CertificateAlbum";
import { certificateAlbums } from "@/data/certificates";

interface IndexProps {
  lang?: "ID" | "EN";
  onLangChange?: (lang: "ID" | "EN") => void;
}

const translations = {
  ID: {
    portraitAlt: "Potret Dery Supriyadi",
    greeting: "Hai, saya Dery Supriyadi",
    introduction: "Full-stack Developer dan lulusan Manajemen (IPK 3,38/4,00) yang berorientasi pada hasil, dengan pengalaman langsung dalam pengembangan web full-stack (VILT Stack: Vite, Inertia.js, Laravel, React/Tailwind CSS), performance marketing, dan operasional digital. Berpengalaman membangun aplikasi yang scalable, mengelola kampanye iklan berskala besar di Meta, Google, dan TikTok Ads, serta menangani sistem database pendidikan nasional. Menggabungkan keahlian manajemen strategis dengan kemampuan software engineering untuk menghasilkan solusi teknologi yang berkinerja tinggi dan selaras dengan kebutuhan bisnis.",
    rolePrefix: "Saya seorang",
    roles: ["Pengembang Web Full-Stack",
    "Spesialis VILT Stack",
    "Pengembang Laravel & React",
    "Spesialis Performance Marketing",
    "Profesional Manajemen & Operasional",
    "Pengembang Aplikasi Real-time"],
    viewProjects: "Lihat Proyek",
    viewExperience: "Lihat Pengalaman",
    downloadCv: "Unduh CV",
    projects: "Proyek",
    projectsDescription: "Studi kasus dan eksperimen pilihan.",
    githubRepo: "Repo Github",
    liveDemo: "Demo Langsung",
    workExperience: "Pengalaman Kerja",
    workDescription: "Perjalanan profesional dan pencapaian utama saya.",
    certifications: "Sertifikasi",
    certificate: "Sertifikat",
    certificates: "Sertifikat",
    noPreview: "Pratinjau Tidak Tersedia",
    certificationDescription: (total: number, platforms: number) => `${total} sertifikat dari ${platforms} platform - pilihan dari proses belajar yang berkelanjutan.`,
    contact: "Kontak",
    contactDescription: "Terbuka untuk tantangan baru, peran teknis, dan berbagai peluang karier. Mari terhubung!",
    email: "Email",
    message: "Pesan",
    messagePlaceholder: "Ceritakan peluang, proyek, atau posisi yang ingin Anda isi...",
    sending: "Mengirim...",
    sendMessage: "Kirim Pesan",
    directEmail: "Atau hubungi saya langsung:",
    copyEmail: "Salin Email",
    messageSent: "Pesan berhasil dikirim!",
    messageFailed: "Pesan gagal dikirim. Silakan coba lagi.",
    emailCopied: "Email disalin ke clipboard!",
    projectsList: [
      { title: "DryShop - Ekosistem E-commerce Modern", desc: "Platform e-commerce full-stack yang dibangun dengan VILT stack. Menghadirkan pengalaman single-page application dengan pemrosesan pembayaran yang aman, manajemen inventaris real-time, dan keranjang belanja dinamis melalui backend Laravel serta frontend React yang reaktif." },
      { title: "CareerPath - Portal Pencarian dan Filter Lowongan", desc: "Aplikasi pencarian kerja dengan fokus pada filtering cepat dan pencarian karier yang mulus. Pengguna dapat memfilter lowongan berdasarkan kategori, tipe, dan lokasi dengan pembaruan real-time." },
      { title: "WhatsApp Clone - Aplikasi UI Chat Real-time", desc: "Antarmuka chat bergaya WhatsApp dengan UI modern, desain responsif, dan layout pesan interaktif. Dibuat untuk mempelajari pengembangan frontend dan penyusunan UI." },
    ],
    experience: [
      { role: "Production Helper", period: "Mei 2025 - Des 2025", desc: "Mengoperasikan mesin produksi berkecepatan tinggi dengan mematuhi standar keselamatan (K3) dan kualitas produk. Berkontribusi pada pengelolaan alur kerja yang efisien di lingkungan manufaktur yang cepat." },
      { role: "Social Media Advertising", period: "Jan 2021 - Apr 2025", desc: "Mengelola kampanye iklan berskala besar di Meta Ads, Google Ads, dan TikTok Ads. Menggunakan analitik data untuk mengoptimalkan belanja iklan dan menyempurnakan segmentasi audiens." },
      { role: "Operator / Admin Sekolah", period: "Jan 2018 - Feb 2020", desc: "Mengelola sistem informasi pendidikan nasional (Dapodik) untuk administrasi sekolah. Mengoordinasikan surat resmi dan pelaporan digital untuk dinas pendidikan kabupaten." },
    ],
  },
  EN: {
    portraitAlt: "Portrait of Dery Supriyadi",
    greeting: "Hi, I'm Dery Supriyadi",
    introduction: "A results-driven Full-stack Developer and Management graduate (GPA 3.38/4.00) with hands-on experience in full-stack web development (VILT Stack: Vite, Inertia.js, Laravel, React/Tailwind CSS), performance marketing, and digital operations. Proven track record in building scalable applications, managing large-scale ad campaigns across Meta, Google, and TikTok Ads, and handling national educational database systems. Combines strategic management expertise with practical software engineering to deliver high-performing, business-aligned tech solutions.",
    rolePrefix: "I'm a",
    roles: ["Full-Stack Web Developer",
    "VILT Stack Specialist",
    "Laravel & React Developer",
    "Performance Marketing Specialist",
    "Management & Operations Professional",
    "Real-time App Developer"],
    viewProjects: "View Projects",
    viewExperience: "View Experience",
    downloadCv: "Download CV",
    projects: "Projects",
    projectsDescription: "Selected case studies and experiments.",
    githubRepo: "Github Repo",
    liveDemo: "Live Demo",
    workExperience: "Work Experience",
    workDescription: "My professional journey and key accomplishments.",
    certifications: "Certifications",
    certificate: "Certificate",
    certificates: "Certificates",
    noPreview: "No Preview",
    certificationDescription: (total: number, platforms: number) => `${total} certificates across ${platforms} platforms - highlights from ongoing learning.`,
    contact: "Contact",
    contactDescription: "Open to new challenges, technical roles, and diverse career opportunities. Let's connect!",
    email: "Email",
    message: "Message",
    messagePlaceholder: "Tell me about the opportunity, project, or role you're looking to fill...",
    sending: "Sending...",
    sendMessage: "Send Message",
    directEmail: "Or reach out directly:",
    copyEmail: "Copy Email",
    messageSent: "Message sent successfully!",
    messageFailed: "Failed to send message. Please try again.",
    emailCopied: "Email copied to clipboard!",
    projectsList: [
      { title: "DryShop - Modern E-commerce Ecosystem", desc: "A sophisticated full-stack e-commerce platform built with the VILT stack. Featuring a seamless single-page application experience, it integrates secure payment processing, real-time inventory management, and a dynamic shopping cart system through a Laravel backend and reactive React frontend." },
      { title: "CareerPath - Job Search & Filtering Portal", desc: "A dynamic job search application focused on high-speed filtering and seamless career discovery. Users can filter opportunities by category, type, and location with real-time updates for a smooth and responsive experience." },
      { title: "WhatsApp Clone - Real-time Chat UI Application", desc: "A WhatsApp-inspired chat interface with a modern UI, responsive design, and interactive messaging layout. Designed to replicate a core messaging experience for learning frontend development and UI structuring." },
    ],
    experience: [
      { role: "Production Helper", period: "May 2025 - Dec 2025", desc: "Operated high-speed production machinery while adhering strictly to safety (K3) and product quality standards. Contributed to efficient workflow management in a fast-paced manufacturing environment." },
      { role: "Social Media Advertising", period: "Jan 2021 - Apr 2025", desc: "Managed large-scale ad campaigns across Meta Ads, Google Ads, and TikTok Ads. Utilized data analytics to optimize ad spend and refine target audience segmentation." },
      { role: "School Operator / Admin", period: "Jan 2018 - Feb 2020", desc: "Managed the national educational information system (Dapodik) for school administration. Coordinated official correspondence and digital reporting for district education offices." },
    ],
  },
} as const;

const Section = ({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section id={id} ref={ref} className={`container px-4 py-20 scroll-mt-24 ${className} ${inView ? "animate-fade-in" : "opacity-0"}`}>
      {children}
    </section>
  );
};

export default function Index({ lang: externalLang = "ID", onLangChange }: IndexProps) {
  const [sending, setSending] = useState(false);
  const [lang, setLang] = useState<"ID" | "EN">(externalLang);
  useEffect(() => {
    if (externalLang) {
      setLang(externalLang);
    }
  }, [externalLang]);

  const t = translations[lang];

  const currentResume = lang === "ID" ? resumeID : resumeEN;
  const fileName = `CV_Dery_Supriyadi_${lang}.pdf`;

  const [openAlbumId, setOpenAlbumId] = useState<string | null>(null);
 
  // Toggle certificate album open/close
const handleToggle = (albumId: string) => {
  setOpenAlbumId((prev) => (prev === albumId ? null : albumId));
};
 
const totalCerts = certificateAlbums.reduce(
  (sum, a) => sum + a.certificates.length,
  0
);

  /* Email submission via Web3Forms */
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    if (!email || !message) return;

    setSending(true);

    // Buat FormData untuk dikirim ke Web3Forms
    const formData = new FormData();
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "cb642a2f-7661-4343-9d05-789d22aa18d2");
    formData.append("email", email);
    formData.append("message", message);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to send message");
      }

      toast({ title: t.messageSent });
      form.reset();
    } catch (error) {
      console.error(error);
      toast({ title: t.messageFailed });
    } finally {
      setSending(false);
    }
  };

  const skills = [
  { src: s1, alt: "html", name: "HTML" },
  { src: s2, alt: "css", name: "CSS" },
  { src: s3, alt: "js", name: "JavaScript" },
  { src: s4, alt: "tailwind", name: "Tailwind CSS" },
  { src: s5, alt: "react", name: "React" },
  { src: s6, alt: "ts", name: "TypeScript" },
  { src: s7, alt: "next", name: "Next.js" },
  { src: s8, alt: "node", name: "Node.js" },
  { src: s9, alt: "express", name: "Express" },
  { src: s10, alt: "mysql", name: "MySQL" },
  { src: s11, alt: "mongodb", name: "MongoDB" },
  { src: s12, alt: "git", name: "Git" },
  { src: s13, alt: "supabase", name: "Supabase" },
  { src: s14, alt: "docker", name: "Docker" },
  { src: s15, alt: "postgre", name: "PostgreSQL" },
  { src: s16, alt: "laravel", name: "Laravel" }
];
const duplicatedSkills = [...skills, ...skills];
  return (
    <>
    <LoadingScreen/>
    <main>
      {/* Hero / About */}
      <Section id="about" className="pt-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

           <div 
            className="relative mx-auto w-56 h-56 md:w-72 md:h-72"
            style={{ perspective: "1000px" }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              
              const rotateX = ((y - centerY) / centerY) * -10;
              const rotateY = ((x - centerX) / centerX) * 10;
              
              const inner = e.currentTarget.querySelector('.tilt-inner') as HTMLElement;
              if (inner) {
                inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
              }
            }}
            onMouseLeave={(e) => {
              const inner = e.currentTarget.querySelector('.tilt-inner') as HTMLElement;
              if (inner) {
                inner.style.transform = 'rotateX(0deg) rotateY(0deg)';
              }
            }}
          >
            <div 
              className="tilt-inner relative w-full h-full transition-transform duration-200 ease-out"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute -inset-6 rounded-full bg-primary/10 blur-2xl" aria-hidden></div>
              <img
                src={profileImg}
                alt={t.portraitAlt}
                loading="lazy"
                className="relative rounded-full object-cover w-full h-full shadow-xl animate-float"
              />
              <span className="absolute right-4 bottom-5 h-5 w-5 rounded-full bg-green-500 ring-4 ring-background" aria-label="Active"></span>
            </div>
          </div>
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
             {t.greeting}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {t.introduction}
            </p>
            <br></br>
            <div className="skills-wrapper">
      <div className="skills">
         {duplicatedSkills.map((skill, index) => (
                <div key={index} className="relative group inline-block">
                  <img 
                    src={skill.src} 
                    alt={skill.alt}
                    className="transition-transform"
                  />
                  <span className="absolute left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {skill.name}
                  </span>
                </div>
              ))}
      </div>
    </div>
            <p className="mt-8 text-xl">
              <span className="text-muted-foreground">{t.rolePrefix} </span>
              <span className="font-medium text-primary">
                <Typewriter words={[...t.roles]} />
              </span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects"><Button>{t.viewProjects}</Button></a>
              <a href="#workexperience"><Button>{t.viewExperience}</Button></a>
              <div className="inline-flex items-center rounded-md border border-input bg-background text-sm font-medium hover:bg-accent hover:text-accent-foreground">
              <a href={currentResume} download={fileName} className="flex items-center px-4 py-2">
                <Download className="h-4 w-4 mr-2" />
                {t.downloadCv}
              </a>
              <select 
                value={lang} 
                onChange={(e) => {
                  const newLang = e.target.value as "ID" | "EN";
                  setLang(newLang);
                  if (onLangChange) onLangChange(newLang); 
                }}
                className="bg-transparent pr-3 py-2 text-xs font-semibold cursor-pointer outline-none border-l border-input"
              >
                <option value="ID">ID</option>
                <option value="EN">EN</option>
              </select>
            </div>  
              <a href="https://github.com/Dryex-yo"><Button><Github/>Github</Button></a>
              <a href="https://www.linkedin.com/in/dery-supriyadi/"><Button variant="outline"><Linkedin />LinkedIn</Button></a>
            </div>
          </div>

       
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects">
        <header className="mb-8">
          <h2 className="text-3xl font-semibold tracking-tight">{t.projects}</h2>
          <p className="text-muted-foreground mt-2">{t.projectsDescription}</p>
        </header>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[{img:p1,title:t.projectsList[0].title, desc:t.projectsList[0].desc, glink:"https://github.com/Dryex-yo/Modern-Ecommerce-Laravel-React-Inertia", llink:"", tech:["Laravel", "React.js", "Inertia.js", "Tailwind CSS", "MySQL"]},
          {img:p2,title:t.projectsList[1].title, desc:t.projectsList[1].desc, glink:"https://github.com/Dryex-yo/search-job-app", llink:"", tech: ["Vue.js", "Inertia.js", "Laravel", "Tailwind CSS", "MySQL"]},
          {img:p3,title:t.projectsList[2].title, desc:t.projectsList[2].desc,glink:"https://github.com/Dryex-yo/whatsapp-clone",llink:"",tech:["React.js","CSS","TypeScript","laravel","Tailwind CSS","Inertia.js","PostgreSQL"]},
        ].map((p, i) => (

            <Card key={i} className="overflow-hidden transition-transform hover:scale-[1.02]">
              <CardContent className="p-0">
                <img src={p.img} alt={`${p.title} preview`} loading="lazy" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-medium">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                  <div className="mt-1 flex flex-wrap justify-center items-center gap-2">
                  {p.tech?.map((value, i)=>(
                  <span key={i} className="text-muted-foreground px-2 py-1 text-xs bg-secondary rounded-lg">{value}</span>
                  ))}
                  </div>
                  <br></br>
                  <div className="flex justify-center items-center gap-2">
                  <a href={p.glink}><Button variant="outline" className="text-muted-foreground"><Github/>{t.githubRepo}</Button></a>
                  {p.llink && <a href={p.llink}><Button variant="outline" className="text-muted-foreground"><SquareArrowOutUpRightIcon/>{t.liveDemo}</Button></a> }
                </div>                
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

            {/* workexprience */}
      <Section id="workexperience">
        <header className="mb-8">
          <h2 className="text-3xl font-semibold tracking-tight">{t.workExperience}</h2>
          <p className="text-muted-foreground mt-2">{t.workDescription}</p>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[{
            img: nabatiLogo,
            company: "PT Kaldu Sari Nabati Indonesia",
            role: t.experience[0].role,
            period: t.experience[0].period,
            desc: t.experience[0].desc,
            skills: ["Quality Control (QC)", "Workplace Safety (K3)", "GMP", "Workflow Management"]
          },
          {
            img: metaLogo,
            company: "CV Media Data Putra",
            role: t.experience[1].role,
            period: t.experience[1].period,
            desc: t.experience[1].desc,
            skills: ["Performance Marketing", "Meta Ads", "Google Ads", "TikTok Ads", "Budget Optimization"]
          },
          {
            img: dapodikLogo,
            company: "SDN 008 Malinau Kota",
            role: t.experience[2].role,
            period: t.experience[2].period,
            desc: t.experience[2].desc,
            skills: ["Dapodik System", "Database Management", "Data Verification", "Digital Records"]
          },
        ].map((p, i) => (

            <Card key={i} className="overflow-hidden transition-transform hover:scale-[1.02]">
              <CardContent className="p-0">
                {/* Container Logo dengan Background dan Object Contain agar Logo Utuh */}
                <div className="w-full h-36 bg-muted/30 p-6 flex items-center justify-center border-b">
                  <img 
                    src={p.img} 
                    alt={`${p.company} logo`} 
                    loading="lazy" 
                    className="max-h-full max-w-full object-contain" 
                  />
                </div>

                <div className="p-5 text-center">
                  {/* Nama Perusahaan & Role */}
                  <h3 className="font-semibold text-lg">{p.role}</h3>
                  <p className="text-sm font-medium text-primary mt-0.5">{p.company}</p>
                  
                  {/* Periode Kerja */}
                  <p className="text-xs text-muted-foreground mt-1 font-mono">{p.period}</p>

                  {/* Deskripsi */}
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{p.desc}</p>

                  {/* List Skill Badges */}
                  <div className="mt-4 flex flex-wrap justify-center items-center gap-1.5">
                    {p.skills?.map((value, idx) => (
                      <span 
                        key={idx} 
                        className="text-muted-foreground px-2.5 py-1 text-xs bg-secondary rounded-md border"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Certifications */}
      <Section id="certifications">
  <header className="mb-8">
      <h2 className="text-3xl font-semibold tracking-tight">{t.certifications}</h2>
    <p className="text-muted-foreground mt-2">
      {t.certificationDescription(totalCerts, certificateAlbums.length)}
    </p>
  </header>
 
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
    {certificateAlbums.map((album) => (
      <CertificateAlbum
        key={album.id}
        album={album}
        isOpen={openAlbumId === album.id}
        onToggle={() => handleToggle(album.id)}
        certificateLabel={t.certificate}
        certificatesLabel={t.certificates}
        noPreviewLabel={t.noPreview}
      />
    ))}
  </div>
</Section>

      {/* Gallery */}
      {/* <Section id="gallery">
        <Gallery />
      </Section> */}

     {/* Contact */}
      <Section id="contact">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">{t.contact}</h2>
          <p className="text-muted-foreground mt-2">
            {t.contactDescription}
          </p>
        </header>

        <div className="max-w-xl mx-auto space-y-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                {t.email}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@gmail.com"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium">
                {t.message}
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder={t.messagePlaceholder}
                rows={5}
                required
              />
            </div>

            <Button type="submit" disabled={sending} className="w-full gap-2">
              <Send className="w-4 h-4" />
              {sending ? t.sending : t.sendMessage}
            </Button>
          </form>

          {/* Direct Email Copy Option */}
          <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
            <span>{t.directEmail}</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText("derysupriyadi1@gmail.com");
                toast({ title: t.emailCopied });
              }}
              className="gap-2"
            >
              <Copy className="w-3.5 h-3.5" />
              {t.copyEmail}
            </Button>
          </div>
        </div>
      </Section>

      <footer className="border-t">
        <div className="container px-4 py-10 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Dery Supriyadi, S.M. All rights reserved.
        </div>
      </footer>
    </main>
    </>
  );
}
