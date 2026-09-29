import Image from "next/image";
import Button from "@/components/Button";
import IndustriesCarousel from "@/components/IndustriesCarousel";
import ServicesTabs from "@/components/ServicesTabs";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <div className="page">
      <SiteHeader />

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
        <div className="container hero-inner flex flex-col gap-10">
          <h1 className="hero-title">
            Navigate Complexity with Clarity for Smarter, Sustainable Growth
          </h1>
          {/*
          <p className="hero-lede">
            From finance to IT solutions and actuarial services, we deliver
            insights that drive smarter decisions.
          </p>]
          */}
          <div className="hero-actions">
            <Button href="#services" variant="light" className="py-5!">
              Our Services
            </Button>
            <Button href="#contact" variant="outline" className="py-5!">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="container section section--lg">
        <div className="about-grid">
          <div className="about-media">
            <div className="about-photo">
              <Image
                src="/assets/photo-team.jpg"
                alt="Latitude team collaborating around a desk"
                fill
                sizes="(max-width: 960px) 100vw, 50vw"
                className="cover about-img"
              />
            </div>
          </div>
          <div>
            <h2 className="section-title about-title">About us</h2>
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
            <Button href="#contact" className="about-cta">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="container section">
          <div className="services-head">
            <h2 className="section-title services-title">
              Our Services
            </h2>
          </div>
          <ServicesTabs />
        </div>
      </section>

      <section id="industries" className="container section">
        <div className="industries-grid">
          <div className="industries-copy">
            <h2 className="section-title industries-title">
              Sector depth across Zimbabwe’s key industries.
            </h2>
            <p className="industries-lede">
              Every sector has its own regulations, risks and opportunities.
              We bring industry-specific insight to each engagement, so our
              advice fits the way your business actually works.
            </p>
            <Button href="#contact" className="industries-cta">
              Talk to an Expert
            </Button>
          </div>
          <IndustriesCarousel />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
