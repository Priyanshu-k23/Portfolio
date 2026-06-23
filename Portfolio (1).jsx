import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Terminal, Database, Code2, Palette, Braces, Cpu, Github, Linkedin, Mail,
  MapPin, Download, ArrowRight, ChevronDown, ExternalLink, Sparkles, Award,
  Shield, Workflow, Layers, Zap, CheckCircle2, Menu, X, GraduationCap,
  Network, Calendar,
} from "lucide-react";

/* ============================================================
   DATA — edit this block to update the site content
   ============================================================ */

const PROFILE = {
  name: "Priyanshu Katakwar",
  initials: "PK",
  roles: ["Software Engineer", "AI & Automation Builder", "Cybersecurity Enthusiast", "Python Developer"],
  cgpa: "8.86",
  education: "B.Tech, Information Technology — 3rd Year",
  email: "priyanshukatakwar@gmail.com",
  linkedin: "https://www.linkedin.com/in/priyanshu-katakwar-a75196377/",
  github: "https://github.com/Priyanshu-k23",
  githubUser: "Priyanshu-k23",
  location: "India",
  resumeUrl: "/resume.pdf",
};

const SKILLS = [
  { name: "Python", icon: Terminal, group: "Language" },
  { name: "SQL", icon: Database, group: "Data" },
  { name: "HTML", icon: Code2, group: "Web" },
  { name: "CSS", icon: Palette, group: "Web" },
  { name: "JavaScript", icon: Braces, group: "Language" },
  { name: "DBMS", icon: Layers, group: "Data" },
  { name: "Linux", icon: Cpu, group: "Systems" },
  { name: "GitHub", icon: Github, group: "Tooling" },
  { name: "Automation", icon: Workflow, group: "Focus" },
  { name: "Cybersecurity", icon: Shield, group: "Focus" },
];

const PROJECTS = [
  {
    id: "jarvis",
    code: "PROJ / 01",
    title: "Jarvis AI Voice Assistant",
    blurb: "A Python-based desktop assistant that turns speech into action.",
    description:
      "Voice-controlled assistant handling command recognition, web automation, music playback, and live API integrations — built to make everyday desktop tasks hands-free.",
    tags: ["Python", "Speech Recognition", "APIs", "Automation"],
    highlights: ["Voice-command driven", "Real-time API integration", "Hands-free automation"],
    visual: "wave",
    accent: "indigo",
    github: PROFILE.github,
    demo: "#",
  },
  {
    id: "netflix",
    code: "PROJ / 02",
    title: "Netflix Clone",
    blurb: "A pixel-conscious, fully responsive streaming UI.",
    description:
      "Front-end recreation of a modern streaming platform — interactive content rows, smooth navigation, and a layout that holds up cleanly from desktop to mobile.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive UI"],
    highlights: ["Fully responsive", "Modern UI/UX", "Cross-device tested"],
    visual: "grid",
    accent: "violet",
    github: PROFILE.github,
    demo: "#",
  },
  {
    id: "share",
    code: "PROJ / 03",
    title: "Share to Care",
    blurb: "A donor–NGO–volunteer platform built around one workflow.",
    description:
      "Social-impact platform connecting three distinct user roles — donors contribute resources, NGOs manage campaigns, and volunteers join initiatives — in one coordinated system.",
    tags: ["System Design", "Web Development", "Multi-role UX"],
    highlights: ["3 coordinated user roles", "Campaign management", "Social-impact focus"],
    visual: "network",
    accent: "cyan",
    github: PROFILE.github,
    demo: "#",
  },
];

const CERTIFICATIONS = [
  { title: "Python Essentials 1", issuer: "Cisco", accent: "indigo" },
  { title: "Python Essentials 2", issuer: "Cisco", accent: "indigo" },
  { title: "Foundations of Cybersecurity", issuer: "Google", accent: "cyan" },
  { title: "Linux Commands & Shell Scripting", issuer: "IBM", accent: "violet" },
];

const TIMELINE = [
  { year: "2024", title: "Started B.Tech, Information Technology", text: "First lines of Python, first look at how the web actually works." },
  { year: "2024 – 25", title: "Built the fundamentals", text: "HTML, CSS, JavaScript, and early SQL — the toolkit that everything else stands on." },
  { year: "2025", title: "Shipped Jarvis & earned Python certifications", text: "First real project end-to-end, plus Python Essentials 1 & 2 from Cisco." },
  { year: "2025 – 26", title: "Netflix Clone, Share to Care, two more certifications", text: "Front-end depth and full-system design, alongside Google Cybersecurity and IBM Linux certs." },
  { year: "2026", title: "3rd year — CGPA 8.86", text: "Deepening DSA and cybersecurity practice. Open to internships now.", current: true },
  { year: "2027 – 28", title: "Target: internship → strong engineering role", text: "Graduate, land a software engineering internship, and convert it into a high-impact full-time role." },
];

const SOCIALS = [
  { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}`, icon: Mail },
  { label: "LinkedIn", value: "in/priyanshu-katakwar", href: PROFILE.linkedin, icon: Linkedin },
  { label: "GitHub", value: "Priyanshu-k23", href: PROFILE.github, icon: Github },
  { label: "Location", value: PROFILE.location, href: null, icon: MapPin },
];

/* ============================================================
   HOOKS
   ============================================================ */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", fn);
    return () => mq.removeEventListener?.("change", fn);
  }, []);
  return reduced;
}

function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches);
  }, []);
  return fine;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (scrolled / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

/* ============================================================
   ACCENT COLOR MAP (kept to Tailwind's default palette only)
   ============================================================ */

const ACCENTS = {
  indigo: { text: "text-indigo-400", border: "border-indigo-500", bg: "bg-indigo-500", glow: "99,102,241", soft: "bg-indigo-500/10" },
  violet: { text: "text-violet-400", border: "border-violet-500", bg: "bg-violet-500", glow: "168,85,247", soft: "bg-violet-500/10" },
  cyan: { text: "text-cyan-400", border: "border-cyan-500", bg: "bg-cyan-500", glow: "34,211,238", soft: "bg-cyan-500/10" },
};

/* ============================================================
   SPOTLIGHT GLASS CARD — signature interaction
   tracks the cursor and refracts a soft light through the glass
   ============================================================ */

function GlassCard({ children, className = "", glow = "99,102,241", as: As = "div", ...rest }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const onMove = useCallback((e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  }, []);
  return (
    <As
      ref={ref}
      onMouseMove={onMove}
      className={`relative overflow-hidden rounded-2xl transition-transform duration-300 ${className}`}
      style={{
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.09)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
      {...rest}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, rgba(${glow},0.16), transparent 65%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </As>
  );
}

/* ============================================================
   PARTICLE FIELD — ambient animated background (canvas)
   ============================================================ */

function ParticleField() {
  const canvasRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let particles = [];
    let w = 0, h = 0;

    const colors = ["99,102,241", "168,85,247", "34,211,238"];

    function init() {
      w = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      const count = Math.min(70, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18 * window.devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.18 * window.devicePixelRatio,
        r: (Math.random() * 1.4 + 0.6) * window.devicePixelRatio,
        c: colors[Math.floor(Math.random() * colors.length)],
      }));
    }

    function step() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},0.55)`;
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const max = 140 * window.devicePixelRatio;
          if (dist < max) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${p.c},${0.12 * (1 - dist / max)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(step);
    }

    init();
    if (!reduced) {
      raf = requestAnimationFrame(step);
    } else {
      step(); // draw one static frame, no animation loop
    }

    const onResize = () => init();
    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduced) raf = requestAnimationFrame(step);
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-60"
      aria-hidden="true"
    />
  );
}

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const fine = useFinePointer();

  useEffect(() => {
    if (!fine) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf;
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const onOver = (e) => {
      const interactive = e.target.closest("a, button, [data-cursor-hover]");
      if (ringRef.current) ringRef.current.style.scale = interactive ? "1.8" : "1";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-white"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 rounded-full border border-indigo-300 transition-[scale] duration-200"
        style={{ willChange: "transform" }}
      />
    </>
  );
}

/* ============================================================
   LOADING SCREEN
   ============================================================ */

function LoadingScreen({ done }) {
  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black transition-opacity duration-700 ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="font-mono text-sm tracking-[0.3em] text-indigo-400">PK</div>
      <div className="mt-5 h-px w-40 overflow-hidden bg-white/10">
        <div className="h-full w-full origin-left animate-[loadbar_1.1s_ease-in-out_forwards] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400" />
      </div>
      <div className="mt-4 font-mono text-[11px] tracking-widest text-zinc-500">LOADING PORTFOLIO</div>
    </div>
  );
}

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */

function ScrollProgress({ progress }) {
  return (
    <div className="fixed left-0 top-0 z-[90] h-[2.5px] w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/* ============================================================
   NAV
   ============================================================ */

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
];
const NAV_IDS = NAV_LINKS.map((l) => l.id);

function Nav({ active }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed left-0 top-0 z-[80] w-full">
      <div
        className="mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 sm:px-6"
        style={{ background: "rgba(8,8,14,0.6)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
      >
        <a href="#hero" className="flex items-center gap-2 font-mono text-sm text-white" data-cursor-hover>
          <span className="inline-block h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
          priyanshu.dev
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              data-cursor-hover
              className={`rounded-lg px-3 py-2 font-mono text-[12.5px] transition-colors duration-200 ${
                active === l.id ? "text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href={PROFILE.resumeUrl}
            download
            data-cursor-hover
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 font-mono text-[12.5px] font-medium text-black transition-transform duration-200 hover:-translate-y-0.5"
          >
            <Download className="h-3.5 w-3.5" /> Resume
          </a>
        </div>

        <button
          className="rounded-lg p-2 text-white md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          className="mx-3 mt-2 rounded-2xl p-4 md:hidden"
          style={{ background: "rgba(8,8,14,0.92)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 font-mono text-sm text-zinc-300"
            >
              {l.label}
            </a>
          ))}
          <a
            href={PROFILE.resumeUrl}
            download
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-mono text-sm font-medium text-black"
          >
            <Download className="h-4 w-4" /> Download Resume
          </a>
        </div>
      )}
    </header>
  );
}

/* ============================================================
   HERO
   ============================================================ */

function TypedRoles() {
  const reduced = usePrefersReducedMotion();
  const [text, setText] = useState(PROFILE.roles[0]);
  useEffect(() => {
    if (reduced) return;
    let ri = 0, ci = 0, deleting = false, timeout;
    const tick = () => {
      const word = PROFILE.roles[ri];
      if (!deleting) {
        ci++;
        setText(word.slice(0, ci));
        if (ci === word.length) {
          deleting = true;
          timeout = setTimeout(tick, 1300);
          return;
        }
      } else {
        ci--;
        setText(word.slice(0, ci));
        if (ci === 0) {
          deleting = false;
          ri = (ri + 1) % PROFILE.roles.length;
        }
      }
      timeout = setTimeout(tick, deleting ? 35 : 65);
    };
    timeout = setTimeout(tick, 900);
    return () => clearTimeout(timeout);
  }, [reduced]);
  return (
    <span className="font-mono text-indigo-300">
      {text}
      <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-indigo-400 align-middle" />
    </span>
  );
}

/* ---------- Orbit ring + counter-spin icon badge ---------- */
function OrbitRing({ radius, duration, startAngle = 0, reverse, icons }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 rounded-full"
      style={{
        width: radius * 2,
        height: radius * 2,
        marginLeft: -radius,
        marginTop: -radius,
        border: "1px dashed rgba(255,255,255,0.07)",
        animation: `orbit-spin ${duration}s linear infinite ${reverse ? "reverse" : "normal"}`,
      }}
    >
      {icons.map(({ Icon, color, angle }) => (
        <div
          key={color + angle}
          className="absolute left-1/2 top-1/2"
          style={{
            transform: `rotate(${angle}deg) translateY(-${radius}px)`,
          }}
        >
          <div
            className="flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl"
            style={{
              background: `rgba(${color},0.14)`,
              border: `1px solid rgba(${color},0.5)`,
              boxShadow: `0 0 18px rgba(${color},0.5)`,
              animation: `orbit-spin ${duration}s linear infinite ${reverse ? "normal" : "reverse"}`,
            }}
          >
            <Icon className="h-3.5 w-3.5" style={{ color: `rgb(${color})` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Animated floating code snippet ---------- */
const CODE_LINES = [
  { text: "import jarvis", color: "99,102,241" },
  { text: "jarvis.listen()", color: "168,85,247" },
  { text: "# cmd: open youtube", color: "100,116,139" },
  { text: "jarvis.execute(cmd)", color: "34,211,238" },
  { text: "# ✓ done in 0.3s", color: "52,211,153" },
];

function FloatingCode() {
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);
  const [phase, setPhase] = useState("typing"); // typing | pause | clearing

  useEffect(() => {
    let t;
    const current = CODE_LINES[line].text;
    if (phase === "typing") {
      if (chars < current.length) {
        t = setTimeout(() => setChars((c) => c + 1), 42);
      } else {
        if (line === CODE_LINES.length - 1) {
          t = setTimeout(() => { setLine(0); setChars(0); }, 2600);
        } else {
          t = setTimeout(() => { setLine((l) => l + 1); setChars(0); }, 380);
        }
      }
    }
    return () => clearTimeout(t);
  }, [line, chars, phase]);

  return (
    <div
      className="absolute -right-4 top-4 w-52 rounded-xl p-4 font-mono text-[11px] leading-6 hidden sm:block"
      style={{
        background: "rgba(8,8,14,0.75)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(12px)",
        animation: "float-bob 5s ease-in-out infinite",
      }}
    >
      <div className="mb-2 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-red-500/70" />
        <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
        <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
        <span className="ml-2 text-zinc-600">jarvis.py</span>
      </div>
      {CODE_LINES.slice(0, line).map((l, i) => (
        <div key={i} style={{ color: `rgba(${l.color},0.9)` }}>{l.text}</div>
      ))}
      <div style={{ color: `rgba(${CODE_LINES[line].color},0.9)` }}>
        {CODE_LINES[line].text.slice(0, chars)}
        <span className="animate-pulse">▋</span>
      </div>
    </div>
  );
}

/* ---------- Floating stat badge ---------- */
function StatBadge({ top, left, right, bottom, value, label, color }) {
  return (
    <div
      className="absolute hidden rounded-xl px-3 py-2 sm:block"
      style={{
        top, left, right, bottom,
        background: "rgba(8,8,14,0.72)",
        border: `1px solid rgba(${color},0.35)`,
        backdropFilter: "blur(10px)",
        boxShadow: `0 0 22px rgba(${color},0.18)`,
        animation: `float-bob ${3.5 + (parseInt(top) % 2)}s ease-in-out infinite`,
      }}
    >
      <div className="font-mono text-base font-semibold" style={{ color: `rgb(${color})` }}>{value}</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-zinc-500">{label}</div>
    </div>
  );
}

/* ---------- The main hero graphic ---------- */
function OrbitMark() {
  return (
    <div className="relative mx-auto flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72" aria-hidden="true">

      {/* ambient glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.38), rgba(168,85,247,0.18) 50%, transparent 75%)" }}
      />

      {/* orbit rings */}
      <OrbitRing
        radius={68}
        duration={14}
        icons={[
          { Icon: Terminal, color: "99,102,241", angle: 0 },
          { Icon: Database, color: "99,102,241", angle: 180 },
        ]}
      />
      <OrbitRing
        radius={96}
        duration={22}
        reverse
        icons={[
          { Icon: Shield, color: "34,211,238", angle: 60 },
          { Icon: Braces, color: "34,211,238", angle: 240 },
        ]}
      />
      <OrbitRing
        radius={126}
        duration={30}
        icons={[
          { Icon: Code2, color: "168,85,247", angle: 20 },
          { Icon: Cpu, color: "168,85,247", angle: 200 },
          { Icon: Workflow, color: "168,85,247", angle: 110 },
        ]}
      />

      {/* center nucleus */}
      <div
        className="relative z-10 flex flex-col items-center justify-center rounded-full"
        style={{
          width: 72, height: 72,
          background: "radial-gradient(circle at 35% 32%, rgba(255,255,255,0.22), rgba(99,102,241,0.45) 44%, rgba(6,6,12,0.96) 76%)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 0 40px rgba(99,102,241,0.35), inset 0 1px 1px rgba(255,255,255,0.15)",
        }}
      >
        <span className="bg-gradient-to-br from-white to-indigo-300 bg-clip-text font-mono text-base font-bold tracking-widest text-transparent">PK</span>
      </div>

      {/* floating code window */}
      <FloatingCode />

      {/* floating stat badges */}
      <StatBadge top="8px" left="-70px" value="8.86" label="CGPA" color="52,211,153" />
      <StatBadge bottom="16px" left="-54px" value="04" label="Certs" color="168,85,247" />
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-28">
      <div className="absolute inset-0">
        <ParticleField />
        <div
          className="absolute left-1/2 top-1/3 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.5), transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* two-col on lg+, stacked below */}
        <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:justify-between lg:gap-0">

          {/* ---- LEFT: text ---- */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:max-w-[52%]">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] tracking-wide text-zinc-300" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              OPEN TO SOFTWARE ENGINEERING INTERNSHIPS
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.06] tracking-tight text-white sm:text-5xl md:text-6xl">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                {PROFILE.name.split(" ")[0]}.
              </span>
              <br />
              I build software<br className="hidden sm:block" /> that works.
            </h1>

            <div className="mt-5 text-lg sm:text-xl">
              <TypedRoles />
            </div>

            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-zinc-400">
              Third-year IT student with a {PROFILE.cgpa} CGPA, building real projects in Python, the web,
              and cybersecurity — working toward a strong software engineering role by 2028.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a
                href="#projects"
                data-cursor-hover
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition-transform duration-200 hover:-translate-y-0.5"
              >
                View Projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={PROFILE.resumeUrl}
                download
                data-cursor-hover
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/5"
                style={{ border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-5 w-full max-w-sm">
              {[
                ["8.86", "CGPA / 10"],
                ["03", "Projects"],
                ["04", "Certs"],
              ].map(([num, label]) => (
                <div key={label} className="px-4 first:pl-0 last:pr-0">
                  <div className="font-mono text-xl font-semibold text-white sm:text-2xl">{num}</div>
                  <div className="mt-1 text-[10.5px] uppercase tracking-wider text-zinc-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ---- RIGHT: orbit mark ---- */}
          <div className="flex-none">
            <OrbitMark />
          </div>

        </div>
      </div>

      <a
        href="#about"
        data-cursor-hover
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-zinc-500 transition-colors hover:text-white"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}

/* ============================================================
   SECTION SHELL (shared eyebrow + heading + reveal)
   ============================================================ */

function SectionHeader({ eyebrow, title, lede }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`mx-auto max-w-2xl text-center transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
    >
      <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-indigo-400">
        <span className="h-1 w-1 rounded-full bg-indigo-400" /> {eyebrow}
      </div>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      {lede && <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">{lede}</p>}
    </div>
  );
}

/* ============================================================
   ABOUT
   ============================================================ */

function About() {
  const [ref, visible] = useReveal();
  const traits = ["Fast learner", "Self-motivated", "Strong problem-solver", "Independent builder", "Consistent improvement"];
  return (
    <section id="about" className="relative px-6 py-28">
      <SectionHeader eyebrow="ABOUT" title="A builder before a job-seeker." />
      <div
        ref={ref}
        className={`mx-auto mt-12 grid max-w-4xl gap-6 transition-all duration-700 sm:grid-cols-2 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <GlassCard glow="99,102,241" className="group p-7">
          <GraduationCap className="h-5 w-5 text-indigo-400" />
          <h3 className="mt-4 font-semibold text-white">{PROFILE.education}</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Currently maintaining a {PROFILE.cgpa}/10 CGPA while building independent projects in
            software development, automation, and cybersecurity outside of coursework.
          </p>
        </GlassCard>
        <GlassCard glow="34,211,238" className="group p-7">
          <Zap className="h-5 w-5 text-cyan-400" />
          <h3 className="mt-4 font-semibold text-white">How I work</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Each project is a deadline I set myself — a way to learn faster than a syllabus allows.
            I'd rather ship something real than study it in theory.
          </p>
        </GlassCard>
      </div>
      <div
        className={`mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-2.5 transition-all delay-150 duration-700 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {traits.map((t) => (
          <span
            key={t}
            className="rounded-full px-4 py-1.5 font-mono text-[11.5px] text-zinc-300"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   SKILLS
   ============================================================ */

function SkillCard({ skill }) {
  const Icon = skill.icon;
  return (
    <GlassCard glow="99,102,241" className="group flex flex-col items-center gap-3 px-4 py-6 hover:-translate-y-1">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-indigo-300 transition-colors duration-300 group-hover:text-white">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-sm font-medium text-zinc-200">{skill.name}</span>
      <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">{skill.group}</span>
    </GlassCard>
  );
}

function Skills() {
  const [ref, visible] = useReveal();
  return (
    <section id="skills" className="relative px-6 py-28">
      <SectionHeader eyebrow="SKILLS" title="What I build with." lede="A working stack across languages, the web, and data — with deliberate, ongoing investment in security and systems fundamentals." />
      <div
        ref={ref}
        className={`mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 transition-all duration-700 sm:grid-cols-3 md:grid-cols-5 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {SKILLS.map((s) => (
          <SkillCard key={s.name} skill={s} />
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   PROJECT VISUAL MOCKUPS (abstract, no fake screenshots)
   ============================================================ */

function ProjectVisual({ type, accent }) {
  const a = ACCENTS[accent];
  if (type === "wave") {
    return (
      <div className="flex h-full items-center justify-center gap-1.5">
        {[14, 26, 38, 20, 32, 16, 28, 22, 36, 18].map((h, i) => (
          <div
            key={i}
            className={`w-1.5 rounded-full ${a.bg} opacity-70`}
            style={{ height: h, animation: `wavebar 1.4s ease-in-out ${i * 0.08}s infinite` }}
          />
        ))}
      </div>
    );
  }
  if (type === "grid") {
    return (
      <div className="grid h-full grid-cols-4 gap-1.5 p-5">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`rounded-md ${a.soft}`}
            style={{ border: `1px solid rgba(${a.glow},0.3)`, aspectRatio: "16/10" }}
          />
        ))}
      </div>
    );
  }
  // network
  return (
    <div className="relative flex h-full items-center justify-center">
      <Network className={`h-12 w-12 ${a.text} opacity-80`} />
      {[...Array(3)].map((_, i) => (
        <span
          key={i}
          className={`absolute h-2 w-2 rounded-full ${a.bg}`}
          style={{
            top: i === 0 ? "30%" : i === 1 ? "65%" : "45%",
            left: i === 0 ? "30%" : i === 1 ? "35%" : "70%",
            boxShadow: `0 0 12px rgba(${a.glow},0.8)`,
          }}
        />
      ))}
    </div>
  );
}

function ProjectCard({ project }) {
  const a = ACCENTS[project.accent];
  return (
    <GlassCard glow={a.glow} className="group flex flex-col hover:-translate-y-1.5">
      <div className="h-36" style={{ background: `linear-gradient(160deg, rgba(${a.glow},0.14), transparent)` }}>
        <ProjectVisual type={project.visual} accent={project.accent} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className={`font-mono text-[10.5px] tracking-widest ${a.text}`}>{project.code}</span>
        <h3 className="mt-2 text-lg font-semibold text-white">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{project.description}</p>

        <ul className="mt-4 space-y-1.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-[12.5px] text-zinc-300">
              <CheckCircle2 className={`h-3.5 w-3.5 flex-none ${a.text}`} /> {h}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span key={t} className="rounded-md px-2 py-1 font-mono text-[10px] text-zinc-400" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex gap-4 border-t border-white/10 pt-4">
          <a href={project.github} target="_blank" rel="noopener noreferrer" data-cursor-hover className="inline-flex items-center gap-1.5 text-[12.5px] text-zinc-300 transition-colors hover:text-white">
            <Github className="h-3.5 w-3.5" /> Code
          </a>
          <a href={project.demo} target="_blank" rel="noopener noreferrer" data-cursor-hover className="inline-flex items-center gap-1.5 text-[12.5px] text-zinc-300 transition-colors hover:text-white">
            <ExternalLink className="h-3.5 w-3.5" /> Live
          </a>
        </div>
      </div>
    </GlassCard>
  );
}

function Projects() {
  const [ref, visible] = useReveal();
  return (
    <section id="projects" className="relative px-6 py-28">
      <SectionHeader eyebrow="PROJECTS" title="Things I've shipped." lede="Three independent builds, each chosen to stretch a different skill — automation and APIs, front-end craft, and full-system design." />
      <div
        ref={ref}
        className={`mx-auto mt-12 grid max-w-6xl gap-6 transition-all duration-700 md:grid-cols-3 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center font-mono text-[11px] text-zinc-600">
        Project visuals are stylized placeholders — swap in real screenshots once each repo is public.
      </p>
    </section>
  );
}

/* ============================================================
   GITHUB CONTRIBUTIONS
   ============================================================ */

function GithubSection() {
  const [ref, visible] = useReveal();
  return (
    <section className="relative px-6 py-20">
      <div
        ref={ref}
        className={`mx-auto max-w-4xl transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
      >
        <GlassCard glow="99,102,241" className="p-7 sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Github className="h-5 w-5 text-white" />
              <h3 className="font-semibold text-white">Live GitHub Activity</h3>
            </div>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-1.5 font-mono text-[12px] text-indigo-300 hover:text-white"
            >
              @{PROFILE.githubUser} <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="mt-6 overflow-x-auto rounded-xl bg-black/30 p-4">
            <img
              src={`https://ghchart.rshah.org/6366f1/${PROFILE.githubUser}`}
              alt={`${PROFILE.name} GitHub contribution graph`}
              className="min-w-[640px]"
              loading="lazy"
            />
          </div>
          <p className="mt-3 font-mono text-[11px] text-zinc-600">
            Pulled live from GitHub — updates automatically as new commits land.
          </p>
        </GlassCard>
      </div>
    </section>
  );
}

/* ============================================================
   TIMELINE
   ============================================================ */

function TimelineItem({ item, index }) {
  const [ref, visible] = useReveal();
  const leftSide = index % 2 === 0;
  return (
    <div ref={ref} className="relative pl-10 md:grid md:grid-cols-2 md:gap-10 md:pl-0">
      <div
        className={`absolute left-[11px] top-1.5 h-3 w-3 -translate-x-1/2 rounded-full md:left-1/2 ${
          item.current ? "bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.9)]" : "bg-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.7)]"
        }`}
      />
      <div className={`md:contents`}>
        <div className={`hidden md:block ${leftSide ? "md:order-1" : "md:order-2"}`} />
        <div
          className={`${leftSide ? "md:order-2 md:text-left md:pl-10" : "md:order-1 md:text-right md:pr-10"} pb-12 transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-indigo-400">
            <Calendar className="h-3 w-3" /> {item.year} {item.current && <span className="ml-1 rounded-full bg-cyan-500/15 px-2 py-0.5 text-cyan-300">NOW</span>}
          </span>
          <h3 className="mt-1.5 font-semibold text-white">{item.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{item.text}</p>
        </div>
      </div>
    </div>
  );
}

function Timeline() {
  return (
    <section id="journey" className="relative px-6 py-28">
      <SectionHeader eyebrow="JOURNEY" title="How I got here." lede="A rough timeline of the path so far — and where it's headed next. Dates are approximate." />
      <div className="relative mx-auto mt-14 max-w-3xl">
        <div className="absolute left-[11px] top-0 h-full w-px bg-white/10 md:left-1/2" />
        {TIMELINE.map((item, i) => (
          <TimelineItem key={item.year + item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   CERTIFICATIONS
   ============================================================ */

function CertCard({ cert }) {
  const a = ACCENTS[cert.accent];
  return (
    <GlassCard glow={a.glow} className="group flex items-center gap-4 p-5 hover:-translate-y-1">
      <div className={`flex h-12 w-12 flex-none items-center justify-center rounded-xl ${a.soft}`} style={{ border: `1px solid rgba(${a.glow},0.35)` }}>
        <Award className={`h-5 w-5 ${a.text}`} />
      </div>
      <div className="min-w-0">
        <h3 className="truncate font-medium text-white">{cert.title}</h3>
        <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-zinc-500">{cert.issuer}</p>
      </div>
    </GlassCard>
  );
}

function Certifications() {
  const [ref, visible] = useReveal();
  return (
    <section id="certifications" className="relative px-6 py-28">
      <SectionHeader eyebrow="CERTIFICATIONS" title="Verified, with room to grow." lede="Four earned so far — this section is built to expand as new ones land." />
      <div
        ref={ref}
        className={`mx-auto mt-12 grid max-w-4xl gap-4 transition-all duration-700 sm:grid-cols-2 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {CERTIFICATIONS.map((c) => (
          <CertCard key={c.title} cert={c} />
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT
   ============================================================ */

function Contact() {
  const [ref, visible] = useReveal();
  return (
    <section id="contact" className="relative px-6 py-28">
      <SectionHeader eyebrow="CONTACT" title="Let's talk." lede="Open to internships, collaborations, and early-career software roles. Email or LinkedIn is fastest." />
      <div
        ref={ref}
        className={`mx-auto mt-12 grid max-w-4xl gap-4 transition-all duration-700 sm:grid-cols-2 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {SOCIALS.map((s) => {
          const Icon = s.icon;
          const Tag = s.href ? "a" : "div";
          return (
            <GlassCard
              key={s.label}
              glow="99,102,241"
              as={Tag}
              {...(s.href ? { href: s.href, target: "_blank", rel: "noopener noreferrer", "data-cursor-hover": true } : {})}
              className="group flex items-center gap-4 p-5 hover:-translate-y-1"
            >
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-white/5 text-indigo-300">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10.5px] uppercase tracking-wider text-zinc-500">{s.label}</p>
                <p className="truncate text-sm text-white">{s.value}</p>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */

function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-zinc-600">
        <p>© {new Date().getFullYear()} {PROFILE.name.toUpperCase()}</p>
        <p>BUILT WITH REACT &amp; TAILWIND</p>
      </div>
    </footer>
  );
}

/* ============================================================
   ROOT APP
   ============================================================ */

export default function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const progress = useScrollProgress();
  const active = useActiveSection(NAV_IDS);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white" style={{ cursor: "default" }}>
      <style>{`
        @keyframes loadbar { from { transform: scaleX(0);} to { transform: scaleX(1);} }
        @keyframes wavebar { 0%,100% { transform: scaleY(0.4);} 50% { transform: scaleY(1);} }
        @keyframes orbit-spin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
        @keyframes pulse-glow {
          0%,100% { box-shadow: 0 0 28px rgba(99,102,241,0.35), inset 0 1px 1px rgba(255,255,255,0.15); }
          50%      { box-shadow: 0 0 52px rgba(99,102,241,0.65), inset 0 1px 1px rgba(255,255,255,0.25); }
        }
        @keyframes float-bob {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }
        html { scroll-behavior: smooth; }
        ::selection { background: #6366f1; color: #fff; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
        }
      `}</style>

      <LoadingScreen done={loaded} />
      <ScrollProgress progress={progress} />
      <CustomCursor />

      <Nav active={active} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GithubSection />
        <Timeline />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
