"use client";

import { useEffect, useState } from "react";
import { Bell, Lock, User, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors ${
        enabled ? "bg-blue-500" : "bg-white/10"
      }`}
      aria-pressed={enabled}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
          enabled ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [firstName, setFirstName] = useState("Demo");
  const [lastName, setLastName] = useState("Customer");
  const [email, setEmail] = useState("you@example.com");
  const [whatsapp, setWhatsapp] = useState("+1 234 567 890");

  const [notifs, setNotifs] = useState({
    renewal: true,
    promos: false,
    newChannels: true,
    security: true,
  });

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data }) => {
        if (data.user) {
          setEmail(data.user.email ?? "");
          const m = data.user.user_metadata ?? {};
          if (m.first_name) setFirstName(m.first_name);
          if (m.last_name) setLastName(m.last_name);
        }
      });
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold text-white">Settings</h1>

      {/* Profile */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
        <h2 className="font-semibold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-blue-400" />
          Profile
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">First Name</Label>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-white/5 border-white/10 text-white h-9 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Last Name</Label>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-white/5 border-white/10 text-white h-9 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/10 text-white h-9 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">WhatsApp / Telegram</Label>
            <Input
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="bg-white/5 border-white/10 text-white h-9 text-sm"
            />
          </div>
        </div>
        <Button className="gradient-brand border-0 text-white font-semibold text-sm">
          Save changes
        </Button>
      </div>

      {/* Password */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
        <h2 className="font-semibold text-white flex items-center gap-2">
          <Lock className="w-4 h-4 text-blue-400" />
          Password
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">New password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              className="bg-white/5 border-white/10 text-white h-9 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Confirm password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              className="bg-white/5 border-white/10 text-white h-9 text-sm"
            />
          </div>
        </div>
        <Button variant="ghost" className="border border-white/10 text-zinc-300 text-sm">
          Update password
        </Button>
      </div>

      {/* Notifications */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
        <h2 className="font-semibold text-white flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-400" />
          Notifications
        </h2>
        {[
          { key: "renewal" as const, label: "Renewal reminders", desc: "Get notified before your plan expires" },
          { key: "newChannels" as const, label: "New channels & content", desc: "When we add channels or VOD" },
          { key: "promos" as const, label: "Promotions & offers", desc: "Discounts and special deals" },
          { key: "security" as const, label: "Security alerts", desc: "New device logins and changes" },
        ].map(({ key, label, desc }) => (
          <div key={key} className="flex items-center justify-between py-1">
            <div>
              <p className="text-sm text-white">{label}</p>
              <p className="text-xs text-zinc-500">{desc}</p>
            </div>
            <Toggle
              enabled={notifs[key]}
              onToggle={() => setNotifs((n) => ({ ...n, [key]: !n[key] }))}
            />
          </div>
        ))}
      </div>

      {/* Danger zone */}
      <div className="glass-card rounded-2xl p-6 border border-red-500/20 bg-red-500/[0.03]">
        <h2 className="font-semibold text-white flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          Danger zone
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white">Delete account</p>
            <p className="text-xs text-zinc-500">Permanently remove your account and data</p>
          </div>
          <Button variant="ghost" className="border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm">
            Delete account
          </Button>
        </div>
      </div>
    </>
  );
}
