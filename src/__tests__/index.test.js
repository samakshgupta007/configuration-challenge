const { expect } = require("@jest/globals");
const fetchConfigurations = require("../index");

describe("ConfigurationChallenge", () => {
  it("Should return empty config object for non-existent files", async () => {
    const fileNames = ["config.none.json", "config.also_none.json"];
    const res = await fetchConfigurations(fileNames);

    expect(res).toStrictEqual({});
  });

  it("Should return empty config object for invalid json files", async () => {
    const fileNames = ["config.invalid.json", "config.also_invalid.json"];
    const res = await fetchConfigurations(fileNames);

    expect(res).toStrictEqual({});
  });

  it("should load valid JSON configuration files successfully", async () => {
    const fileNames = ["config.json", "config.invalid.json"];
    const res = await fetchConfigurations(fileNames);

    expect(res).toStrictEqual({
      environment: "production",
      database: {
        host: "mysql",
        port: 3306,
        username: "divido",
        password: "divido",
      },
      cache: { redis: { host: "redis", port: 6379 } },
    });
  });

  it("should load multiple config files and have later files override settings in earlier ones", async () => {
    const fileNames = ["config.json", "config.local.json"];
    // config.json - { "environment": "production", "database": { "host": "mysql", "port": 3306, "username": "divido", "password": "divido" }, "cache": { "redis": { "host": "redis", "port": 6379 }}}
    // config.local.json - { "environment": "development", "database": { "host": "127.0.0.1", "port": 3306, "username": "divido", "password": "divido" }, "cache": { "redis": { "host": "127.0.0.1", "port": 6379 }}}
    const res = await fetchConfigurations(fileNames);

    expect(res).toStrictEqual({
      environment: "development",
      database: {
        host: "127.0.0.1",
        port: 3306,
        username: "divido",
        password: "divido",
      },
      cache: { redis: { host: "127.0.0.1", port: 6379 } },
    });
  });

  it("should be able to retrieve parts of the configuration by a dot-separated path - no matter how deeply nested", async () => {
    const fileNames = ["config.json"];
    const res = await fetchConfigurations(fileNames);

    expect(res.environment).toBe("production");
    expect(res.database).toStrictEqual({
      host: "mysql",
      port: 3306,
      username: "divido",
      password: "divido",
    });
    expect(res.cache).toStrictEqual({ redis: { host: "redis", port: 6379 } });
    expect(res.database.host).toBe("mysql");
    expect(res.database.port).toBe(3306);
    expect(res.database.username).toBe("divido");
    expect(res.database.password).toBe("divido");
    expect(res.cache.redis).toStrictEqual({ host: "redis", port: 6379 });
    expect(res.cache.redis.host).toBe("redis");
    expect(res.cache.redis.port).toBe(6379);
  });
});
