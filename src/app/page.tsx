import Image from "next/image";
import ServicesTabs from "@/components/ServicesTabs";
import SiteFooter from "@/components/SiteFooter";
import { INDUSTRIES, pad } from "@/lib/content";

export default function Home() {
  return (
    <div className="page">
      <header className="site-header">
        <div className="container header-inner">
          <a href="#top" className="brand">
            <Image
              src="/assets/latitude-mark.png"
              alt="Latitude logo"
              width={52}
              height={52}
              className="brand-mark"
              priority
            />
            <div className="brand-text">
              <span className="brand-name">Latitude</span>
              <span className="brand-sub">Zimbabwe Financial Advisory</span>
            </div>
          </a>
          <nav className="nav">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#industries">Industries</a>
            <a href="#contact">Contact</a>
          </nav>
          <a href="#contact" className="btn-header">
            Book a consultation
          </a>
        </div>
      </header>

      <section id="top" className="hero">
        <Image
          src="/assets/photo-hero.jpg"
          alt="Consultant working at a laptop in a modern office"
          fill
          priority
          sizes="100vw"
          className="cover hero-img"
        />
        <div className="hero-scrim" />
        <div className="container hero-inner">
          <h1 className="hero-title">
            Navigate Complexity with Clarity for Smarter, Sustainable Growth
          </h1>
          <p className="hero-lede">
            From finance to IT solutions and actuarial services, we deliver
            insights that drive smarter decisions.
          </p>
          <div className="hero-actions">
            <a href="#services" className="pill pill--solid">
              Our Services
            </a>
            <a href="#contact" className="pill pill--outline">
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="container section section--lg">
        <div className="about-grid">
          <div className="about-media">
            <div className="about-frame" />
            <div className="about-photo">
              <Image
                src="/assets/photo-team.jpg"
                alt="Latitude team collaborating around a desk"
                fill
                sizes="(max-width: 960px) 100vw, 600px"
                className="cover about-img"
              />
            </div>
            <div className="about-badge">
              <span className="about-badge-text">
                Finance · IT Solutions · Actuarial
              </span>
            </div>
          </div>
          <div>
            <h2 className="section-title about-title">
              More than a consultancy — <em>your strategic ally.</em>
            </h2>
            <div className="about-copy">
              <p className="about-lead">
                At Latitude Zimbabwe Financial Advisory, we empower businesses
                and individuals to navigate complexity with clarity. As a
                trusted consultancy, we specialize in Finance, IT Solutions,
                and Actuarial Services, delivering insights that drive smarter
                decisions and sustainable growth.
              </p>
              <p>
                Our team blends financial expertise, technological innovation,
                and actuarial precision to provide tailored strategies that
                help clients optimize performance, manage risk, and unlock new
                opportunities. Whether it’s guiding organizations through
                financial restructuring, implementing IT-driven efficiencies,
                or applying actuarial science to forecast and safeguard the
                future, we stand as a partner in progress.
              </p>
              <p>
                With a commitment to excellence, integrity, and innovation,
                Latitude Financial Advisory is more than a consultancy — we are
                your strategic ally in building resilience and achieving
                long-term success.
              </p>
            </div>
            <div className="values">
              <div className="value">Excellence</div>
              <div className="value">Integrity</div>
              <div className="value">Innovation</div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="container section">
          <div className="services-head">
            <h2 className="section-title services-title">
              Three disciplines. <em>One partner in progress.</em>
            </h2>
          </div>
          <ServicesTabs />
        </div>
      </section>

      <section id="industries" className="container section">
        <div className="industries-grid">
          <div>
            <h2 className="section-title industries-title">
              Sector depth across Zimbabwe’s key industries.
            </h2>
            <div className="industries-photo">
              <Image
                src="/assets/photo-office.jpg"
                alt="Bright open-plan office"
                fill
                sizes="(max-width: 860px) 100vw, 600px"
                className="cover"
              />
            </div>
          </div>
          <ul className="industry-list">
            {INDUSTRIES.map((name, i) => (
              <li key={name} className="industry">
                <span className="industry-num">{pad(i + 1)}</span>
                <span className="industry-name">{name}</span>
                <span className="industry-arrow" aria-hidden="true">
                  →
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
