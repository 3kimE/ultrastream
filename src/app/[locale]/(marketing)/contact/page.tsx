import { generateSEO } from "@/lib/seo";
import { ContactForm } from "@/components/forms/contact-form";
import { MessageCircle, Send, Mail, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata = generateSEO({
  title: "Contact Us",
  description: "Get in touch with ULTRASTREAM support. Average response time: 4 minutes via WhatsApp or Telegram.",
  canonical: "https://ultrastream.tv/contact",
});

export default function ContactPage() {
  return (
    <div className="pt-20 min-h-screen">
      <section className="py-16 px-4 sm:px-6 border-b border-white/5 bg-surface/30">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">Support</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            We&apos;re here to <span className="gradient-brand-text">help</span>
          </h1>
          <p className="text-zinc-400">Avg. response time: 4 minutes. 24/7, 365 days a year.</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Left */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Contact options</h2>

            {[
              {
                icon: MessageCircle,
                title: "WhatsApp (Fastest)",
                desc: "Instant replies. Best for setup help and urgent issues.",
                value: SITE_CONFIG.whatsapp,
                color: "text-green-400",
                bg: "bg-green-500/10 border-green-500/20",
                href: `https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}`,
              },
              {
                icon: Send,
                title: "Telegram",
                desc: "Great for screenshots and video sharing.",
                value: SITE_CONFIG.telegram,
                color: "text-blue-400",
                bg: "bg-blue-500/10 border-blue-500/20",
                href: `https://t.me/${SITE_CONFIG.telegram.replace("@", "")}`,
              },
              {
                icon: Mail,
                title: "Email",
                desc: "Best for billing inquiries and formal requests.",
                value: SITE_CONFIG.email,
                color: "text-purple-400",
                bg: "bg-purple-500/10 border-purple-500/20",
                href: `mailto:${SITE_CONFIG.email}`,
              },
            ].map(({ icon: Icon, title, desc, value, color, bg, href }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 p-5 rounded-2xl ${bg} border glass-card hover:scale-[1.01] transition-all`}
              >
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{title}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{desc}</p>
                  <p className={`text-xs font-medium mt-1 ${color}`}>{value}</p>
                </div>
              </a>
            ))}

            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <Clock className="w-5 h-5 text-zinc-400 shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">Support hours</p>
                <p className="text-xs text-zinc-500">24/7, including weekends and holidays</p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="glass-card rounded-3xl p-8 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6">Send a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
