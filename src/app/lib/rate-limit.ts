interface RateLimitConfig {
  interval: number; // in milliseconds
  limit: number;
}

interface RateLimitData {
  count: number;
  resetTime: number;
}

// Simple in-memory rate limiter (use Redis in production)
class RateLimiter {
  private store = new Map<string, RateLimitData>();
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  check(key: string): { allowed: boolean; remaining: number; reset: number } {
    const now = Date.now();
    let data = this.store.get(key);

    // Clean old entries
    if (data && now > data.resetTime) {
      this.store.delete(key);
      data = undefined;
    }

    if (!data) {
      // First request
      data = {
        count: 1,
        resetTime: now + this.config.interval,
      };
      this.store.set(key, data);
      return {
        allowed: true,
        remaining: this.config.limit - 1,
        reset: data.resetTime,
      };
    }

    if (data.count >= this.config.limit) {
      // Rate limit exceeded
      return {
        allowed: false,
        remaining: 0,
        reset: data.resetTime,
      };
    }

    // Increment count
    data.count++;
    return {
      allowed: true,
      remaining: this.config.limit - data.count,
      reset: data.resetTime,
    };
  }
}

// Create rate limiters for different endpoints
export const contactFormLimiter = new RateLimiter({
  interval: 60 * 60 * 1000, // 1 hour
  limit: 5, // 5 requests per hour
});

export const apiLimiter = new RateLimiter({
  interval: 60 * 1000, // 1 minute
  limit: 60, // 60 requests per minute
});
