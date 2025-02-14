describe("setting module", () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = originalEnv;
    jest.resetModules();
  });

  test("should use default values when no env variables set", async () => {
    process.env = {};
    jest.resetModules();
    const { env } = await import("../src/setting");

    expect(env.NODE_ENV).toBe("dev");
    expect(env.PORT).toBe(3000);
    expect(env.DEBUG_MODE).toBe(false);
  });

  test("should parse provided env variables correctly", async () => {
    process.env = {
      NODE_ENV: "prod",
      PORT: "5000",
      DEBUG_MODE: "true"
    };
    jest.resetModules();
    const { env } = await import("../src/setting");

    expect(env.NODE_ENV).toBe("prod");
    expect(env.PORT).toBe(5000);
    expect(env.DEBUG_MODE).toBe(true);
  });

  test("should handle invalid PORT value resulting in NaN", async () => {
    process.env = {
      NODE_ENV: "prod",
      PORT: "abc",
      DEBUG_MODE: "false"
    };
    jest.resetModules();
    const { env } = await import("../src/setting");

    expect(env.NODE_ENV).toBe("prod");
    expect(Number.isNaN(env.PORT)).toBe(true);
    expect(env.DEBUG_MODE).toBe(false);
  });
}); 