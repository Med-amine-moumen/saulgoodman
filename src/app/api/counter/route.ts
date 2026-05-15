import { NextRequest } from "next/server";

/**
 * Server-Sent Events stream that broadcasts a synchronized "clients helped"
 * counter to all connected viewers. The counter lives in module scope so every
 * connection sees the same number.
 *
 * Note: this state is per-server-instance. On serverless platforms (Vercel)
 * each cold start gets a new baseline — that's intentional for a demo. For
 * true cross-process persistence, swap the in-memory counter for Redis.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

let counter = 1247; // Saul has clearly been busy
let interval: NodeJS.Timeout | null = null;
const subscribers = new Set<(value: number) => void>();

function ensureTicker() {
  if (interval) return;
  const schedule = () => {
    const wait = 3000 + Math.random() * 4000; // 3–7 seconds
    interval = setTimeout(() => {
      counter += 1;
      subscribers.forEach((cb) => cb(counter));
      schedule();
    }, wait);
  };
  schedule();
}

export async function GET(req: NextRequest) {
  ensureTicker();

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const send = (value: number) => {
        controller.enqueue(
          encoder.encode(`event: count\ndata: ${JSON.stringify({ count: value })}\n\n`)
        );
      };

      send(counter);
      subscribers.add(send);

      // Heartbeat every 25s so proxies don't close the connection
      const heartbeat = setInterval(() => {
        controller.enqueue(encoder.encode(`: ping\n\n`));
      }, 25000);

      req.signal.addEventListener("abort", () => {
        subscribers.delete(send);
        clearInterval(heartbeat);
        try { controller.close(); } catch {}
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
