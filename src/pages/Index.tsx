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
import resume from "@/assets/Dery_Supriyadi_resume.pdf";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useInView } from "@/hooks/use-in-view";
import { Typewriter } from "@/components/Typewriter";
import { Mail, Linkedin, Github, SquareArrowOutUpRightIcon, Download } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "@/hooks/use-toast";
import "@/App.css";
import { LoadingScreen } from "@/components/LoadingScreen";
import CertificateAlbum from "@/components/CertificateAlbum";
import { certificateAlbums } from "@/data/certificates";

const Section = ({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section id={id} ref={ref} className={`container px-4 py-20 scroll-mt-24 ${className} ${inView ? "animate-fade-in" : "opacity-0"}`}>
      {children}
    </section>
  );
};

export default function Index() {
  const [sending, setSending] = useState(false);


  const [openAlbumId, setOpenAlbumId] = useState<string | null>(null);
 
  // Toggle certificate album open/close
const handleToggle = (albumId: string) => {
  setOpenAlbumId((prev) => (prev === albumId ? null : albumId));
};
 
const totalCerts = certificateAlbums.reduce(
  (sum, a) => sum + a.certificates.length,
  0
);

  /* Email submission */
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    if (!email || !message) return;

    setSending(true);

    const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://portfolio-email-backend-production-597d.up.railway.app/";

    try {
      const res = await fetch(
        `${API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, message })
        }
      );

      let data;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        throw new Error(data?.error || "Failed");
      }

      toast({ title: "Message sent successfully!" });
      form.reset();

    } catch (error) {
      console.error(error);
      toast({ title: "Server error or failed request" });
    }

    setSending(false);
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
                alt="Portrait of the UI/UX designer"
                loading="lazy"
                className="relative rounded-full object-cover w-full h-full shadow-xl animate-float"
              />
              <span className="absolute right-4 bottom-5 h-5 w-5 rounded-full bg-green-500 ring-4 ring-background" aria-label="Active"></span>
            </div>
          </div>
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
             Hi, I'm Dery Supriyadi
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
            IT Undergraduate specialized in Full-stack Development. I craft efficient software solutions by blending performance with seamless user experiences. Passionate about problem-solving and modern web architecture.</p>
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
              <span className="text-muted-foreground">I'm a </span>
              <span className="font-medium text-primary">
                <Typewriter words={["VILT Stack Developer","Full-Stack Developer","React Developer"]} />
              </span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects"><Button>View Projects</Button></a>
              <a href={resume} download="dery_supriyadi_resume.pdf"><Button variant="outline"><Download className="h-4 w-4 mr-2"/>Download CV</Button></a>
               <a href="https://github.com/Dryex-yo"><Button><Github/>Github</Button></a>
              <a href="https://www.linkedin.com/in/dery-supriyadi/"><Button variant="outline"><Linkedin />LinkedIn</Button></a>
            </div>
          </div>

       
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects">
        <header className="mb-8">
          <h2 className="text-3xl font-semibold tracking-tight">Projects</h2>
          <p className="text-muted-foreground mt-2">Selected case studies and experiments.</p>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[{img:p1,title:" DryShop — Modern E-commerce Ecosystem", desc: "A sophisticated full-stack e-commerce platform built with the VILT stack. Featuring a seamless single-page application experience, it integrates secure payment processing, real-time inventory management, and a dynamic shopping cart system, all managed through a powerful Laravel backend and a reactive React frontend.", glink:"https://github.com/Dryex-yo/Modern-Ecommerce-Laravel-React-Inertia", llink:"", tech:["Laravel", "React.js", "Inertia.js", "Tailwind CSS", "MySQL"]},
          {img:p2,title:" CareerPath — Job Search & Filtering Portal", desc: "A dynamic job search application focused on high-speed filtering and seamless career discovery. Built to handle complex queries, it allows users to filter opportunities by category, type, and location with real-time updates, providing a smooth and responsive interface for job seekers.", glink:"https://github.com/Dryex-yo/search-job-app", llink:"", tech: ["Vue.js", "Inertia.js", "Laravel", "Tailwind CSS", "MySQL"]},
          {img:p3,title:"WhatsApp Clone — Real-time Chat UI Application",desc:"A WhatsApp-inspired chat interface built with a modern UI, featuring responsive design and interactive messaging layout. Designed to replicate core messaging experience for learning front-end development and UI structuring.",glink:"https://github.com/Dryex-yo/whatsapp-clone",llink:"",tech:["React.js","CSS","TypeScript","laravel","Tailwind CSS","Inertia.js","PostgreSQL"]},
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
                  <a href={p.glink}><Button variant="outline" className="text-muted-foreground"><Github/>Github Repo</Button></a>
                  {p.llink && <a href={p.llink}><Button variant="outline" className="text-muted-foreground"><SquareArrowOutUpRightIcon/>Live Demo</Button></a> }
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
      <h2 className="text-3xl font-semibold tracking-tight">Certifications</h2>
    <p className="text-muted-foreground mt-2">
      {totalCerts} certificates across {certificateAlbums.length} platforms —
      highlights from ongoing learning.
    </p>
  </header>
 
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
    {certificateAlbums.map((album) => (
      <CertificateAlbum
        key={album.id}
        album={album}
        isOpen={openAlbumId === album.id}
        onToggle={() => handleToggle(album.id)}
      />
    ))}
  </div>
</Section>

      {/* Gallery */}
      {/* <Section id="gallery">
        <Gallery />
      </Section> */}

      {/* Contact */}
      <Section id="contact" >
        <header className="mb-8">
          <h2 className="text-3xl font-semibold tracking-tight">Contact</h2>
          <p className="text-muted-foreground mt-2">Have a project in mind? Let’s chat.</p>
        </header>
        <form onSubmit={onSubmit} className="max-w-xl space-y-4 mx-auto">
          <div className="items-center">
            <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
            <Input id="email" name="email" type="email" placeholder="you@domain.com" required />
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium">Message</label>
            <Textarea id="message" name="message" placeholder="Tell me about your project..." rows={5} required />
          </div>
          <Button type="submit" disabled={sending}>
  {sending ? "Sending..." : "Send"}
</Button>
      </form>
      </Section>

      <footer className="border-t">
        <div className="container px-4 py-10 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Dery Supriyadi. All rights reserved.
        </div>
      </footer>
    </main>
    </>
  );
}
