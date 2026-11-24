import { FixedWindowRateLimiter } from "@/server/rate-limit/rate-limiter";

describe("FixedWindowRateLimiter", () => {
  it("allows up to the limit per key, then blocks until the window resets", () => {
    let now = 0;
    const limiter = new FixedWindowRateLimiter({
      windowMs: 1000,
      limit: 2,
      now: () => now,
    });

    expect(limiter.consume("a")).toMatchObject({ allowed: true, remaining: 1 });
    expect(limiter.consume("a")).toMatchObject({ allowed: true, remaining: 0 });
    expect(limiter.consume("a")).toMatchObject({
      allowed: false,
      resetAt: 1000,
    });
    expect(limiter.consume("b").allowed).toBe(true);

    now = 1000;
    expect(limiter.consume("a")).toMatchObject({ allowed: true, remaining: 1 });
  });
});
