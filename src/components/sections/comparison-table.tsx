import { Check, X } from "lucide-react";

const ROWS = [
  { feature: "Live Channels", us: "110,000+", cable: "~200", competitor: "~50,000" },
  { feature: "4K UHD Quality", us: true, cable: false, competitor: "partial" },
  { feature: "Price per Month", us: "$7.50", cable: "$80–150", competitor: "$15–25" },
  { feature: "Free Trial", us: "24 hours", cable: false, competitor: "partial" },
  { feature: "Long-term Contracts", us: false, cable: true, competitor: false },
  { feature: "Devices Supported", us: "9+ types", cable: "1–2 boxes", competitor: "3–5 types" },
  { feature: "International Channels", us: "150+ countries", cable: "Local only", competitor: "Limited" },
  { feature: "VOD Library", us: "170,000+", cable: "Limited", competitor: "~60,000" },
  { feature: "Setup Time", us: "< 1 minute", cable: "Days/weeks", competitor: "~10 minutes" },
  { feature: "24/7 Support", us: true, cable: "Business hours", competitor: "partial" },
  { feature: "No Hidden Fees", us: true, cable: false, competitor: true },
  { feature: "Money-Back Guarantee", us: "7 days", cable: false, competitor: "Varies" },
];

function Cell({ value }: { value: string | boolean | undefined }) {
  if (value === true) return <Check className="w-5 h-5 text-green-400 mx-auto" />;
  if (value === false) return <X className="w-5 h-5 text-red-400 mx-auto" />;
  if (typeof value === "string") return <span className="text-sm text-zinc-300">{value}</span>;
  return <span className="text-xs text-zinc-500">—</span>;
}

export function ComparisonTable() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">Comparison</p>
          <h2 className="text-4xl font-bold text-white mb-4">
            Us vs Cable vs Competitors
          </h2>
          <p className="text-zinc-400">See why 50,000+ customers chose ULTRASTREAM.</p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-sm font-semibold text-zinc-400 w-1/3">Feature</th>
                <th className="p-4 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg gradient-brand text-white text-sm font-bold">
                    ULTRASTREAM
                  </div>
                </th>
                <th className="p-4 text-center text-sm font-semibold text-zinc-400">Cable / Satellite</th>
                <th className="p-4 text-center text-sm font-semibold text-zinc-400">Competitors</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={row.feature}
                  className={`border-b border-white/5 ${i % 2 === 0 ? "bg-white/[0.01]" : ""} hover:bg-white/[0.03] transition-colors`}
                >
                  <td className="p-4 text-sm text-zinc-300 font-medium">{row.feature}</td>
                  <td className="p-4 text-center">
                    <Cell value={row.us} />
                  </td>
                  <td className="p-4 text-center">
                    <Cell value={row.cable} />
                  </td>
                  <td className="p-4 text-center">
                    <Cell value={row.competitor} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
