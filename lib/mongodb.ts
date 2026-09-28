import mongoose from "mongoose";

if (typeof window !== "undefined") {
  throw new Error("lib/mongodb.ts cannot be loaded in client-side code.");
}

const MONGODB_URI =
  process.env.MONGODB_URI ||
  (process.env.NODE_ENV === "production" ? "" : "mongodb://127.0.0.1:27017/wedding_invitation");

/**
 * Determines whether in-memory fallback stores are permitted.
 * Allowed in development for instant local previewing/testing without a local database.
 * Strictly forbidden in production to guarantee data persistence and prevent phantom writes.
 */
export function isFallbackAllowed(): boolean {
  return process.env.NODE_ENV !== "production";
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
  lastFailureTime: number;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
  lastFailureTime: 0,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

// Production & Serverless circuit breaker settings:
// 5000ms allows sufficient time for TLS handshake & server selection on MongoDB Atlas cold starts.
// If offline/failing, bypass for 30s to keep fallback responses fast.
const CIRCUIT_BREAKER_COOLDOWN_MS = 30000;
const CONNECTION_TIMEOUT_MS = 5000;

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  // If no URI is configured (e.g. in production environment without env vars set), return fallback immediately
  if (!MONGODB_URI) {
    return null;
  }

  // 1. If active connected instance exists and is open, return immediately (0ms)
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // If connection was dropped or in broken state, reset stale cache references
  if (mongoose.connection.readyState !== 1 && mongoose.connection.readyState !== 2) {
    cached.conn = null;
    cached.promise = null;
  }

  // 2. Circuit Breaker: if offline/failed recently, immediately bypass to prevent page lag (0ms)
  const now = Date.now();
  if (cached.lastFailureTime && now - cached.lastFailureTime < CIRCUIT_BREAKER_COOLDOWN_MS) {
    return null;
  }

  // 3. Initiate connection attempt with production-safe timeouts
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: CONNECTION_TIMEOUT_MS,
      connectTimeoutMS: CONNECTION_TIMEOUT_MS,
      maxPoolSize: 10,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        cached.lastFailureTime = 0;
        return mongooseInstance;
      })
      .catch(() => {
        // Mark failed timestamp for circuit breaker
        cached.lastFailureTime = Date.now();
        cached.promise = null;
        cached.conn = null;
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
    if (!cached.conn) {
      cached.promise = null;
    }
  } catch {
    cached.lastFailureTime = Date.now();
    cached.promise = null;
    cached.conn = null;
  }

  return cached.conn;
}

