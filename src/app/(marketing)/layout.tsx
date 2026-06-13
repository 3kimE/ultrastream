import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingSupport } from "@/components/shared/floating-support";
import { CookieConsent } from "@/components/shared/cookie-consent";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingSupport />
      <CookieConsent />
    </>
  );
}
