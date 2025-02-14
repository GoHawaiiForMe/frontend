import * as Sentry from "@sentry/nextjs";
import "../sentry.server.config";
import "../sentry.client.config";
import "../sentry.edge.config";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

export const onRequestError = Sentry.captureRequestError;
