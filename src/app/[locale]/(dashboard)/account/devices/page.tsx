import { Wifi, Plus, Trash2, Monitor } from "lucide-react";
import { generateSEO } from "@/lib/seo";
import { MOCK_DEVICES, MOCK_SUBSCRIPTION } from "@/lib/data/mock-account";

export const metadata = generateSEO({ title: "Devices", noIndex: true });

const sub = MOCK_SUBSCRIPTION;

export default function DevicesPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Devices</h1>
        <span className="text-xs text-zinc-500">
          {sub.connectionsInUse} of {sub.connections} connections used
        </span>
      </div>

      {/* Connection usage bar */}
      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <Wifi className="w-5 h-5 text-blue-400" />
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Simultaneous connections</p>
            <p className="text-xs text-zinc-500">Your plan allows {sub.connections} devices to stream at once</p>
          </div>
          <p className="text-sm font-bold text-white">
            {sub.connectionsInUse}/{sub.connections}
          </p>
        </div>
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full gradient-brand rounded-full"
            style={{ width: `${(sub.connectionsInUse / sub.connections) * 100}%` }}
          />
        </div>
      </div>

      {/* Device list */}
      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <h2 className="font-semibold text-white mb-4">Connected devices</h2>
        <div className="space-y-3">
          {MOCK_DEVICES.map((d) => (
            <div
              key={d.name}
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl">
                  {d.type}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{d.name}</p>
                  <p className="text-xs text-zinc-500">
                    {d.ip} · last active {d.lastActive}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`flex items-center gap-1.5 text-xs ${
                    d.status === "online" ? "text-green-400" : "text-zinc-500"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      d.status === "online" ? "bg-green-400" : "bg-zinc-600"
                    }`}
                  />
                  {d.status === "online" ? "Online" : "Offline"}
                </span>
                <button
                  className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  aria-label="Remove device"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/10 text-sm text-zinc-400 hover:text-white hover:border-blue-500/30 transition-colors">
          <Plus className="w-4 h-4" />
          Connect a new device
        </button>
      </div>

      {/* Setup hint */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 flex items-start gap-4">
        <Monitor className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-white mb-1">Need help setting up a device?</p>
          <p className="text-xs text-zinc-500">
            We have step-by-step guides for Fire Stick, Smart TV, Android, iOS, and more in the{" "}
            <a href="/devices" className="text-blue-400 hover:underline">setup section</a>.
          </p>
        </div>
      </div>
    </>
  );
}
