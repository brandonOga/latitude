import Image from "next/image";
import Button from "@/components/Button";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Contact", href: "#contact" },
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#top" className="brand">
          <Image
            src="/assets/latitude-mark.png"
            alt="Latitude logo"
            width={80}
            height={80}
            className="logo"
            priority
          />
          <div className="brand-text">
            <span className="brand-name h6">Latitude</span>
            <span className="brand-sub">Zimbabwe Financial Advisory</span>
          </div>
        </a>
        <nav className="nav">
          {NAV.map(({ label, href }) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <Button href="#contact" size="sm">
          Book a consultation
        </Button>
      </div>
    </header>
  );
}
