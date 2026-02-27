import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { Resend } from "resend";

const OWNER_EMAIL = "renebetancourtiii@gmail.com";

const DEMO_DAY_INFO: Record<string, string> = {
  "Saturday, March 15 · Group Ride #1": "March 15, 2026",
  "Saturday, March 22 · Group Ride #2": "March 22, 2026",
  "Saturday, April 5 · Group Ride #3": "April 5, 2026",
  "Saturday, April 19 · Group Ride #4": "April 19, 2026",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow CORS from same origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.STRIPE_SECRET_KEY || !process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "Server not configured yet. Please try again later." });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { name, email, demoDay } = req.body as {
    name: string;
    email: string;
    demoDay?: string;
  };

  if (!email || !name) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  try {
    // Check if customer already exists in Stripe
    const existing = await stripe.customers.list({ email, limit: 1 });
    if (existing.data.length > 0) {
      return res.status(409).json({ error: "This email is already reserved." });
    }

    // Create Stripe Customer — stores the reservation, can charge later
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        reserved_at: new Date().toISOString(),
        demo_day: demoDay || "none",
        source: "mutant-landing-page",
        status: "reserved",
      },
    });

    // Notify the owner
    await resend.emails.send({
      from: "Mutant Reservations <onboarding@resend.dev>",
      to: OWNER_EMAIL,
      subject: `🏍️ New Reservation: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111;">New Mutant Reservation</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #555;">Name</td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold; color: #555;">Email</td>
              <td style="padding: 8px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #555;">Demo Day</td>
              <td style="padding: 8px;">${demoDay || "Not selected"}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold; color: #555;">Stripe Customer</td>
              <td style="padding: 8px;"><a href="https://dashboard.stripe.com/customers/${customer.id}">${customer.id}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #555;">Reserved At</td>
              <td style="padding: 8px;">${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET</td>
            </tr>
          </table>
        </div>
      `,
    });

    // Confirm to the customer
    const demoDayLine = demoDay
      ? `<li><strong>Demo Day:</strong> ${DEMO_DAY_INFO[demoDay] || demoDay} — we'll send details closer to the date</li>`
      : "";

    await resend.emails.send({
      from: "Mutant <onboarding@resend.dev>",
      to: email,
      subject: "You're reserved. Welcome to the mutation.",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f0f0f0; padding: 40px 32px;">
          <h1 style="font-family: sans-serif; font-size: 48px; letter-spacing: 0.1em; margin: 0 0 8px; color: #fff;">MUTANT<span style="color: #e63946;">.</span></h1>
          <hr style="border: none; border-top: 1px solid #333; margin: 24px 0;" />
          <h2 style="font-size: 24px; letter-spacing: 0.05em; margin: 0 0 16px;">YOU'RE IN, ${name.split(" ")[0].toUpperCase()}.</h2>
          <p style="color: #aaa; line-height: 1.6;">You're on the list. Only 100 units in the first production run — $0 charged until delivery.</p>
          <ul style="color: #ccc; line-height: 2; padding-left: 20px;">
            <li><strong>Reservation:</strong> Confirmed</li>
            <li><strong>Deposit:</strong> $0 down</li>
            <li><strong>Delivery:</strong> 2026</li>
            ${demoDayLine}
          </ul>
          <p style="color: #777; font-size: 14px; margin-top: 32px;">We'll reach out when it's time. Welcome to the mutation.</p>
          <p style="color: #555; font-size: 13px;">— The Mutant Team</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      customerId: customer.id,
    });
  } catch (error: unknown) {
    console.error("Reservation error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ error: `Failed to process reservation: ${message}` });
  }
}
