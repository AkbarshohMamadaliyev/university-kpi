import { buildApp } from "./app";

const start = async () => {
  const app = await buildApp();

  try {
    await app.listen({
      port: Number(process.env.PORT) || 3000,
      host: "0.0.0.0",
    });
    console.log(`🚀 Server running on http://localhost:${process.env.PORT || 3000}`);
    console.log(`📖 Swagger docs at http://localhost:${process.env.PORT || 3000}/docs`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();