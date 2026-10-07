"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Camera, Check, ChevronDown, Clock3, Droplets, Mail, MapPin, Menu, MessageCircle, Phone, ShieldCheck, Sparkles, X } from "lucide-react";

const services = [
  { id: "01", eyebrow: "Habitacle", title: "Intérieur", text: "Textiles, cuir, plastiques et zones complexes : un nettoyage construit autour de l’état réel de votre habitacle.", price: "Dès 169 CHF", image: "/images/interior.webp", icon: Sparkles },
  { id: "02", eyebrow: "Carrosserie", title: "Extérieur", text: "Prélavage, lavage manuel et décontamination pour retrouver une carrosserie propre, lisse et nette.", price: "Dès 99 CHF", image: "/images/exterior.webp", icon: Droplets },
  { id: "03", eyebrow: "Correction", title: "Polissage", text: "Correction ciblée des micro-rayures et hologrammes pour révéler la profondeur et la clarté de la peinture.", price: "Sur diagnostic", image: "/images/polishing.webp", icon: Sparkles },
  { id: "04", eyebrow: "Protection", title: "Céramique", text: "Une barrière hydrophobe durable qui sublime le rendu et simplifie chaque futur entretien.", price: "Sur diagnostic", image: "/images/ceramic.webp", icon: ShieldCheck },
];

const faqs = [
  ["Comment choisir la bonne prestation ?", "Décrivez-nous l’état du véhicule, votre usage et le résultat recherché. Avec quelques photos, nous vous recommandons uniquement le niveau de soin réellement utile."],
  ["Le devis est-il gratuit ?", "Oui. La première estimation est gratuite et sans engagement. Le tarif final dépend du véhicule, de son état et du niveau d’intervention retenu."],
  ["Travaillez-vous seulement à l’atelier ?", "Non. Selon la prestation, nous pouvons intervenir à domicile ou organiser une collecte. Les travaux qui exigent un environnement contrôlé sont réalisés à Corseaux."],
  ["Combien de temps faut-il prévoir ?", "Une prestation peut durer quelques heures. Une correction ou une protection complète peut nécessiter un ou plusieurs jours. La durée est confirmée avant le rendez-vous."],
];

function Wordmark() {
  return <a href="#top" className="wordmark" aria-label="Car Chic, accueil"><span className="mark">CC</span><span><b>CAR CHIC</b><small>DETAILING · CORSEAUX</small></span></a>;
}

function Reveal({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return <div className={`reveal ${className}`} style={style}>{children}</div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [slider, setSlider] = useState(54);
  const [openFaq, setOpenFaq] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => setLoaded(true), 1150);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.14 });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    const pointer = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
      document.documentElement.style.setProperty("--mx", `${(event.clientX / innerWidth - .5) * 18}px`);
      document.documentElement.style.setProperty("--my", `${(event.clientY / innerHeight - .5) * 12}px`);
      const card = (event.target as HTMLElement).closest<HTMLElement>(".tilt-card");
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--rx", `${-((event.clientY - rect.top) / rect.height - .5) * 5}deg`);
        card.style.setProperty("--ry", `${((event.clientX - rect.left) / rect.width - .5) * 5}deg`);
      }
    };
    const onScroll = () => {
      document.documentElement.style.setProperty("--scroll", `${window.scrollY}px`);
      const total = document.body.scrollHeight - innerHeight;
      document.documentElement.style.setProperty("--progress", `${total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0}%`);
      document.querySelector(".site-header")?.classList.toggle("scrolled", window.scrollY > 80);
    };
    window.addEventListener("pointermove", pointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    return () => { window.clearTimeout(loadingTimer); observer.disconnect(); window.removeEventListener("pointermove", pointer); window.removeEventListener("scroll", onScroll); };
  }, []);

  const active = useMemo(() => services[activeService], [activeService]);

  return <main id="top">
    <div className={`preloader ${loaded ? "loaded" : ""}`} aria-hidden="true"><div className="preloader-mark">CC</div><div className="preloader-copy"><b>CAR CHIC</b><span>PRÉCISION EN MOUVEMENT</span></div><div className="preloader-line" /></div>
    <div className="cursor-glow" aria-hidden="true" />
    <div className="scroll-progress" aria-hidden="true" />
    <header className="site-header"><Wordmark /><nav className="desktop-nav" aria-label="Navigation principale"><a href="#expertise">Expertise</a><a href="#methode">Méthode</a><a href="#mobilite">Mobilité</a><a href="#atelier">Atelier</a></nav><a className="header-cta" href="#devis">Demander un devis</a><button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Ouvrir le menu"><Menu /></button></header>
    <div className={`menu-panel ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}><button onClick={() => setMenuOpen(false)} aria-label="Fermer le menu"><X /></button><div className="menu-links">{[["expertise","Expertise"],["methode","Méthode"],["mobilite","Mobilité"],["atelier","Atelier"],["devis","Devis"]].map(([id,label],i) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}><span>0{i+1}</span>{label}</a>)}</div><p>Route de Lavaux 51B · 1802 Corseaux</p></div>

    <section className="hero"><div className="hero-media" aria-hidden="true" /><div className="hero-shade" aria-hidden="true" /><div className="hero-grid" aria-hidden="true" /><div className="hero-orbit" aria-hidden="true"><span>DETAILING · POLISSAGE · PROTECTION · </span></div><div className="hero-copy"><p className="kicker"><span />Car Chic · Corseaux / Vevey</p><h1><span>CHAQUE DÉTAIL.</span><span>UNE DIFFÉRENCE.</span></h1><p className="hero-lead">Detailing automobile, correction de peinture et protection céramique. Une intervention précise, pensée pour votre véhicule — jamais une formule imposée.</p><div className="hero-actions"><a className="button button-primary magnetic" href="#devis">Obtenir mon estimation</a><a className="text-link" href="#expertise">Explorer les prestations</a></div></div><div className="hero-stats"><div><b>2022</b><span>Atelier indépendant</span></div><div><b>24 h</b><span>Réponse habituelle</span></div><div><b>100%</b><span>Sur rendez-vous</span></div></div><a className="scroll-cue" href="#expertise"><span>Découvrir</span><i /></a></section>
    <div className="kinetic-strip" aria-hidden="true"><div><span>DETAILING DE PRÉCISION</span><i>✦</i><span>CORSEAUX · VEVEY</span><i>✦</i><span>CHAQUE DÉTAIL COMPTE</span><i>✦</i><span>DETAILING DE PRÉCISION</span><i>✦</i><span>CORSEAUX · VEVEY</span><i>✦</i></div></div>

    <section className="manifesto section-pad"><Reveal className="manifesto-top"><p className="kicker dark"><span />Notre philosophie</p><p className="index">01 / 06</p></Reveal><Reveal><h2>Nous ne lavons pas simplement une voiture. <em>Nous révélons ce qui la rend unique.</em></h2></Reveal><Reveal className="manifesto-bottom"><p>Deux véhicules identiques ne demandent jamais exactement la même intervention. Nous observons les matériaux, les défauts, votre usage et le résultat attendu avant de recommander quoi que ce soit.</p><div className="signature">CAR CHIC <span>— depuis 2022</span></div></Reveal></section>

    <section id="expertise" className="services section-pad dark-section"><Reveal className="section-heading light-heading"><div><p className="kicker"><span />Nos expertises</p><h2>LE BON SOIN.<br />AU BON ENDROIT.</h2></div><p>Quatre expertises complémentaires, un seul niveau d’exigence. Choisissez une prestation ou laissez-nous vous orienter.</p></Reveal><div className="service-stage reveal"><div className="service-image-wrap">{services.map((service,i) => <img key={service.id} className={i === activeService ? "active" : ""} src={service.image} alt={`Service Car Chic : ${service.title}`} />)}<div className="service-counter">{active.id}<span>/ 04</span></div></div><div className="service-list">{services.map((service,i) => { const Icon = service.icon; return <button key={service.id} className={i === activeService ? "active" : ""} onMouseEnter={() => setActiveService(i)} onClick={() => setActiveService(i)}><span className="service-num">{service.id}</span><Icon aria-hidden="true" /><span className="service-label"><small>{service.eyebrow}</small><b>{service.title}</b></span><span className="service-plus">{i === activeService ? "—" : "+"}</span><span className="service-detail"><span>{service.text}</span><strong>{service.price}</strong></span></button>})}</div></div></section>

    <section id="methode" className="result section-pad"><Reveal className="section-heading"><div><p className="kicker dark"><span />Le résultat</p><h2>VOYEZ LA<br />DIFFÉRENCE.</h2></div><p>Déplacez le curseur pour explorer l’impact visuel d’une finition précise sur une carrosserie marquée.</p></Reveal><Reveal className="compare" style={{ "--split": `${slider}%` } as React.CSSProperties}><img src="/images/polishing.webp" alt="Polissage automobile Car Chic" /><div className="compare-before"><img src="/images/polishing.webp" alt="" /></div><span className="compare-label before">Avant</span><span className="compare-label after">Après</span><div className="compare-line"><span>↔</span></div><input aria-label="Comparer avant et après" type="range" min="8" max="92" value={slider} onChange={(e) => setSlider(Number(e.target.value))} /></Reveal><div className="process-grid">{[["01","Diagnostic","Nous observons l’état, les matières et vos priorités."],["02","Recommandation","Une proposition lisible, utile et sans surplus."],["03","Intervention","Chaque surface reçoit la méthode appropriée."],["04","Contrôle","La finition est inspectée avant chaque restitution."]].map(([n,title,text]) => <Reveal key={n} className="process-card"><span>{n}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div></section>

    <section id="mobilite" className="mobility"><div className="mobility-card tilt-card"><img src="/images/toyota.webp" alt="Toyota Yaris disponible à la location chez Car Chic" /><div className="mobility-overlay" /><div className="mobility-copy"><span>01 / LOCATION</span><h2>RESTEZ<br />MOBILE.</h2><p>Une solution locale, simple et flexible pour vos déplacements quotidiens.</p><a href="#devis">Voir les disponibilités</a></div></div><div className="mobility-card tilt-card"><img src="/images/fiat.webp" alt="Fiat 1100 Speciale proposée par Car Chic" /><div className="mobility-overlay" /><div className="mobility-copy"><span>02 / ACHAT & VENTE</span><h2>CHANGEZ<br />D’HORIZON.</h2><p>Estimation, reprise ou recherche : un interlocuteur unique, ici à Corseaux.</p><a href="#devis">Parler de mon véhicule</a></div></div></section>

    <section id="atelier" className="atelier section-pad"><div className="atelier-visual reveal"><img src="/images/supercar.webp" alt="Detailing d’une supercar chez Car Chic" /><div className="atelier-badge"><b>CAR<br />CHIC</b><span>CORSEAUX</span></div></div><Reveal className="atelier-copy"><p className="kicker dark"><span />L’atelier</p><h2>EXIGEANT,<br />PAS COMPLIQUÉ.</h2><p>Un atelier indépendant né d’une conviction simple : le haut niveau de finition doit rester humain, lisible et adapté à chaque conducteur.</p><ul><li><Check />Conseils personnalisés avant intervention</li><li><Check />Atelier, domicile ou collecte selon le besoin</li><li><Check />Produits et méthodes adaptés à chaque surface</li></ul><div className="contact-chips"><a href="tel:+41763911719"><Phone />+41 76 391 17 19</a><a href="https://maps.google.com/?q=Route+de+Lavaux+51B+1802+Corseaux" target="_blank" rel="noreferrer"><MapPin />Corseaux</a></div></Reveal></section>

    <section className="testimonials section-pad dark-section"><Reveal className="quote-mark">“</Reveal><Reveal className="quote"><p>Excellent travail. Le propriétaire est très arrangeant et s’investit réellement pour garantir le résultat.</p><div><span>★★★★★</span><b>NOORAYNA J.</b><small>Avis client</small></div></Reveal></section>

    <section className="faq section-pad"><Reveal className="section-heading"><div><p className="kicker dark"><span />Questions fréquentes</p><h2>AVANT DE NOUS<br />CONFIER VOTRE VÉHICULE.</h2></div></Reveal><div className="faq-list">{faqs.map(([question,answer],i) => <Reveal key={question} className={`faq-item ${openFaq === i ? "open" : ""}`}><button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span>0{i+1}</span><b>{question}</b><ChevronDown /></button><div><p>{answer}</p></div></Reveal>)}</div></section>

    <section id="devis" className="contact-section section-pad"><Reveal className="contact-intro"><p className="kicker"><span />Votre prochain rendez-vous</p><h2>QUEL RÉSULTAT<br />RECHERCHEZ-VOUS ?</h2><p>Décrivez votre véhicule et son état. Nous vous répondrons avec une première recommandation claire, gratuitement et sans engagement.</p><a className="whatsapp" href="https://wa.me/41763911719" target="_blank" rel="noreferrer"><MessageCircle />Discuter sur WhatsApp</a></Reveal><Reveal className="contact-form-wrap"><form action="mailto:info@carchic.ch" method="post" encType="text/plain"><label><span>Votre nom</span><input name="Nom" required placeholder="Jean Dupont" /></label><label><span>Téléphone</span><input name="Telephone" required type="tel" placeholder="+41 79 000 00 00" /></label><label className="full"><span>Votre véhicule</span><input name="Vehicule" required placeholder="Marque, modèle et année" /></label><label className="full"><span>Le résultat recherché</span><textarea name="Besoin" required rows={3} placeholder="Décrivez son état, vos attentes et la prestation envisagée…" /></label><button className="button button-primary" type="submit">Préparer ma demande</button><small>Envoi via votre application e-mail. Réponse habituelle sous 24 h ouvrées.</small></form></Reveal></section>

    <footer><div className="footer-top"><Wordmark /><div><p>Un véhicule net.<br />Une finition juste.<br />Un service humain.</p></div></div><div className="footer-grid"><div><span>Navigation</span><a href="#expertise">Expertise</a><a href="#methode">Méthode</a><a href="#mobilite">Mobilité</a><a href="#atelier">Atelier</a></div><div><span>Contact</span><a href="tel:+41763911719"><Phone />+41 76 391 17 19</a><a href="mailto:info@carchic.ch"><Mail />info@carchic.ch</a><a href="https://instagram.com" target="_blank" rel="noreferrer"><Camera />Instagram</a></div><div><span>Atelier</span><p><MapPin />Route de Lavaux 51B<br />1802 Corseaux</p><p><Clock3 />Lun–Ven · 08:00–18:00<br />Sam · 09:00–13:00</p></div><div><span>Prendre rendez-vous</span><a className="footer-cta" href="#devis"><CalendarDays />Demander un devis</a></div></div><div className="footer-bottom"><span>© 2026 Car Chic</span><span>Site concept · Tous droits réservés</span><a href="#top">Retour en haut</a></div></footer>
  </main>;
}
