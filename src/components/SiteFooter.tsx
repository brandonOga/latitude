import Image from "next/image";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaLocationDot,
  FaPhoneVolume,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import ContactForm from "@/components/ContactForm";

const CHANNELS = [
  {
    icon: FaWhatsapp,
    title: "Send us a message",
    label: "+263 77 000 0000",
    href: "https://wa.me/263770000000",
  },
  {
    icon: FaPhoneVolume,
    title: "Call us",
    label: "+263 71 000 0000",
    href: "tel:+263710000000",
  },
  {
    icon: FaEnvelope,
    title: "Send an email",
    label: "info.latitude@gmail.com",
    href: "mailto:info.latitude@gmail.com",
  },
  {
    icon: FaLocationDot,
    title: "Visit us",
    label: "6 Rivonia Road, Mt Pleasant, Harare",
    href: "https://maps.google.com/?q=6+Rivonia+Road,+Mt+Pleasant,+Harare",
  },
];

// TODO: replace with the real profile URLs.
const SOCIALS = [
  { icon: FaFacebookF, label: "Facebook", href: "#" },
  { icon: FaXTwitter, label: "X", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div id="contact" className="footer-main">
        <Image
          src="/assets/photo-finance.jpg"
          alt=""
          fill
          sizes="100vw"
          className="cover footer-bg"
        />
        <div className="footer-scrim" />
        <div className="container footer-content">
          <div className="footer-contact">
            <h2 className="footer-title">Get in Touch</h2>

            <div className="channels">
              {CHANNELS.map(({ icon: Icon, title, label, href }) => (
                <a key={title} href={href} className="channel">
                  <Icon className="channel-icon" aria-hidden="true" />
                  <h3 className="channel-title h6">{title}</h3>
                  <span className="channel-label">{label}</span>
                </a>
              ))}
            </div>

            <h3 className="socials-title h4">Find us on social media</h3>
            <div className="socials">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} className="social" aria-label={label}>
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <ContactForm />
        </div>
      </div>

      <div className="footnote">
        <div className="container footnote-inner">
          <span className="text-base!">© 2026 Latitude Zimbabwe Financial Advisory (Pvt) Ltd</span>
        </div>
      </div>
    </footer>
  );
}
