import { generateSEO } from "@/lib/seo";
import { DeviceGrid } from "@/components/sections/device-grid";
import { CTABanner } from "@/components/sections/cta-banner";

export const metadata = generateSEO({
  title: "Compatible Devices",
  description: "ULTRASTREAM works on Fire TV, Android TV, Samsung TV, LG TV, Apple TV, iPhone, Android, MAG box, and more. Step-by-step setup guides included.",
  canonical: "https://ultrastream.tv/devices",
});

export default function DevicesPage() {
  return (
    <div className="pt-20">
      <DeviceGrid />
      <CTABanner />
    </div>
  );
}
