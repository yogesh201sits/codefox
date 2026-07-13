export const logger = {
  info(scope: string, message: string) {
    console.log(`[${scope}] ${message}`);
  },

  warn(scope: string, message: string) {
    console.warn(`[${scope}] ${message}`);
  },

  error(scope: string, message: string, error?: unknown) {
    console.error(
      `[${scope}] ${message}`,
      error
    );
  },
};