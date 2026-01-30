import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  // 1. Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // 2. Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // 3. Verify the signature
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // 4. Handle the Event
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data;
    
    // Create user in Postgres
    await prisma.user.create({
      data: {
        id: id, // Use Clerk ID as the primary key
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name || ""}`.trim(),
      },
    });
    console.log(`User ${id} created in DB`);
  }

  return new Response("", { status: 200 });
}