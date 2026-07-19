export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    process.on("unhandledRejection", (reason) => {
      console.error("[unhandledRejection] keeping process alive:", reason);
    });

    process.on("uncaughtException", (err) => {
      console.error("[uncaughtException] keeping process alive:", err);
    });
  }
}
