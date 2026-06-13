import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  contact: z.string().min(3),
  device: z.string().min(1),
  connections: z.enum(["1", "2", "3"]),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Send email via Resend (stub — replace with real API key)
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "ULTRASTREAM <noreply@ultrastream.tv>",
        to: [data.email],
        subject: "Your ULTRASTREAM Free Trial is Ready!",
        html: `
          <h2>Welcome to ULTRASTREAM!</h2>
          <p>Your 24-hour free trial has been activated.</p>
          <p>Your trial credentials will be delivered to you shortly via email and ${data.contact}.</p>
          <p><strong>Device:</strong> ${data.device}</p>
          <p><strong>Connections:</strong> ${data.connections}</p>
          <p>Need help with setup? Reply to this email or contact us on WhatsApp.</p>
        `,
      });

      // Also notify internal team
      await resend.emails.send({
        from: "ULTRASTREAM Trials <noreply@ultrastream.tv>",
        to: [process.env.ADMIN_EMAIL ?? "admin@ultrastream.tv"],
        subject: `New Trial Request: ${data.email}`,
        html: `
          <p>New trial request:</p>
          <ul>
            <li>Email: ${data.email}</li>
            <li>Contact: ${data.contact}</li>
            <li>Device: ${data.device}</li>
            <li>Connections: ${data.connections}</li>
          </ul>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    console.error("Trial API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
