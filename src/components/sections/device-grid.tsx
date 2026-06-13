import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DEVICES } from "@/lib/data/devices";

export function DeviceGrid() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">Compatibility</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            One subscription.{" "}
            <span className="gradient-brand-text">Every screen.</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Works on every device you already own. Setup takes under 5 minutes — step-by-step guide included.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {DEVICES.map((device) => (
            <Link
              key={device.slug}
              href={`/devices/${device.slug}`}
              className="glass-card rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-200 group text-center flex flex-col items-center gap-3"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: device.bgColor + "22" }}
              >
                {device.icon}
              </div>
              <div>
                <p className="font-semibold text-white text-sm mb-0.5">{device.name}</p>
                <p className="text-xs text-zinc-500">{device.os}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Install guide</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
