import { CreditCard, Download, Calendar } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { generateSEO } from "@/lib/seo";
import { MOCK_PAYMENT_METHOD, MOCK_INVOICES, MOCK_SUBSCRIPTION } from "@/lib/data/mock-account";

export const metadata = generateSEO({ title: "Billing", noIndex: true });

const pm = MOCK_PAYMENT_METHOD;
const sub = MOCK_SUBSCRIPTION;

export default function BillingPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-white">Billing</h1>

      {/* Next charge + payment method */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="glass-card rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-blue-400" />
            <p className="text-sm font-medium text-white">Next renewal</p>
          </div>
          <p className="text-2xl font-bold text-white">{sub.expiresAt}</p>
          <p className="text-xs text-zinc-500 mt-1">
            {sub.autoRenew ? `Auto-renews at $${sub.price}` : "Auto-renew is off"}
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="w-4 h-4 text-blue-400" />
            <p className="text-sm font-medium text-white">Payment method</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white">
              {pm.brand}
            </div>
            <p className="text-sm text-zinc-300 font-mono">•••• {pm.last4}</p>
            <p className="text-xs text-zinc-500">exp {pm.expiry}</p>
          </div>
          <button className="mt-3 text-xs text-blue-400 hover:text-blue-300">
            Update payment method
          </button>
        </div>
      </div>

      {/* Invoice history */}
      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <h2 className="font-semibold text-white mb-4">Billing history</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-zinc-500 uppercase tracking-wider border-b border-white/5">
                <th className="pb-3 font-medium">Invoice</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Plan</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_INVOICES.map((inv) => (
                <tr key={inv.id} className="border-b border-white/5 last:border-0">
                  <td className="py-3 font-mono text-xs text-zinc-400">{inv.id}</td>
                  <td className="py-3 text-zinc-300">{inv.date}</td>
                  <td className="py-3 text-zinc-300">{inv.plan}</td>
                  <td className="py-3 text-white font-medium">${inv.amount}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 text-xs font-medium">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                      aria-label="Download receipt"
                    >
                      <Download className="w-3.5 h-3.5" />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-zinc-600">
        Questions about a charge?{" "}
        <Link href="/contact" className="text-blue-400 hover:underline">Contact billing support</Link>.
      </p>
    </>
  );
}
