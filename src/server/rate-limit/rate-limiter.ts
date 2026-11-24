export interface RateLimitDecision {
  allowed: boolean;
  remaining: number;
  /** Epoch milliseconds when the current window resets. */
  resetAt: number;
}

/** Strategy interface: swap the in-memory window for Redis/KV in production. */
export interface RateLimiter {
  consume(key: string): RateLimitDecision;
}

interface FixedWindowOptions {
  windowMs: number;
  limit: number;
  now?: () => number;
}

/**
 * Fixed-window counter kept in memory. Good enough for a single instance;
 * serverless instances each keep their own window.
 */
export class FixedWindowRateLimiter implements RateLimiter {
  private readonly windows = new Map<
    string,
    { count: number; resetAt: number }
  >();
  private readonly now: () => number;

  constructor(private readonly options: FixedWindowOptions) {
    this.now = options.now ?? Date.now;
  }

  consume(key: string): RateLimitDecision {
    const now = this.now();
    this.evictExpired(now);

    const window = this.windows.get(key) ?? {
      count: 0,
      resetAt: now + this.options.windowMs,
    };

    if (window.count >= this.options.limit) {
      return { allowed: false, remaining: 0, resetAt: window.resetAt };
    }

    window.count += 1;
    this.windows.set(key, window);
    return {
      allowed: true,
      remaining: this.options.limit - window.count,
      resetAt: window.resetAt,
    };
  }

  private evictExpired(now: number) {
    for (const [key, window] of this.windows) {
      if (window.resetAt <= now) this.windows.delete(key);
    }
  }
}
