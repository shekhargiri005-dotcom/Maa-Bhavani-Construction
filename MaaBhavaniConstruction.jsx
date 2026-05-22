
import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronUp,
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Users,
  Zap,
  Building2,
  Wrench,
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  TrendingUp,
  DollarSign,
  Layers,
  Activity,
  Twitter,
  Facebook,
  Linkedin,
  Send,
  AlertCircle,
} from "lucide-react";

/* ─────────────────────────────────────────────
   CSS — injected once into <head>
───────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap');

:root {
  --saffron: #E8600A;
  --saffron-light: #FF7A2B;
  --gold: #F4C430;
  --coal: #0F0F0F;
  --charcoal: #1C1C1E;
  --cream: #FAF8F4;
  --warm-white: #F5F2ED;
  --text: #1A1A1A;
  --text-light: #6B6B6B;
  --ash: #8A8A8E;
  --radius: 12px;
  --shadow-sm: 0 2px 8px rgba(0,0,0,.08);
  --shadow-md: 0 8px 24px rgba(0,0,0,.12);
  --shadow-lg: 0 16px 48px rgba(0,0,0,.18);
  --trans: .3s cubic-bezier(.4,0,.2,1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: 'DM Sans', sans-serif;
  background: var(--cream);
  color: var(--text);
  overflow-x: hidden;
}

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--coal); }
::-webkit-scrollbar-thumb { background: var(--saffron); border-radius: 3px; }

/* ── Preloader ── */
.preloader {
  position: fixed; inset: 0;
  background: var(--coal);
  display: flex; align-items: center; justify-content: center;
  z-index: 9999;
  transition: opacity .6s ease, visibility .6s ease;
}
.preloader.hidden { opacity: 0; visibility: hidden; }
.preloader-inner { position: relative; display: flex; align-items: center; justify-content: center; }
.preloader-ring {
  width: 110px; height: 110px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: var(--saffron);
  border-right-color: var(--gold);
  animation: spin 1s linear infinite;
  position: absolute;
}
.preloader-text {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3.2rem;
  color: var(--saffron);
  letter-spacing: .1em;
  line-height: 1;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Page transition ── */
.page-wrap {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity .45s ease, transform .45s ease;
}
.page-wrap.visible { opacity: 1; transform: translateY(0); }

/* ── Navbar ── */
.navbar {
  position: fixed; top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: 0 2rem;
  height: 72px;
  display: flex; align-items: center; justify-content: space-between;
  transition: background var(--trans), backdrop-filter var(--trans), box-shadow var(--trans);
}
.navbar.scrolled {
  background: rgba(15,15,15,.96);
  backdrop-filter: blur(12px);
  box-shadow: 0 2px 24px rgba(0,0,0,.4);
}
.navbar.solid {
  background: var(--coal);
  box-shadow: 0 2px 24px rgba(0,0,0,.4);
}
.nav-logo { display: flex; align-items: center; gap: .6rem; cursor: pointer; text-decoration: none; }
.nav-logo-mark {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2rem;
  color: var(--saffron);
  letter-spacing: .08em;
  line-height: 1;
}
.nav-logo-sub {
  font-family: 'DM Sans', sans-serif;
  font-size: .6rem;
  color: var(--ash);
  letter-spacing: .15em;
  text-transform: uppercase;
  line-height: 1.4;
  max-width: 110px;
}
.nav-links {
  display: flex; align-items: center; gap: 2rem;
  list-style: none;
}
.nav-link {
  color: rgba(255,255,255,.8);
  text-decoration: none;
  font-size: .9rem;
  font-weight: 500;
  transition: color var(--trans);
  cursor: pointer;
  background: none; border: none;
  padding: 0; font-family: inherit;
}
.nav-link:hover, .nav-link.active { color: var(--saffron); }
.nav-dropdown { position: relative; }
.nav-dropdown-btn {
  display: flex; align-items: center; gap: .3rem;
  color: rgba(255,255,255,.8);
  font-size: .9rem; font-weight: 500;
  cursor: pointer; background: none; border: none;
  font-family: inherit; transition: color var(--trans);
}
.nav-dropdown-btn:hover { color: var(--saffron); }
.dropdown-menu {
  position: absolute; top: calc(100% + 1rem); left: 50%;
  transform: translateX(-50%);
  background: var(--charcoal);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: var(--radius);
  min-width: 180px;
  padding: .5rem 0;
  opacity: 0; visibility: hidden;
  transform: translateX(-50%) translateY(-8px);
  transition: opacity var(--trans), transform var(--trans), visibility var(--trans);
  box-shadow: var(--shadow-lg);
}
.nav-dropdown:hover .dropdown-menu {
  opacity: 1; visibility: visible;
  transform: translateX(-50%) translateY(0);
}
.dropdown-item {
  display: block; padding: .7rem 1.2rem;
  color: rgba(255,255,255,.8);
  text-decoration: none; font-size: .875rem;
  cursor: pointer; transition: color var(--trans), background var(--trans);
}
.dropdown-item:hover { color: var(--saffron); background: rgba(232,96,10,.08); }
.nav-cta {
  background: var(--saffron); color: #fff;
  padding: .55rem 1.3rem; border-radius: 50px;
  font-size: .875rem; font-weight: 600;
  text-decoration: none; border: none;
  cursor: pointer; font-family: inherit;
  transition: background var(--trans), transform var(--trans);
  display: flex; align-items: center; gap: .4rem;
}
.nav-cta:hover { background: var(--saffron-light); transform: scale(1.03); }
.hamburger {
  display: none; background: none; border: none;
  color: #fff; cursor: pointer; padding: .4rem;
}
.mobile-drawer {
  position: fixed; top: 0; right: 0;
  width: min(320px, 85vw); height: 100vh;
  background: var(--charcoal);
  z-index: 1100;
  transform: translateX(100%);
  transition: transform var(--trans);
  padding: 2rem 1.5rem;
  display: flex; flex-direction: column; gap: 1rem;
  overflow-y: auto;
}
.mobile-drawer.open { transform: translateX(0); }
.drawer-close {
  align-self: flex-end; background: none; border: none;
  color: #fff; cursor: pointer; padding: .3rem;
}
.drawer-link {
  color: rgba(255,255,255,.85); text-decoration: none;
  font-size: 1.05rem; font-weight: 500;
  padding: .75rem 0; border-bottom: 1px solid rgba(255,255,255,.08);
  cursor: pointer; background: none; border-top: none;
  border-left: none; border-right: none; font-family: inherit;
  text-align: left; transition: color var(--trans);
}
.drawer-link:hover { color: var(--saffron); }
.drawer-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.5);
  z-index: 1050; opacity: 0; visibility: hidden;
  transition: opacity var(--trans), visibility var(--trans);
}
.drawer-overlay.open { opacity: 1; visibility: visible; }

/* ── Back to top ── */
.back-top {
  position: fixed; bottom: 2rem; right: 2rem;
  width: 48px; height: 48px; border-radius: 50%;
  background: var(--saffron); color: #fff;
  border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: var(--shadow-md);
  opacity: 0; visibility: hidden;
  transform: translateY(12px);
  transition: opacity var(--trans), visibility var(--trans), transform var(--trans), background var(--trans);
  z-index: 800;
}
.back-top.visible { opacity: 1; visibility: visible; transform: translateY(0); }
.back-top:hover { background: var(--saffron-light); }

/* ── Section helpers ── */
.section { padding: 6rem 2rem; }
.container { max-width: 1200px; margin: 0 auto; }
.section-label {
  font-size: .75rem; font-weight: 600;
  letter-spacing: .2em; text-transform: uppercase;
  color: var(--saffron); margin-bottom: .75rem;
  display: block;
}
.section-heading {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700; line-height: 1.15;
  color: var(--text);
}
.section-heading.light { color: #fff; }
.divider {
  width: 56px; height: 3px;
  background: linear-gradient(90deg, var(--saffron), var(--gold));
  border-radius: 2px; margin: 1.25rem 0 1.75rem;
}

/* ── Fade-in animation ── */
.fade-in { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
.fade-in.visible { opacity: 1; transform: translateY(0); }

/* ── Buttons ── */
.btn {
  display: inline-flex; align-items: center; gap: .5rem;
  padding: .8rem 2rem; border-radius: 50px;
  font-size: .9rem; font-weight: 600;
  cursor: pointer; border: none; font-family: inherit;
  transition: background var(--trans), color var(--trans), transform var(--trans), box-shadow var(--trans);
  text-decoration: none;
}
.btn-primary {
  background: var(--saffron); color: #fff;
}
.btn-primary:hover { background: var(--saffron-light); transform: scale(1.03); }
.btn-outline {
  background: transparent; color: #fff;
  border: 2px solid rgba(255,255,255,.5);
}
.btn-outline:hover { border-color: var(--saffron); color: var(--saffron); transform: scale(1.03); }
.btn-dark { background: var(--charcoal); color: #fff; }
.btn-dark:hover { background: var(--saffron); transform: scale(1.03); }

/* ─────────────── HOME PAGE ─────────────── */

/* Hero */
.hero {
  position: relative; min-height: 100vh;
  background: var(--coal);
  display: flex; align-items: center;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%);
  padding-bottom: 4rem;
}
.hero-noise {
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  opacity: .4; pointer-events: none;
}
.hero-glow {
  position: absolute; top: -20%; right: -10%;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(232,96,10,.18) 0%, transparent 70%);
  pointer-events: none;
}
.hero-content {
  position: relative; z-index: 1;
  max-width: 1200px; margin: 0 auto;
  padding: 7rem 2rem 4rem;
  width: 100%;
}
.hero-eyebrow {
  font-size: .75rem; font-weight: 600;
  letter-spacing: .25em; text-transform: uppercase;
  color: var(--gold); margin-bottom: 1.5rem;
  display: flex; align-items: center; gap: .75rem;
}
.hero-eyebrow::before {
  content: ''; display: inline-block;
  width: 32px; height: 2px;
  background: var(--gold);
}
.hero-heading {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3rem, 7vw, 5.2rem);
  font-weight: 700; color: #fff;
  line-height: 1.08; margin-bottom: .25rem;
}
.hero-heading .typewriter-wrap {
  display: block; color: var(--saffron);
  min-height: 1.1em;
}
.typewriter-word { display: inline; }
.typewriter-cursor {
  display: inline-block; width: 3px;
  background: var(--saffron);
  margin-left: 2px; vertical-align: text-bottom;
  animation: blink .75s step-end infinite;
}
@keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
.hero-sub {
  max-width: 540px; font-size: 1.05rem;
  color: rgba(255,255,255,.65); line-height: 1.75;
  margin: 2rem 0 3rem;
}
.hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
.hero-badges {
  position: absolute; bottom: 6rem; left: 2rem;
  display: flex; gap: .75rem; flex-wrap: wrap;
}
.hero-badge {
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.14);
  backdrop-filter: blur(8px);
  color: rgba(255,255,255,.85);
  font-size: .75rem; font-weight: 600;
  letter-spacing: .12em; text-transform: uppercase;
  padding: .5rem 1rem; border-radius: 50px;
}

/* Who We Are */
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
.about-body { font-size: 1rem; color: var(--text-light); line-height: 1.85; margin-bottom: 1.75rem; }
.about-highlights { display: flex; flex-direction: column; gap: .85rem; margin-bottom: 2rem; }
.about-highlight {
  display: flex; align-items: center; gap: .85rem;
  font-size: .9rem; font-weight: 500; color: var(--text);
}
.about-highlight svg { color: var(--saffron); flex-shrink: 0; }
.story-link {
  color: var(--saffron); font-weight: 600; text-decoration: none;
  display: inline-flex; align-items: center; gap: .4rem;
  font-size: .9rem; transition: gap var(--trans);
  cursor: pointer; background: none; border: none;
  font-family: inherit;
}
.story-link:hover { gap: .7rem; }

/* CSS Building Illustration */
.building-art {
  position: relative; height: 360px;
  display: flex; align-items: flex-end; justify-content: center;
  gap: 8px; overflow: hidden;
}
.b-sky {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%);
  border-radius: var(--radius);
}
.b-ground {
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 24px;
  background: linear-gradient(90deg, var(--charcoal), #2a2a2a, var(--charcoal));
}
.b-tower {
  position: relative; z-index: 1;
  background: var(--charcoal);
  border: 1px solid rgba(232,96,10,.3);
  border-bottom: none;
  display: flex; flex-direction: column; gap: 4px;
  padding: 6px 4px; border-radius: 2px 2px 0 0;
}
.b-window-row { display: flex; gap: 3px; }
.b-win {
  width: 8px; height: 10px; border-radius: 1px;
  background: rgba(244,196,48,.7);
}
.b-win.off { background: rgba(255,255,255,.08); }
.b-accent { background: var(--saffron) !important; opacity: .9; }
.crane-arm {
  position: absolute; top: 20px; left: 50%; z-index: 2;
  width: 140px; height: 3px;
  background: linear-gradient(90deg, var(--saffron), var(--gold));
  transform-origin: left center;
  transform: rotate(-12deg);
}
.crane-arm::before {
  content: ''; position: absolute; left: 0; top: 0;
  width: 3px; height: 60px;
  background: var(--saffron);
}
.crane-cable {
  position: absolute; top: 3px; right: 10px;
  width: 1px; height: 30px; background: rgba(255,255,255,.4);
}
.b-crane-load {
  position: absolute; right: 0; bottom: -14px;
  width: 14px; height: 14px;
  background: var(--charcoal);
  border: 2px solid var(--saffron);
}

/* Services Grid */
.services-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 3rem; }
.service-card {
  background: #fff; border-radius: var(--radius);
  overflow: hidden; box-shadow: var(--shadow-sm);
  transition: transform var(--trans), box-shadow var(--trans);
  cursor: pointer;
}
.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(232,96,10,.18);
}
.service-card-bar { height: 5px; background: linear-gradient(90deg, var(--saffron), var(--gold)); }
.service-card-body { padding: 1.75rem; }
.service-icon {
  width: 52px; height: 52px; border-radius: 12px;
  background: rgba(232,96,10,.08);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 1.1rem; color: var(--saffron);
}
.service-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem; font-weight: 700;
  color: var(--text); margin-bottom: .5rem;
}
.service-desc { font-size: .88rem; color: var(--text-light); line-height: 1.7; margin-bottom: 1rem; }
.service-link {
  color: var(--saffron); font-size: .82rem; font-weight: 600;
  text-decoration: none; display: inline-flex; align-items: center; gap: .3rem;
  cursor: pointer; background: none; border: none;
  font-family: inherit; transition: gap var(--trans);
}
.service-link:hover { gap: .6rem; }

/* Why Choose MBC */
.why-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 3rem; }
.why-tile {
  padding: 2rem;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: var(--radius);
  transition: background var(--trans), border-color var(--trans);
}
.why-tile:hover { background: rgba(232,96,10,.08); border-color: rgba(232,96,10,.3); }
.why-icon {
  color: var(--saffron); margin-bottom: 1rem;
}
.why-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem; font-weight: 700; color: #fff;
  margin-bottom: .6rem;
}
.why-body { font-size: .88rem; color: var(--ash); line-height: 1.75; }

/* Stats Bar */
.stats-bar {
  background: linear-gradient(135deg, var(--saffron) 0%, #c74c00 100%);
  padding: 4rem 2rem;
}
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
.stat-item { text-align: center; }
.stat-number {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 4rem; color: #fff; line-height: 1;
  letter-spacing: .04em;
}
.stat-suffix { color: var(--gold); }
.stat-label {
  font-size: .8rem; font-weight: 600;
  letter-spacing: .18em; text-transform: uppercase;
  color: rgba(255,255,255,.75); margin-top: .4rem;
}

/* Trust Band */
.trust-band {
  background: var(--cream); padding: 5rem 2rem;
  text-align: center;
}
.trust-quote {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.3rem, 3vw, 2rem);
  font-style: italic; color: var(--text);
  max-width: 700px; margin: 0 auto 1.5rem;
  line-height: 1.6;
}
.trust-meta {
  font-size: .8rem; letter-spacing: .2em;
  text-transform: uppercase; color: var(--ash);
}

/* ─────────────── ABOUT PAGE ─────────────── */
.page-hero {
  background: var(--coal);
  padding: 10rem 2rem 5rem;
  text-align: center;
}
.breadcrumb {
  font-size: .75rem; letter-spacing: .18em;
  text-transform: uppercase; color: var(--ash);
  margin-bottom: 1rem;
}
.breadcrumb span { color: var(--saffron); }
.page-hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700; color: #fff;
}

/* Timeline */
.timeline { position: relative; max-width: 800px; margin: 3.5rem auto 0; }
.timeline::before {
  content: ''; position: absolute;
  left: 50%; top: 0; bottom: 0; width: 2px;
  background: linear-gradient(180deg, var(--saffron), var(--gold), var(--saffron));
  transform: translateX(-50%);
}
.timeline-item {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 2.5rem; margin-bottom: 3rem; align-items: center;
}
.timeline-item:nth-child(even) .tl-card { order: -1; }
.tl-card {
  background: #fff; border-radius: var(--radius);
  padding: 1.75rem; box-shadow: var(--shadow-sm);
  border-left: 4px solid var(--saffron);
}
.tl-year {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.5rem; color: var(--saffron);
  line-height: 1; margin-bottom: .4rem;
}
.tl-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem; font-weight: 700; color: var(--text);
  margin-bottom: .5rem;
}
.tl-body { font-size: .875rem; color: var(--text-light); line-height: 1.7; }
.tl-dot {
  width: 16px; height: 16px; border-radius: 50%;
  background: var(--saffron); border: 3px solid #fff;
  box-shadow: 0 0 0 3px var(--saffron);
  position: absolute; left: 50%; transform: translateX(-50%);
  margin-top: 1.5rem;
}

/* Workflow */
.workflow-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; margin-top: 3rem; position: relative; }
.workflow-steps::before {
  content: ''; position: absolute;
  top: 2.2rem; left: 12%; right: 12%; height: 2px;
  border-top: 2px dashed rgba(232,96,10,.4);
  z-index: 0;
}
.wf-step { text-align: center; position: relative; z-index: 1; padding: 0 .75rem; }
.wf-circle {
  width: 48px; height: 48px; border-radius: 50%;
  background: var(--saffron); color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem;
  margin: 0 auto 1rem; position: relative; z-index: 1;
  box-shadow: 0 0 0 6px rgba(232,96,10,.15);
}
.wf-title {
  font-weight: 700; color: var(--text);
  margin-bottom: .4rem; font-size: .95rem;
}
.wf-desc { font-size: .8rem; color: var(--text-light); line-height: 1.6; }

/* Mission Vision */
.mv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 3rem; }
.mv-card {
  padding: 2.5rem; border-radius: var(--radius);
  position: relative; overflow: hidden;
}
.mv-card.mission { background: linear-gradient(135deg, var(--charcoal), #2a1a0e); color: #fff; }
.mv-card.vision { background: linear-gradient(135deg, #0e0e2a, #1a1a3e); color: #fff; }
.mv-card::before {
  content: ''; position: absolute;
  top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--saffron), var(--gold));
}
.mv-label {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2rem; margin-bottom: 1rem;
}
.mv-card.mission .mv-label { color: var(--saffron); }
.mv-card.vision .mv-label { color: var(--gold); }
.mv-text { font-size: .9rem; line-height: 1.8; color: rgba(255,255,255,.75); }

/* Leadership */
.leader-card {
  max-width: 380px; margin: 3rem auto 0;
  background: #fff; border-radius: var(--radius);
  padding: 2.5rem; text-align: center;
  box-shadow: var(--shadow-md);
}
.leader-avatar {
  width: 100px; height: 100px; border-radius: 50%;
  background: linear-gradient(135deg, var(--saffron), var(--gold));
  margin: 0 auto 1.25rem;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Bebas Neue', sans-serif; font-size: 2.5rem;
  color: #fff; border: 4px solid rgba(232,96,10,.2);
}
.leader-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem; font-weight: 700; margin-bottom: .25rem;
}
.leader-title { color: var(--saffron); font-size: .8rem; font-weight: 600; letter-spacing: .15em; text-transform: uppercase; margin-bottom: 1rem; }
.leader-bio { font-size: .875rem; color: var(--text-light); line-height: 1.75; }

/* ─────────────── ELECTRICAL PAGE ─────────────── */
.elec-hero {
  background: var(--coal);
  padding: 10rem 2rem 6rem; text-align: center;
  position: relative; overflow: hidden;
}
.lightning-svg {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  opacity: .06;
  animation: pulse-bolt 2s ease-in-out infinite;
}
@keyframes pulse-bolt {
  0%, 100% { opacity: .06; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: .1; transform: translate(-50%, -50%) scale(1.05); }
}
.elec-cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 3rem; }
.elec-card {
  background: #fff; border-radius: var(--radius);
  padding: 2rem; box-shadow: var(--shadow-sm);
  border-top: 4px solid var(--saffron);
  transition: transform var(--trans), box-shadow var(--trans);
}
.elec-card:hover { transform: translateY(-8px); box-shadow: 0 16px 48px rgba(232,96,10,.15); }
.elec-icon {
  width: 52px; height: 52px; border-radius: 12px;
  background: rgba(232,96,10,.08);
  display: flex; align-items: center; justify-content: center;
  color: var(--saffron); margin-bottom: 1.25rem;
}
.elec-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem; font-weight: 700; margin-bottom: .6rem;
}
.elec-desc { font-size: .875rem; color: var(--text-light); line-height: 1.7; margin-bottom: 1rem; }
.elec-features { list-style: none; display: flex; flex-direction: column; gap: .4rem; }
.elec-features li {
  display: flex; align-items: center; gap: .5rem;
  font-size: .82rem; color: var(--text-light);
}
.elec-features li svg { color: var(--saffron); flex-shrink: 0; }
.safety-banner {
  background: linear-gradient(135deg, var(--saffron), #c74c00);
  padding: 3rem 2rem; text-align: center; margin-top: 4rem;
}
.safety-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
  font-weight: 700; color: #fff;
  max-width: 700px; margin: 0 auto;
}
.safety-sub { color: rgba(255,255,255,.8); font-size: .875rem; margin-top: .5rem; }

/* ─────────────── CIVIL PAGE ─────────────── */
.civil-hero {
  padding: 10rem 2rem 6rem; text-align: center;
  background: linear-gradient(135deg, #2d1a00 0%, #1a0d00 30%, var(--charcoal) 70%, var(--coal) 100%);
}
.civil-cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 3rem; }
.civil-card {
  background: #fff; border-radius: var(--radius);
  padding: 2rem; box-shadow: var(--shadow-sm);
  border-top: 4px solid var(--saffron);
  transition: transform var(--trans), box-shadow var(--trans);
}
.civil-card:hover { transform: translateY(-8px); box-shadow: 0 16px 48px rgba(232,96,10,.15); }
.materials-section { margin-top: 4rem; padding: 3rem; background: var(--warm-white); border-radius: var(--radius); }
.pill-row { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
.pill {
  padding: .55rem 1.4rem; border-radius: 50px;
  background: var(--saffron); color: #fff;
  font-size: .8rem; font-weight: 700; letter-spacing: .1em;
}
.materials-text { font-size: .9rem; color: var(--text-light); line-height: 1.8; max-width: 600px; }

/* Blueprint */
.blueprint-section {
  background: #0a1628;
  padding: 4rem 2rem; margin-top: 4rem;
  border-radius: var(--radius); overflow: hidden; position: relative;
}
.blueprint-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 80px);
  gap: 4px; max-width: 500px; margin: 0 auto;
}
.bp-room {
  border: 2px solid rgba(232,96,10,.5);
  border-style: dashed; position: relative;
}
.bp-room.solid { border-style: solid; }
.bp-room::after {
  content: attr(data-label);
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  font-size: .6rem; letter-spacing: .12em; text-transform: uppercase;
  color: rgba(232,96,10,.7);
}
.bp-label {
  text-align: center; margin-top: 1.5rem;
  font-size: .7rem; letter-spacing: .2em; text-transform: uppercase;
  color: rgba(232,96,10,.5);
}

/* ─────────────── CONTACT PAGE ─────────────── */
.contact-split {
  display: grid; grid-template-columns: 1fr 1.4fr;
  gap: 3rem; margin-top: 3rem;
}
.contact-info-card {
  display: flex; align-items: flex-start; gap: 1rem;
  padding: 1.5rem; background: #fff;
  border-radius: var(--radius); box-shadow: var(--shadow-sm);
  margin-bottom: 1rem;
}
.contact-info-icon {
  width: 44px; height: 44px; border-radius: 10px;
  background: rgba(232,96,10,.08);
  display: flex; align-items: center; justify-content: center;
  color: var(--saffron); flex-shrink: 0;
}
.contact-info-label {
  font-size: .72rem; letter-spacing: .15em; text-transform: uppercase;
  color: var(--ash); margin-bottom: .25rem;
}
.contact-info-value { font-weight: 600; font-size: .95rem; color: var(--text); line-height: 1.5; }
.contact-form {
  background: #fff; border-radius: var(--radius);
  padding: 2.5rem; box-shadow: var(--shadow-md);
}
.form-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.6rem; font-weight: 700;
  margin-bottom: 1.75rem; color: var(--text);
}
.form-group { margin-bottom: 1.25rem; }
.form-label {
  display: block; font-size: .8rem; font-weight: 600;
  color: var(--text); margin-bottom: .45rem;
  letter-spacing: .04em;
}
.form-control {
  width: 100%; padding: .8rem 1rem;
  border: 2px solid #e8e6e1; border-radius: 8px;
  font-size: .9rem; font-family: inherit;
  color: var(--text); background: var(--cream);
  transition: border-color var(--trans), box-shadow var(--trans);
  outline: none;
  resize: vertical;
}
.form-control:focus { border-color: var(--saffron); box-shadow: 0 0 0 3px rgba(232,96,10,.12); }
.form-control.error { border-color: #e53e3e; }
.form-error { font-size: .75rem; color: #e53e3e; margin-top: .35rem; display: flex; align-items: center; gap: .3rem; }
.form-submit {
  width: 100%; padding: 1rem;
  background: var(--saffron); color: #fff;
  border: none; border-radius: 8px;
  font-size: .95rem; font-weight: 700;
  font-family: inherit; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: .5rem;
  transition: background var(--trans), transform var(--trans);
}
.form-submit:hover { background: var(--saffron-light); transform: scale(1.02); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

/* Toast */
.toast {
  position: fixed; top: 1.5rem; right: 1.5rem;
  background: #1a4731; color: #fff;
  padding: 1rem 1.5rem; border-radius: var(--radius);
  border-left: 4px solid #48bb78;
  box-shadow: var(--shadow-lg);
  z-index: 2000;
  transform: translateX(120%); opacity: 0;
  transition: transform .4s cubic-bezier(.34,1.56,.64,1), opacity .4s ease;
  display: flex; align-items: center; gap: .75rem;
  font-size: .9rem; font-weight: 500;
  max-width: 340px;
}
.toast.show { transform: translateX(0); opacity: 1; }

/* Map placeholder */
.map-placeholder {
  margin-top: 3rem;
  height: 280px; border-radius: var(--radius);
  background: var(--charcoal);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 1rem;
  color: var(--ash);
}
.map-pin-icon { color: var(--saffron); }
.map-address { font-size: .85rem; text-align: center; max-width: 260px; line-height: 1.6; }

/* ─────────────── FOOTER ─────────────── */
.footer {
  background: var(--coal);
  border-top: 3px solid transparent;
  border-image: linear-gradient(90deg, var(--saffron), var(--gold), var(--saffron)) 1;
}
.footer-main {
  display: grid; grid-template-columns: 1.2fr 1fr 1fr;
  gap: 3rem; padding: 4rem 2rem;
  max-width: 1200px; margin: 0 auto;
}
.footer-brand-mark {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2rem; color: var(--saffron);
  letter-spacing: .08em; margin-bottom: .25rem;
}
.footer-brand-sub {
  font-size: .65rem; letter-spacing: .15em;
  text-transform: uppercase; color: var(--ash);
  margin-bottom: 1rem;
}
.footer-blurb { font-size: .85rem; color: var(--ash); line-height: 1.8; margin-bottom: 1.5rem; }
.footer-socials { display: flex; gap: .75rem; }
.social-icon {
  width: 36px; height: 36px; border-radius: 8px;
  background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
  display: flex; align-items: center; justify-content: center;
  color: var(--ash); cursor: pointer;
  transition: background var(--trans), color var(--trans), border-color var(--trans);
}
.social-icon:hover { background: var(--saffron); color: #fff; border-color: var(--saffron); }
.footer-heading {
  font-weight: 700; color: #fff; font-size: .9rem;
  letter-spacing: .06em; margin-bottom: 1.25rem;
}
.footer-links { list-style: none; display: flex; flex-direction: column; gap: .6rem; }
.footer-link {
  color: var(--ash); text-decoration: none; font-size: .85rem;
  cursor: pointer; background: none; border: none;
  font-family: inherit; text-align: left;
  transition: color var(--trans), padding-left var(--trans);
}
.footer-link:hover { color: var(--saffron); padding-left: 4px; }
.footer-contact-item {
  display: flex; gap: .75rem; align-items: flex-start;
  font-size: .85rem; color: var(--ash); margin-bottom: .85rem;
}
.footer-contact-item svg { color: var(--saffron); flex-shrink: 0; margin-top: 1px; }
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,.07);
  padding: 1.25rem 2rem;
  max-width: 1200px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
  font-size: .78rem; color: var(--ash);
}
.footer-bottom a { color: var(--saffron); text-decoration: none; }
.footer-gstin {
  font-family: 'DM Sans', sans-serif;
  font-size: .72rem; color: var(--ash);
  letter-spacing: .05em;
}

/* ─────────────── RESPONSIVE ─────────────── */
@media (max-width: 1023px) {
  .about-grid { grid-template-columns: 1fr; }
  .services-grid { grid-template-columns: 1fr; }
  .why-grid { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .mv-grid { grid-template-columns: 1fr; }
  .contact-split { grid-template-columns: 1fr; }
  .footer-main { grid-template-columns: 1fr; }
  .workflow-steps { grid-template-columns: 1fr 1fr; }
  .workflow-steps::before { display: none; }
  .elec-cards { grid-template-columns: 1fr; }
  .civil-cards { grid-template-columns: 1fr; }
}

@media (max-width: 767px) {
  .nav-links, .nav-cta { display: none; }
  .hamburger { display: flex; }
  .hero-badges { position: static; margin-top: 2rem; }
  .hero { clip-path: none; padding-bottom: 3rem; }
  .timeline::before { left: 1rem; }
  .timeline-item { grid-template-columns: 1fr; padding-left: 2.5rem; }
  .timeline-item:nth-child(even) .tl-card { order: unset; }
  .tl-dot { left: 1rem; }
  .stats-grid { grid-template-columns: 1fr 1fr; }
  .workflow-steps { grid-template-columns: 1fr; }
  .mv-grid { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
  .footer-bottom { flex-direction: column; gap: .5rem; text-align: center; }
  .section { padding: 4rem 1rem; }
  .hero-content { padding: 7rem 1rem 3rem; }
  .blueprint-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .stats-grid { grid-template-columns: 1fr; }
  .hero-btns { flex-direction: column; }
  .hero-btns .btn { justify-content: center; }
}
`;

/* ─────────────────────────────────────────────
   UTILITIES
───────────────────────────────────────────── */
function useIntersection(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function useCountUp(target, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return count;
}

/* Typewriter hook */
function useTypewriter(words, speed = 100, pause = 2400) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

/* FadeIn wrapper */
function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  return (
    <div
      ref={ref}
      className={`fade-in${visible ? " visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PRELOADER
───────────────────────────────────────────── */
function Preloader({ hidden }) {
  return (
    <div className={`preloader${hidden ? " hidden" : ""}`} aria-hidden={hidden}>
      <div className="preloader-inner">
        <div className="preloader-ring" />
        <span className="preloader-text">MBC</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHeroPage = page === "home";
  const navbarClass = `navbar${!isHeroPage ? " solid" : scrolled ? " scrolled" : ""}`;

  const navigate = (p) => { setPage(p); setDrawerOpen(false); window.scrollTo(0, 0); };

  return (
    <>
      <nav className={navbarClass} role="navigation" aria-label="Main navigation">
        {/* Logo */}
        <button className="nav-logo" onClick={() => navigate("home")} aria-label="Maa Bhavani Construction - Home">
          <span className="nav-logo-mark">MBC</span>
          <span className="nav-logo-sub">Maa Bhavani Construction</span>
        </button>

        {/* Desktop links */}
        <ul className="nav-links" role="list">
          <li>
            <button className={`nav-link${page === "home" ? " active" : ""}`} onClick={() => navigate("home")}>
              Home
            </button>
          </li>
          <li>
            <button className={`nav-link${page === "about" ? " active" : ""}`} onClick={() => navigate("about")}>
              About
            </button>
          </li>
          <li className="nav-dropdown">
            <button className="nav-dropdown-btn" aria-haspopup="true">
              Services <ChevronDown size={14} />
            </button>
            <div className="dropdown-menu" role="menu">
              <button className="dropdown-item" role="menuitem" onClick={() => navigate("electrical")}>
                Electrical Works
              </button>
              <button className="dropdown-item" role="menuitem" onClick={() => navigate("civil")}>
                Civil Construction
              </button>
            </div>
          </li>
          <li>
            <button className={`nav-link${page === "contact" ? " active" : ""}`} onClick={() => navigate("contact")}>
              Contact
            </button>
          </li>
        </ul>

        {/* CTA */}
        <a href="tel:+919155613400" className="nav-cta" aria-label="Call Maa Bhavani Construction">
          <Phone size={14} /> Call Now
        </a>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open mobile menu"
          aria-expanded={drawerOpen}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`drawer-overlay${drawerOpen ? " open" : ""}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <aside className={`mobile-drawer${drawerOpen ? " open" : ""}`} aria-label="Mobile navigation">
        <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
          <X size={24} />
        </button>
        <button className="drawer-link" onClick={() => navigate("home")}>Home</button>
        <button className="drawer-link" onClick={() => navigate("about")}>About</button>
        <button className="drawer-link" onClick={() => navigate("electrical")}>⚡ Electrical Works</button>
        <button className="drawer-link" onClick={() => navigate("civil")}>🏗️ Civil Construction</button>
        <button className="drawer-link" onClick={() => navigate("contact")}>Contact</button>
        <a href="tel:+919155613400" className="btn btn-primary" style={{ marginTop: "1rem", justifyContent: "center" }}>
          <Phone size={14} /> +91 91556 13400
        </a>
      </aside>
    </>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer({ setPage }) {
  const navigate = (p) => { setPage(p); window.scrollTo(0, 0); };
  return (
    <footer className="footer">
      <div className="footer-main">
        {/* Brand */}
        <div>
          <div className="footer-brand-mark">MBC</div>
          <div className="footer-brand-sub">Maa Bhavani Construction</div>
          <p className="footer-blurb">
            Bihar's trusted civil engineering and industrial electrical contractor.
            Building the future with precision, safety, and integrity since April 2022.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-icon" aria-label="Twitter"><Twitter size={16} /></a>
            <a href="#" className="social-icon" aria-label="Facebook"><Facebook size={16} /></a>
            <a href="#" className="social-icon" aria-label="LinkedIn"><Linkedin size={16} /></a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links" role="list">
            <li><button className="footer-link" onClick={() => navigate("home")}>Home</button></li>
            <li><button className="footer-link" onClick={() => navigate("about")}>About Us</button></li>
            <li><button className="footer-link" onClick={() => navigate("electrical")}>Electrical Works</button></li>
            <li><button className="footer-link" onClick={() => navigate("civil")}>Civil Construction</button></li>
            <li><button className="footer-link" onClick={() => navigate("contact")}>Contact Us</button></li>
            <li><button className="footer-link" onClick={() => navigate("contact")}>Get Free Quote</button></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="footer-heading">Contact Us</h3>
          <div className="footer-contact-item">
            <MapPin size={15} />
            <span>Gazipur, Dumri Katsari, Sheohar, Bihar – 843329</span>
          </div>
          <div className="footer-contact-item">
            <Phone size={15} />
            <span>+91 9155613400</span>
          </div>
          <div className="footer-contact-item">
            <Mail size={15} />
            <span>maabhavanisheohar@gmail.com</span>
          </div>
          <div className="footer-contact-item">
            <Clock size={15} />
            <span>Mon–Sat: 9 AM – 7 PM</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <span>© {new Date().getFullYear()} Maa Bhavani Construction. All rights reserved.</span>
        <span className="footer-gstin">GSTIN: 10ISYPK3000C1Z5</span>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   BACK TO TOP
───────────────────────────────────────────── */
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      className={`back-top${visible ? " visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll back to top"
    >
      <ChevronUp size={20} />
    </button>
  );
}

/* ─────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────── */
function StatCounter({ target, suffix = "", label }) {
  const ref = useRef(null);
  const visible = useIntersection(ref, 0.3);
  const count = useCountUp(target, 1800, visible);
  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-number">
        {count}
        <span className="stat-suffix">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function BuildingArt() {
  return (
    <div className="building-art" aria-hidden="true">
      <div className="b-sky" />
      <div className="b-ground" />
      {/* Crane */}
      <div className="crane-arm" style={{ position: "absolute", top: "24px", left: "45%" }}>
        <div className="crane-cable" />
        <div className="b-crane-load" />
      </div>
      {/* Tall tower */}
      <div className="b-tower" style={{ width: 60, height: 220 }}>
        {[...Array(7)].map((_, r) => (
          <div className="b-window-row" key={r}>
            {[...Array(3)].map((_, w) => (
              <div key={w} className={`b-win${(r + w) % 3 === 0 ? " off" : ""}`} />
            ))}
          </div>
        ))}
      </div>
      {/* Medium tower */}
      <div className="b-tower" style={{ width: 48, height: 160 }}>
        {[...Array(5)].map((_, r) => (
          <div className="b-window-row" key={r}>
            {[...Array(2)].map((_, w) => (
              <div key={w} className={`b-win${(r * w) % 2 === 0 ? " accent" : ""}`} />
            ))}
          </div>
        ))}
      </div>
      {/* Short tower */}
      <div className="b-tower" style={{ width: 42, height: 100 }}>
        {[...Array(3)].map((_, r) => (
          <div className="b-window-row" key={r}>
            {[...Array(2)].map((_, w) => (
              <div key={w} className={`b-win${r % 2 === 0 ? "" : " off"}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function HomePage({ setPage }) {
  const typeword = useTypewriter(["Precision.", "Safety.", "Excellence."], 90, 2500);
  const navigate = (p) => { setPage(p); window.scrollTo(0, 0); };

  const services = [
    { icon: <Building2 size={22} />, name: "Civil Construction", desc: "Residential, commercial & governmental structures built to last with quality materials and expert craftsmanship.", color: "#E8600A" },
    { icon: <Zap size={22} />, name: "Industrial Wiring", desc: "High-voltage HT/LT wiring solutions for industrial setups, plants, and large-scale commercial facilities.", color: "#F4C430" },
    { icon: <Layers size={22} />, name: "Panel Board Services", desc: "Design, installation, and commissioning of LT/HT panel boards compliant with IS/IEC safety standards.", color: "#E8600A" },
    { icon: <Wrench size={22} />, name: "AMC & Maintenance", desc: "Annual maintenance contracts for sustained performance of electrical and civil infrastructure assets.", color: "#F4C430" },
  ];

  const whyItems = [
    { icon: <Award size={28} />, title: "Certified Experts", body: "Our licensed engineers bring deep domain expertise with Bihar PWD and CPWD compliance knowledge." },
    { icon: <CheckCircle size={28} />, title: "Quality Materials", body: "We source only ISI-marked, premium-grade materials from verified suppliers for every project." },
    { icon: <TrendingUp size={28} />, title: "Timely Delivery", body: "Strict project timelines backed by milestone tracking and proactive communication at every stage." },
    { icon: <DollarSign size={28} />, title: "Transparent Pricing", body: "No hidden costs. Detailed BOQ and quotations before work begins — full pricing transparency always." },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero" id="hero" aria-label="Hero section">
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-eyebrow">Sheohar, Bihar</div>
          <h1 className="hero-heading">
            Shaping Bihar With
            <span className="typewriter-wrap" aria-live="polite">
              <span className="typewriter-word">{typeword}</span>
              <span className="typewriter-cursor" aria-hidden="true" />
            </span>
          </h1>
          <p className="hero-sub">
            Maa Bhavani Construction delivers trusted civil engineering and industrial
            electrical solutions across Bihar. GST-verified, government-empanelled,
            and committed to building a safer, stronger tomorrow.
          </p>
          <div className="hero-btns">
            <button className="btn btn-primary" onClick={() => navigate("civil")}>
              Our Services <ArrowRight size={16} />
            </button>
            <button className="btn btn-outline" onClick={() => navigate("contact")}>
              Get Free Quote
            </button>
          </div>
          <div className="hero-badges" aria-label="Key highlights">
            <span className="hero-badge">50+ Projects</span>
            <span className="hero-badge">GST Verified</span>
            <span className="hero-badge">Est. 2022</span>
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="section" style={{ background: "var(--cream)" }} aria-labelledby="about-heading">
        <div className="container">
          <div className="about-grid">
            <FadeIn>
              <span className="section-label">Who We Are</span>
              <h2 className="section-heading" id="about-heading">
                Bihar's Trusted Construction Partner
              </h2>
              <div className="divider" />
              <p className="about-body">
                Founded in April 2022 by <strong>Smt. Asha Kumari</strong>, Maa Bhavani
                Construction has rapidly grown into one of Sheohar district's most reliable
                contractors. We specialise in both civil engineering structures and high-grade
                industrial electrical installations, serving government bodies and private clients
                with equal dedication and zero compromise on quality.
              </p>
              <div className="about-highlights">
                <div className="about-highlight"><Shield size={18} /><span>Safety-first methodology on every project site</span></div>
                <div className="about-highlight"><Users size={18} /><span>Expert team of licensed engineers & skilled workers</span></div>
              </div>
              <button className="story-link" onClick={() => navigate("about")}>
                Learn Our Story <ArrowRight size={14} />
              </button>
            </FadeIn>
            <FadeIn delay={200}>
              <BuildingArt />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section" style={{ background: "var(--warm-white)" }} aria-labelledby="services-heading">
        <div className="container">
          <FadeIn>
            <span className="section-label">What We Do</span>
            <h2 className="section-heading" id="services-heading">Our Core Services</h2>
            <div className="divider" />
          </FadeIn>
          <div className="services-grid">
            {services.map((s, i) => (
              <FadeIn key={s.name} delay={i * 100}>
                <div className="service-card">
                  <div className="service-card-bar" style={{ background: `linear-gradient(90deg, ${s.color}, #F4C430)` }} />
                  <div className="service-card-body">
                    <div className="service-icon" style={{ background: `${s.color}15`, color: s.color }}>{s.icon}</div>
                    <h3 className="service-name">{s.name}</h3>
                    <p className="service-desc">{s.desc}</p>
                    <button className="service-link">Learn More <ArrowRight size={12} /></button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE MBC ── */}
      <section className="section" style={{ background: "var(--coal)" }} aria-labelledby="why-heading">
        <div className="container">
          <FadeIn>
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-heading light" id="why-heading">Built on Trust & Expertise</h2>
            <div className="divider" />
          </FadeIn>
          <div className="why-grid">
            {whyItems.map((item, i) => (
              <FadeIn key={item.title} delay={i * 100}>
                <div className="why-tile">
                  <div className="why-icon">{item.icon}</div>
                  <h3 className="why-title">{item.title}</h3>
                  <p className="why-body">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="stats-bar" aria-label="Company statistics">
        <div className="container">
          <div className="stats-grid">
            <StatCounter target={50} suffix="+" label="Projects Completed" />
            <StatCounter target={100} suffix="%" label="Quality Assurance" />
            <StatCounter target={2022} suffix="" label="Year Established" />
            <StatCounter target={5} suffix="+" label="Service Categories" />
          </div>
        </div>
      </div>

      {/* ── TRUST BAND ── */}
      <div className="trust-band" aria-label="Trust statement">
        <blockquote className="trust-quote">
          "Licensed, GST-verified, and government-empanelled — Maa Bhavani Construction
          stands behind every brick laid and every wire connected with accountability and pride."
        </blockquote>
        <p className="trust-meta">Quality · Trust · Growth — Our Promise to Bihar</p>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   ABOUT PAGE
───────────────────────────────────────────── */
function AboutPage({ setPage }) {
  const navigate = (p) => { setPage(p); window.scrollTo(0, 0); };
  const timeline = [
    { year: "2022", title: "Company Founded", body: "Maa Bhavani Construction was registered in April 2022 by Smt. Asha Kumari in Sheohar, Bihar, with a vision to deliver quality infrastructure." },
    { year: "2023", title: "First Government Contract", body: "Secured first Bihar state government empanelment, marking MBC's entry into public infrastructure development." },
    { year: "2024", title: "50+ Projects Milestone", body: "Crossed 50 successfully completed projects spanning civil construction and industrial electrical works across the region." },
  ];
  const workflow = [
    { num: "01", icon: <Phone size={18} />, title: "Consultation", desc: "Site visit & requirement analysis" },
    { num: "02", icon: <Layers size={18} />, title: "Blueprinting", desc: "Design, BOQ & detailed planning" },
    { num: "03", icon: <Building2 size={18} />, title: "Development", desc: "Execution with milestone tracking" },
    { num: "04", icon: <CheckCircle size={18} />, title: "Quality Check", desc: "IS/IEC compliant final inspection" },
  ];
  return (
    <>
      <div className="page-hero" aria-label="About page hero">
        <p className="breadcrumb">Home / <span>About Us</span></p>
        <h1 className="page-hero-title">Our Story & Vision</h1>
        <p style={{ color: "var(--ash)", marginTop: "1rem", maxWidth: "500px", margin: "1rem auto 0", lineHeight: 1.7 }}>
          From a humble beginning in Sheohar to becoming Bihar's dependable contractor.
        </p>
      </div>

      {/* Timeline */}
      <section className="section" style={{ background: "var(--cream)" }} aria-labelledby="timeline-heading">
        <div className="container">
          <FadeIn>
            <span className="section-label">Our Journey</span>
            <h2 className="section-heading" id="timeline-heading">Milestones That Define Us</h2>
            <div className="divider" />
          </FadeIn>
          <div className="timeline">
            {timeline.map((item, i) => (
              <div className="timeline-item" key={item.year}>
                <FadeIn delay={i * 120}>
                  <div className="tl-card">
                    <div className="tl-year">{item.year}</div>
                    <h3 className="tl-title">{item.title}</h3>
                    <p className="tl-body">{item.body}</p>
                  </div>
                </FadeIn>
                <div />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="section" style={{ background: "var(--warm-white)" }} aria-labelledby="workflow-heading">
        <div className="container">
          <FadeIn>
            <span className="section-label">How We Work</span>
            <h2 className="section-heading" id="workflow-heading">Our Process</h2>
            <div className="divider" />
          </FadeIn>
          <div className="workflow-steps">
            {workflow.map((step, i) => (
              <FadeIn key={step.num} delay={i * 100}>
                <div className="wf-step">
                  <div className="wf-circle">{step.num}</div>
                  <div style={{ color: "var(--saffron)", marginBottom: ".5rem" }}>{step.icon}</div>
                  <h3 className="wf-title">{step.title}</h3>
                  <p className="wf-desc">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section" style={{ background: "var(--charcoal)" }} aria-labelledby="mv-heading">
        <div className="container">
          <FadeIn>
            <span className="section-label" style={{ color: "var(--gold)" }}>Our Foundation</span>
            <h2 className="section-heading light" id="mv-heading">Mission & Vision</h2>
            <div className="divider" />
          </FadeIn>
          <div className="mv-grid">
            <FadeIn>
              <div className="mv-card mission">
                <div className="mv-label">Mission</div>
                <p className="mv-text">
                  To deliver safe, durable, and affordable civil and electrical infrastructure
                  across Bihar, empowering communities through quality construction that meets
                  the highest national and international standards.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <div className="mv-card vision">
                <div className="mv-label">Vision</div>
                <p className="mv-text">
                  To become Bihar's most trusted and innovative construction company, recognised
                  for our commitment to safety, transparent business practices, and sustainable
                  development of the state's infrastructure.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section" style={{ background: "var(--cream)" }} aria-labelledby="leadership-heading">
        <div className="container" style={{ textAlign: "center" }}>
          <FadeIn>
            <span className="section-label">Leadership</span>
            <h2 className="section-heading" id="leadership-heading">Meet Our Proprietor</h2>
            <div className="divider" style={{ margin: "1.25rem auto 1.75rem" }} />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="leader-card">
              <div className="leader-avatar" aria-label="Asha Kumari avatar">AK</div>
              <h3 className="leader-name">Smt. Asha Kumari</h3>
              <p className="leader-title">Proprietor & Founder</p>
              <p className="leader-bio">
                A visionary entrepreneur from Sheohar, Bihar, Smt. Asha Kumari founded Maa
                Bhavani Construction with a commitment to delivering quality construction
                services to her region. Her leadership drives the company's ethos of
                integrity, safety, and continuous growth for local communities.
              </p>
              <div style={{ marginTop: "1.25rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
                <button className="btn btn-primary" style={{ fontSize: ".8rem", padding: ".6rem 1.4rem" }} onClick={() => navigate("contact")}>
                  Get In Touch
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   ELECTRICAL PAGE
───────────────────────────────────────────── */
function ElectricalPage({ setPage }) {
  const navigate = (p) => { setPage(p); window.scrollTo(0, 0); };
  const services = [
    {
      icon: <Zap size={22} />,
      title: "Industrial HT/LT Wiring",
      desc: "Complete high-tension and low-tension wiring solutions for industrial plants, factories, and large commercial establishments.",
      features: ["11kV – 33kV HT line work", "LT distribution panels & cabling", "IS 732 compliant installations"],
    },
    {
      icon: <Layers size={22} />,
      title: "Panel Board Design",
      desc: "Custom design, fabrication, and commissioning of MCC, PCC, APFC, and distribution panels for industrial use.",
      features: ["MCC / PCC / VFD panels", "APFC power factor correction", "Type-tested enclosures"],
    },
    {
      icon: <Activity size={22} />,
      title: "Street Light Installation",
      desc: "Solar and conventional LED street lighting projects for municipalities, highways, and urban infrastructure development.",
      features: ["LED solar street lights", "Municipal tender execution", "Night-time safety compliance"],
    },
    {
      icon: <Wrench size={22} />,
      title: "AMC Contracts",
      desc: "Annual maintenance contracts for continuous monitoring, preventive maintenance, and emergency repair of electrical systems.",
      features: ["24/7 emergency response", "Preventive maintenance schedule", "IS/IEC periodic testing"],
    },
  ];
  return (
    <>
      <div className="elec-hero" aria-label="Electrical services hero">
        <svg className="lightning-svg" width="400" height="400" viewBox="0 0 100 100" aria-hidden="true">
          <polygon points="60,5 20,55 45,55 40,95 80,45 55,45" fill="var(--saffron)" />
        </svg>
        <p className="breadcrumb">Home / <span style={{ color: "var(--saffron)" }}>Electrical Works</span></p>
        <h1 className="page-hero-title">Industrial Electrical Works</h1>
        <p style={{ color: "var(--ash)", marginTop: "1rem", maxWidth: "520px", margin: "1rem auto 0", lineHeight: 1.7 }}>
          IS/IEC compliant electrical solutions for industry, government, and commercial projects across Bihar.
        </p>
      </div>

      <section className="section" style={{ background: "var(--warm-white)" }} aria-labelledby="elec-services-heading">
        <div className="container">
          <FadeIn>
            <span className="section-label">Our Specialities</span>
            <h2 className="section-heading" id="elec-services-heading">Electrical Service Range</h2>
            <div className="divider" />
          </FadeIn>
          <div className="elec-cards">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 100}>
                <div className="elec-card">
                  <div className="elec-icon">{s.icon}</div>
                  <h3 className="elec-name">{s.title}</h3>
                  <p className="elec-desc">{s.desc}</p>
                  <ul className="elec-features" aria-label={`Features of ${s.title}`}>
                    {s.features.map((f) => (
                      <li key={f}><CheckCircle size={13} />{f}</li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Safety Banner */}
          <div className="safety-banner" role="region" aria-label="Safety compliance">
            <p className="safety-text">⚡ All works are executed in strict compliance with IS 732, IS 3043, IS 10118, and IEC 60364 electrical safety standards.</p>
            <p className="safety-sub">Every installation is tested and certified by our licensed electrical supervisors before commissioning.</p>
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <FadeIn>
              <h2 className="section-heading">Ready to Start Your Electrical Project?</h2>
              <p style={{ color: "var(--text-light)", margin: "1rem 0 2rem", lineHeight: 1.7 }}>
                Contact us for a free site assessment and quotation.
              </p>
              <button className="btn btn-primary" onClick={() => navigate("contact")}>
                Get Free Quote <ArrowRight size={16} />
              </button>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   CIVIL PAGE
───────────────────────────────────────────── */
function CivilPage({ setPage }) {
  const navigate = (p) => { setPage(p); window.scrollTo(0, 0); };
  const services = [
    { icon: <Building2 size={22} />, title: "Residential Buildings", desc: "Custom homes, apartment complexes, and housing societies built with ISI-marked materials and structural integrity checks at every stage." },
    { icon: <Layers size={22} />, title: "Commercial Complexes", desc: "Office buildings, shopping complexes, and industrial sheds designed for long-term use, compliant with local municipal norms." },
    { icon: <TrendingUp size={22} />, title: "Road & Infrastructure", desc: "CC/BT road construction, culverts, drains, and retaining walls built as per PWD specifications for rural and urban development." },
    { icon: <Award size={22} />, title: "Government Projects", desc: "Experienced in executing Bihar state government tenders including schools, health centres, and public utilities under strict compliance." },
  ];
  return (
    <>
      <div className="civil-hero" aria-label="Civil construction hero">
        <p className="breadcrumb">Home / <span style={{ color: "var(--saffron)" }}>Civil Construction</span></p>
        <h1 className="page-hero-title">Civil Construction</h1>
        <p style={{ color: "var(--ash)", marginTop: "1rem", maxWidth: "520px", margin: "1rem auto 0", lineHeight: 1.7 }}>
          From foundations to finishes — delivering durable infrastructure across Bihar.
        </p>
      </div>

      <section className="section" style={{ background: "var(--warm-white)" }} aria-labelledby="civil-services-heading">
        <div className="container">
          <FadeIn>
            <span className="section-label">What We Build</span>
            <h2 className="section-heading" id="civil-services-heading">Civil Service Range</h2>
            <div className="divider" />
          </FadeIn>
          <div className="civil-cards">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 100}>
                <div className="civil-card">
                  <div className="elec-icon" style={{ color: "var(--saffron)", background: "rgba(232,96,10,.08)", width: 52, height: 52, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>{s.icon}</div>
                  <h3 className="elec-name">{s.title}</h3>
                  <p className="elec-desc">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Materials */}
          <FadeIn delay={100}>
            <div className="materials-section">
              <span className="section-label" style={{ marginBottom: "1rem", display: "block" }}>Materials Standard</span>
              <div className="pill-row">
                <span className="pill">ISI-Marked</span>
                <span className="pill">Premium Suppliers</span>
                <span className="pill">Structurally Tested</span>
              </div>
              <p className="materials-text">
                Every project uses only IS-certified cement, TMT steel bars, and tested aggregates.
                We partner with verified suppliers to ensure material quality from procurement to
                final installation — backed by test certificates where required.
              </p>
            </div>
          </FadeIn>

          {/* Blueprint Art */}
          <FadeIn delay={150}>
            <div className="blueprint-section" role="img" aria-label="Decorative floor plan illustration">
              <p style={{ textAlign: "center", color: "rgba(232,96,10,.6)", fontSize: ".7rem", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                Illustrative Floor Plan
              </p>
              <div className="blueprint-grid">
                <div className="bp-room solid" data-label="Living" style={{ gridColumn: "1 / 3" }} />
                <div className="bp-room" data-label="Kitchen" />
                <div className="bp-room solid" data-label="Bed 1" />
                <div className="bp-room solid" data-label="Bed 2" />
                <div className="bp-room" data-label="Bath" />
              </div>
              <p className="bp-label">Conceptual Layout — Not to Scale</p>
            </div>
          </FadeIn>

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <FadeIn>
              <h2 className="section-heading">Ready to Build Your Vision?</h2>
              <p style={{ color: "var(--text-light)", margin: "1rem 0 2rem", lineHeight: 1.7 }}>
                Talk to our team for a comprehensive project estimate.
              </p>
              <button className="btn btn-primary" onClick={() => navigate("contact")}>
                Contact Us <ArrowRight size={16} />
              </button>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   CONTACT PAGE
───────────────────────────────────────────── */
function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.phone.trim() || !/^\+?[\d\s\-]{7,}$/.test(form.phone)) e.phone = "Enter a valid phone number.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.service) e.service = "Please select a service.";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) { setErrors(err); return; }
    setErrors({});
    setToast(true);
    setForm({ name: "", phone: "", email: "", service: "", message: "" });
    setTimeout(() => setToast(false), 4000);
  };

  const contactItems = [
    { icon: <MapPin size={18} />, label: "Address", value: "Gazipur, Dumri Katsari, Sheohar, Bihar – 843329" },
    { icon: <Phone size={18} />, label: "Phone", value: "+91 9155613400" },
    { icon: <Mail size={18} />, label: "Email", value: "maabhavanisheohar@gmail.com" },
    { icon: <Clock size={18} />, label: "Working Hours", value: "Monday – Saturday, 9:00 AM – 7:00 PM" },
  ];

  return (
    <>
      {/* Toast */}
      <div className={`toast${toast ? " show" : ""}`} role="alert" aria-live="polite">
        <CheckCircle size={20} color="#48bb78" />
        <div>
          <div style={{ fontWeight: 700, marginBottom: ".2rem" }}>Message Sent!</div>
          <div style={{ fontSize: ".82rem", opacity: .85 }}>We'll get back to you within 24 hours.</div>
        </div>
      </div>

      <div className="page-hero">
        <p className="breadcrumb">Home / <span>Contact Us</span></p>
        <h1 className="page-hero-title">Get In Touch</h1>
        <p style={{ color: "var(--ash)", marginTop: "1rem", maxWidth: "460px", margin: "1rem auto 0", lineHeight: 1.7 }}>
          Reach out for project queries, free estimates, or any construction consultation.
        </p>
      </div>

      <section className="section" style={{ background: "var(--cream)" }} aria-labelledby="contact-heading">
        <div className="container">
          <h2 className="section-heading" id="contact-heading" style={{ display: "none" }}>Contact Section</h2>
          <div className="contact-split">
            {/* Info */}
            <div>
              <FadeIn>
                <span className="section-label">Contact Information</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 700, marginBottom: "1.5rem" }}>
                  Let's Talk About Your Project
                </h3>
              </FadeIn>
              {contactItems.map((item, i) => (
                <FadeIn key={item.label} delay={i * 80}>
                  <div className="contact-info-card">
                    <div className="contact-info-icon">{item.icon}</div>
                    <div>
                      <div className="contact-info-label">{item.label}</div>
                      <div className="contact-info-value">{item.value}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Form */}
            <FadeIn delay={100}>
              <div className="contact-form">
                <h3 className="form-title">Send Us a Message</h3>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-name">Full Name *</label>
                      <input
                        id="contact-name"
                        className={`form-control${errors.name ? " error" : ""}`}
                        type="text"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                      {errors.name && <p className="form-error"><AlertCircle size={12} />{errors.name}</p>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-phone">Phone *</label>
                      <input
                        id="contact-phone"
                        className={`form-control${errors.phone ? " error" : ""}`}
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                      {errors.phone && <p className="form-error"><AlertCircle size={12} />{errors.phone}</p>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Email Address *</label>
                    <input
                      id="contact-email"
                      className={`form-control${errors.email ? " error" : ""}`}
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    {errors.email && <p className="form-error"><AlertCircle size={12} />{errors.email}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-service">Service Interest *</label>
                    <select
                      id="contact-service"
                      className={`form-control${errors.service ? " error" : ""}`}
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                    >
                      <option value="">Select a service…</option>
                      <option value="civil">Civil Construction</option>
                      <option value="wiring">Industrial Wiring</option>
                      <option value="panel">Panel Board Services</option>
                      <option value="amc">AMC &amp; Maintenance</option>
                    </select>
                    {errors.service && <p className="form-error"><AlertCircle size={12} />{errors.service}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-message">Message *</label>
                    <textarea
                      id="contact-message"
                      className={`form-control${errors.message ? " error" : ""}`}
                      rows={5}
                      placeholder="Describe your project or requirement…"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                    {errors.message && <p className="form-error"><AlertCircle size={12} />{errors.message}</p>}
                  </div>
                  <button type="submit" className="form-submit">
                    <Send size={16} /> Send Message
                  </button>
                </form>
              </div>
            </FadeIn>
          </div>

          {/* Map Placeholder */}
          <FadeIn delay={200}>
            <div className="map-placeholder" role="img" aria-label="Location map placeholder">
              <MapPin size={40} className="map-pin-icon" />
              <p className="map-address">
                Gazipur, Dumri Katsari<br />
                Sheohar, Bihar – 843329<br />
                <strong style={{ color: "var(--saffron)" }}>PIN: 843329</strong>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */
export default function MaaBhavaniConstruction() {
  const [page, setPage] = useState("home");
  const [pageReady, setPageReady] = useState(false);
  const [preloaderHidden, setPreloaderHidden] = useState(false);

  /* Inject CSS */
  useEffect(() => {
    const tag = document.createElement("style");
    tag.id = "mbc-styles";
    tag.textContent = CSS;
    document.head.appendChild(tag);
    return () => tag.remove();
  }, []);

  /* Preloader */
  useEffect(() => {
    const t1 = setTimeout(() => setPreloaderHidden(true), 1400);
    const t2 = setTimeout(() => setPageReady(true), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  /* Page transition on navigate */
  const [pageKey, setPageKey] = useState(0);
  const [pageVisible, setPageVisible] = useState(false);

  useEffect(() => {
    setPageVisible(false);
    const t = setTimeout(() => { setPageVisible(true); }, 60);
    return () => clearTimeout(t);
  }, [page]);

  const handleSetPage = useCallback((p) => {
    setPage(p);
    setPageKey((k) => k + 1);
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Preloader hidden={preloaderHidden} />
      {pageReady && (
        <>
          <Navbar page={page} setPage={handleSetPage} />
          <main>
            <div className={`page-wrap${pageVisible ? " visible" : ""}`} key={pageKey}>
              {page === "home" && <HomePage setPage={handleSetPage} />}
              {page === "about" && <AboutPage setPage={handleSetPage} />}
              {page === "electrical" && <ElectricalPage setPage={handleSetPage} />}
              {page === "civil" && <CivilPage setPage={handleSetPage} />}
              {page === "contact" && <ContactPage />}
            </div>
          </main>
          <Footer setPage={handleSetPage} />
          <BackToTop />
        </>
      )}
    </>
  );
}
