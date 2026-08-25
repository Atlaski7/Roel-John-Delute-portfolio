"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Box, Clapperboard, Code2, Download, Gamepad2, Play } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type WorkCategory = "frontend" | "game-development" | "animation" | "3d-modeling" | "media";

type WorkDetail = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  capabilities: string[];
};

const workDetails: Record<WorkCategory, WorkDetail> = {
  frontend: {
    number: "01",
    title: "FrontEnd",
    description: "Responsive, accessible websites and interfaces designed to feel clear, fast, and easy to use on every screen.",
    icon: Code2,
    capabilities: ["Responsive websites", "Landing pages", "Interface implementation", "Accessibility and performance"],
  },
  "game-development": {
    number: "02",
    title: "Game Development",
    description: "Playable ideas built around satisfying controls, understandable systems, and moments that keep players engaged.",
    icon: Gamepad2,
    capabilities: ["Gameplay prototypes", "Interaction systems", "Level concepts", "Testing and polish"],
  },
  animation: {
    number: "03",
    title: "Animation",
    description: "Motion work that gives ideas rhythm, personality, and a stronger visual story from opening frame to finish.",
    icon: Clapperboard,
    capabilities: ["Motion graphics", "Title sequences", "2D and 3D animation", "Visual storytelling"],
  },
  "3d-modeling": {
    number: "04",
    title: "3D Modeling",
    description: "Models and scenes shaped with careful form, materials, lighting, and presentation for polished final renders.",
    icon: Box,
    capabilities: ["Hard-surface modeling", "Environment props", "Materials and lighting", "Rendering"],
  },
  media: {
    number: "05",
    title: "Media",
    description: "Campaign videos, app showcases, and purposeful edits that bring a clear message to the screen.",
    icon: Play,
    capabilities: ["Campaign videos", "App showcases", "Pacing and transitions", "Final delivery"],
  },
};

const categories = (Object.keys(workDetails) as WorkCategory[]).map((slug) => ({
  slug,
  title: workDetails[slug].title,
}));

const hostedKazamVideoBase = "https://atlaski7.github.io/Roel-John-Delute-portfolio/projects/kazam";
const hostedArcaneSlapVideoBase = "https://atlaski7.github.io/Roel-John-Delute-portfolio/projects/arcane-slap";

export function WorkDetailPage({ category }: { category: WorkCategory }) {
  const [dark, setDark] = useState(true);
  const [isKazamAdOpen, setIsKazamAdOpen] = useState(false);
  const project = workDetails[category];
  const Icon = project.icon;
  const isGameDevelopment = category === "game-development";
  const isMedia = category === "media";

  useEffect(() => {
    const saved = window.localStorage.getItem("rjsd-theme");
    if (saved !== "light" && saved !== "dark") return;

    const frame = window.requestAnimationFrame(() => setDark(saved === "dark"));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!isKazamAdOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsKazamAdOpen(false);
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isKazamAdOpen]);

  function toggleTheme() {
    setDark((current) => {
      const next = !current;
      window.localStorage.setItem("rjsd-theme", next ? "dark" : "light");
      return next;
    });
  }

  return (
    <div className={`portfolio-app work-detail-page ${dark ? "theme-dark" : "theme-light"}`} id="top">
      <header className="site-header">
        <nav className="header-nav" aria-label="Work page navigation">
          <div className="nav-links"><a href="../#work">Selected work</a><a href="../#contact">Contact</a></div>
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${dark ? "light" : "dark"} mode`}><span>{dark ? "☼" : "◐"}</span><small>{dark ? "Light" : "Dark"}</small></button>
          <a className="brand" href="../" aria-label="RJSD home"><span>RJ</span><b>SD</b></a>
        </nav>
      </header>

      <main className="work-detail-main">
        <a className="work-detail-back" href="../#work"><ArrowLeft size={17} aria-hidden="true" /> Back to selected work</a>

        <section className="work-detail-hero" aria-labelledby="work-detail-title">
          <div className="work-detail-copy">
            <p className="eyebrow">Selected work / {project.number}</p>
            <span className="work-detail-icon" aria-hidden="true"><Icon size={29} strokeWidth={1.8} /></span>
            <h1 id="work-detail-title">{project.title}<em>.</em></h1>
            <p>{project.description}</p>
          </div>
          <div className="work-detail-visual" aria-hidden="true"><span>{project.number}</span><Icon size={92} strokeWidth={1.1} /></div>
        </section>

        <section className="work-detail-content" aria-label={`${project.title} details`}>
          <div className="work-capabilities">
            <p className="eyebrow">Capabilities</p>
            <ul>{project.capabilities.map((capability, index) => <li key={capability}><span>0{index + 1}</span>{capability}</li>)}</ul>
          </div>
          {isGameDevelopment ? (
            <>
              <div className="work-project-archive">
                <p className="eyebrow">Featured project / 01</p>
                <h2>Syntax Saga.</h2>
                <p>An educational cybersecurity game that brings lessons, exploration, and assessment together in one playable experience.</p>
                <a href="#syntax-saga">View project <ArrowUpRight size={17} aria-hidden="true" /></a>
              </div>

              <article className="syntax-saga-case-study" id="syntax-saga" aria-labelledby="syntax-saga-title">
                <div className="syntax-saga-cover">
                  <img src="../projects/syntax-saga/syntax-saga-title-screen.png" alt="Syntax Saga title screen with a student hero and cybersecurity-themed characters" />
                </div>
                <div className="syntax-saga-summary">
                  <div>
                    <p className="eyebrow">Game development / Case study</p>
                    <h2 id="syntax-saga-title">Syntax Saga<em>.</em></h2>
                  </div>
                  <p>A desktop-based learning game built to make cybersecurity topics feel more hands-on, memorable, and engaging for students.</p>
                  <ul className="syntax-saga-tags" aria-label="Syntax Saga project details">
                    <li>GameMaker</li>
                    <li>Cybersecurity</li>
                    <li>Educational game</li>
                  </ul>
                </div>
              </article>

              <article className="arcane-slap-case-study" id="arcane-slap" aria-labelledby="arcane-slap-title">
                <div className="arcane-slap-cover" aria-hidden="true">
                  <span className="arcane-slap-cover-number">02</span>
                  <Gamepad2 size={76} strokeWidth={1.15} />
                  <span className="arcane-slap-cover-title">Arcane <b>Slap</b></span>
                  <span className="arcane-slap-cover-status">Working</span>
                </div>
                <div className="arcane-slap-summary">
                  <div>
                    <p className="eyebrow">Game development / Project 02</p>
                    <div className="project-status">Working</div>
                    <h2 id="arcane-slap-title">Arcane Slap<em>.</em></h2>
                  </div>
                  <p>An in-progress game project. Gameplay, visuals, and project details will be added here as development continues.</p>
                  <ul className="arcane-slap-tags" aria-label="Arcane Slap project details">
                    <li>In development</li>
                    <li>Game project</li>
                    <li>VFX</li>
                  </ul>
                </div>
                <section className="arcane-slap-vfx" aria-labelledby="arcane-slap-vfx-title">
                  <div className="arcane-slap-vfx-heading">
                    <div><p className="eyebrow">Arcane Slap / Work in progress</p><h3 id="arcane-slap-vfx-title">VFX<em>.</em></h3></div>
                    <span className="project-status">Working</span>
                  </div>
                  <div className="arcane-slap-vfx-grid">
                    <article className="arcane-slap-vfx-card">
                      <div className="arcane-slap-vfx-card-heading"><p className="eyebrow">VFX / 01</p><h4>Effects Demonstration</h4></div>
                      <video controls preload="metadata" playsInline>
                        <source src={`${hostedArcaneSlapVideoBase}/effects-demonstration.mp4`} type="video/mp4" />
                        Your browser does not support embedded video.
                      </video>
                      <a href={`${hostedArcaneSlapVideoBase}/effects-demonstration.mp4`} target="_blank" rel="noreferrer">Open video file <Download size={15} aria-hidden="true" /></a>
                    </article>
                    <article className="arcane-slap-vfx-card">
                      <div className="arcane-slap-vfx-card-heading"><p className="eyebrow">VFX / 02</p><h4>Effects</h4></div>
                      <video controls preload="metadata" playsInline>
                        <source src={`${hostedArcaneSlapVideoBase}/effects.mp4`} type="video/mp4" />
                        Your browser does not support embedded video.
                      </video>
                      <a href={`${hostedArcaneSlapVideoBase}/effects.mp4`} target="_blank" rel="noreferrer">Open video file <Download size={15} aria-hidden="true" /></a>
                    </article>
                  </div>
                </section>
              </article>
            </>
          ) : isMedia ? (
            <>
              <div className="work-project-archive">
                <p className="eyebrow">Featured project / 01</p>
                <h2>Kazam.</h2>
                <p>Promotional media for Kazam, a platform connecting kasambahays and homeowners.</p>
                <a href="#kazam">Watch the project <ArrowUpRight size={17} aria-hidden="true" /></a>
              </div>

              <article className="kazam-case-study" id="kazam" aria-labelledby="kazam-title">
                <div className="kazam-cover">
                  <img src="../projects/kazam/kazam-cover.png" alt="Kazam promotional visual with phone and laptop app previews" />
                </div>
                <div className="kazam-summary">
                  <div>
                    <p className="eyebrow">Media / Case study</p>
                    <h2 id="kazam-title">Kazam<em>.</em></h2>
                  </div>
                  <p>A pair of video pieces that present Kazam&apos;s app experience and its connection between kasambahays and homeowners.</p>
                  <ul className="kazam-tags" aria-label="Kazam project details">
                    <li>Promotional media</li>
                    <li>App showcase</li>
                    <li>Video production</li>
                  </ul>
                </div>
                <div className="kazam-videos" aria-label="Kazam videos">
                  <article className="kazam-video-card">
                    <div className="kazam-video-heading"><p className="eyebrow">Video 01</p><h3>Kazam Ad Video</h3></div>
                    <button className="kazam-video-preview" type="button" onClick={() => setIsKazamAdOpen(true)} aria-label="Play Kazam Ad Video">
                      <img src="../projects/kazam/kazam-cover.png" alt="Kazam promotional visual with phone and laptop app previews" />
                      <span className="kazam-preview-play" aria-hidden="true"><Play size={21} fill="currentColor" /></span>
                    </button>
                    <a href={`${hostedKazamVideoBase}/kazam-ad-video.mp4`} target="_blank" rel="noreferrer">Open video file <Download size={15} aria-hidden="true" /></a>
                  </article>
                  <article className="kazam-video-card">
                    <div className="kazam-video-heading"><p className="eyebrow">Video 02</p><h3>Kazam Homeowners Video</h3></div>
                    <video controls preload="metadata" playsInline poster="../projects/kazam/kazam-cover.png">
                      <source src={`${hostedKazamVideoBase}/kazam-homeowners-video.mp4`} type="video/mp4" />
                      Your browser does not support embedded video.
                    </video>
                    <a href={`${hostedKazamVideoBase}/kazam-homeowners-video.mp4`} target="_blank" rel="noreferrer">Open video file <Download size={15} aria-hidden="true" /></a>
                  </article>
                </div>
              </article>
            </>
          ) : (
            <div className="work-project-archive">
              <p className="eyebrow">Project archive</p>
              <h2>Case studies will live here.</h2>
              <p>This page is ready for finished {project.title.toLowerCase()} projects, process notes, images, and results as the portfolio grows.</p>
              <a href="../#contact">Discuss a project <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
          )}
        </section>

        <nav className="work-category-nav" aria-label="Browse work categories">
          {categories.map((item) => <a href={`./${item.slug}`} aria-current={item.slug === category ? "page" : undefined} key={item.slug}>{item.title}</a>)}
        </nav>
      </main>

      <footer className="site-footer"><span>RJSD / {project.title}</span><span>Selected work / {project.number}</span><a href="../#contact">Get in touch</a></footer>
      {isMedia && isKazamAdOpen && (
        <div className="kazam-video-modal" role="dialog" aria-modal="true" aria-labelledby="kazam-ad-player-title" onClick={() => setIsKazamAdOpen(false)}>
          <div className="kazam-video-modal-panel" onClick={(event) => event.stopPropagation()}>
            <div className="kazam-video-modal-heading">
              <div><p className="eyebrow">Now playing</p><h2 id="kazam-ad-player-title">Kazam Ad Video</h2></div>
              <button className="kazam-video-modal-close" type="button" onClick={() => setIsKazamAdOpen(false)} autoFocus>Close</button>
            </div>
            <video controls autoPlay playsInline preload="metadata" poster="../projects/kazam/kazam-ad-poster.png">
              <source src={`${hostedKazamVideoBase}/kazam-ad-video.mp4`} type="video/mp4" />
              Your browser does not support embedded video.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
