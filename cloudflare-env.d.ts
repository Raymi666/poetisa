declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    OPENAI_API_KEY?: string;
    INVITE_CODE?: string;
    POETISA_MODEL?: string;
    EMAIL_ENABLED?: string;
    REMINDER_OWNER_EMAIL?: string;
    PUBLIC_ORIGIN?: string;
    FIREBASE_PROJECT_ID?: string;
    FIREBASE_WEB_API_KEY?: string;
    FIREBASE_AUTH_DOMAIN?: string;
    VAPID_PUBLIC_KEY?: string;
    VAPID_PRIVATE_KEY?: string;
    PUSH_SCHEDULE_ENABLED?: string;
  }
}
