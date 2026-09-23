import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/wedding_invitation";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
  lastFailureTime: number;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
  lastFailureTime: 0,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

// Fast circuit breaker settings:
// If MongoDB is offline, don't stall incoming requests with 2.5s timeouts on every call!
// Fast-fail in 600ms on first attempt, then bypass for 30s to keep the website blazing fast.
const CIRCUIT_BREAKER_COOLDOWN_MS = 30000;
const CONNECTION_TIMEOUT_MS = 600;

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  // 1. If active connected instance exists, return immediately (0ms)
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // 2. Circuit Breaker: if offline/failed recently, immediately bypass to prevent page lag (0ms)
  const now = Date.now();
  if (cached.lastFailureTime && now - cached.lastFailureTime < CIRCUIT_BREAKER_COOLDOWN_MS) {
    return null;
  }

  // 3. Initiate fast connection attempt
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: CONNECTION_TIMEOUT_MS,
      connectTimeoutMS: CONNECTION_TIMEOUT_MS,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        cached.lastFailureTime = 0;
        return mongooseInstance;
      })
      .catch((err) => {
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

