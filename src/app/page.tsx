import Image from "next/image";
import Button from "@/components/Button";
import IndustriesCarousel from "@/components/IndustriesCarousel";
import Preloader from "@/components/Preloader";
import ServicesTabs from "@/components/ServicesTabs";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <div className="page">
      <Preloader />
      <SiteHeader />

      <section
        id="top"
        className="hero"
        data-reveal-group="entrance"
        data-reveal-delay="0.2"
      >
        <Image
          src="/assets/boardroom.jpg"
          alt="Modern boardroom with a long conference table and leather chairs"
          fill
          priority
          sizes="100vw"
          className="cover hero-img"
          data-reveal="clip-up"
        />
        <div className="hero-scrim" />
        <div className="container hero-inner flex flex-col gap-10">
          <div>
            <h1 className="hero-title" data-reveal="mask" data-reveal-at="0.5">
              Navigate Complexity with Clarity for Smarter, Sustainable Growth
            </h1>
            <p className="hero-lede">
              From finance to IT solutions and actuarial services, we deliver
              insights that drive smarter decisions.
            </p>
          </div>
          <div className="hero-actions">
            <Button
              href="#services"
              variant="light"
              className="py-5!"
              data-reveal="up"
            >
              Our Services
            </Button>
            <Button
              href="#contact"
              variant="outline"
              className="py-5!"
              data-reveal="up"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="container section section--lg">
        <div className="about-grid">
          <div className="about-media" data-reveal-group>
            <div className="about-photo" data-reveal="clip-left">
              <Image
                src="/assets/photo-team.jpg"
                alt="Latitude team collaborating around a desk"
                fill
                sizes="(max-width: 960px) 100vw, 50vw"
                className="cover about-img"
              />
            </div>
          </div>
          <div data-reveal-group>
            <h2 className="section-title about-title" data-reveal="mask">About us</h2>
            <div className="about-copy">
              <p className="about-lead" data-reveal>
                At Latitude Zimbabwe Financial Advisory, we empower businesses
                and individuals to navigate complexity with clarity. As a
                trusted consultancy, we specialize in Finance, IT Solutions,
                and Actuarial Services, delivering insights that drive smarter
                decisions and sustainable growth.
              </p>
              <p data-reveal>
                Our team blends financial expertise, technological innovation,
                and actuarial precision to provide tailored strategies that
                help clients optimize performance, manage risk, and unlock new
                opportunities. Whether it’s guiding organizations through
                financial restructuring, implementing IT-driven efficiencies,
                or applying actuarial science to forecast and safeguard the
                future, we stand as a partner in progress.
              </p>
              <p data-reveal>
                With a commitment to excellence, integrity, and innovation,
                Latitude Financial Advisory is more than a consultancy. We are
                your strategic ally in building resilience and achieving
                long-term success.
              </p>
            </div>
            <Button href="#contact" className="about-cta" data-reveal="up">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="container section" data-reveal-group>
          <div className="services-head">
            <h2 className="section-title services-title" data-reveal="mask">
              Our Services
            </h2>
          </div>
          <ServicesTabs />
        </div>
      </section>

      <section id="industries" className="container section">
        <div className="industries-grid" data-reveal-group>
          <div className="industries-copy">
            <h2 className="section-title industries-title" data-reveal="mask">
              Sector depth across Zimbabwe’s key industries.
            </h2>
            <p className="industries-lede" data-reveal>
              Every sector has its own regulations, risks and opportunities.
              We bring industry-specific insight to each engagement, so our
              advice fits the way your business actually works.
            </p>
            <Button href="#contact" className="industries-cta" data-reveal="up">
              Talk to an Expert
            </Button>
          </div>
          <IndustriesCarousel />
        </div>
      </section>

      <SiteFooter />
      <Reveal />
    </div>
  );
}
