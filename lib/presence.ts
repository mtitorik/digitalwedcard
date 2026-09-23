// In-memory active session presence tracking for live online user metrics
declare global {
  // eslint-disable-next-line no-var
  var activeSessionsMap: Map<string, number> | undefined;
}

if (!global.activeSessionsMap) {
  global.activeSessionsMap = new Map<string, number>();
}

export function recordUserActivity(identifier: string = "anonymous-visitor") {
  if (!global.activeSessionsMap) {
    global.activeSessionsMap = new Map();
  }
  global.activeSessionsMap.set(identifier, Date.now());
}

export function getOnlineUsersCount(): number {
  if (!global.activeSessionsMap) return 1;
  const now = Date.now();
  const ACTIVE_WINDOW_MS = 5 * 60 * 1000; // 5-minute active window

  // Clean stale sessions
  for (const [id, lastActive] of global.activeSessionsMap.entries()) {
    if (now - lastActive > ACTIVE_WINDOW_MS) {
      global.activeSessionsMap.delete(id);
    }
  }

  // Ensure at least 1 when active admin is querying
  return Math.max(global.activeSessionsMap.size, 1);
}
