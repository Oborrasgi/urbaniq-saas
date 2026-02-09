export const appConfig = {
  /** ============================================
   * App name used for branding and SEO
   * =============================================
   */
  appName: "UrbanIQ",

  /** ==================================================
   * Short description for SEO tags (can be overwritten)
   * ===================================================
   */
  appTagline: "AI Intelligence for Real Estate",

  /** ============================================
   * Detailed app description for SEO purposes
   * =============================================
   */
  appDescription:
    "UrbanIQ es una plataforma avanzada de inteligencia artificial diseñada específicamente para el sector inmobiliario. Ofrecemos análisis predictivos, valoración precisa de propiedades y herramientas inteligentes para agentes y compradores, facilitando decisiones informadas y optimizando la gestión de bienes raíces.",

  /** ============================================
   * Default credits for new users
   * =============================================
   */
  defaultCredits: 100,

  /** ===========================================
   * Contact email for contact form
   * ============================================
   */
  contactEmail: process.env.CONTACT_EMAIL,

  /** =============================================
   * Domain name without protocol or trailing slash
   * ==============================================
   */
  domainName: "https://urbaniq.ai",

  /** ============================================
   * Full URL based on environment
   * ============================================
   */
  domainUrl:
    process.env.NODE_ENV === "production"
      ? "https://urbaniq.ai"
      : "http://localhost:3000",

  /** ============================================
   * Color configuration
   * ============================================
   */
  colors: {
    primary: "#8c5cff"
  },

  /** ============================================
   * Authentication route configuration
   * @property {string} login - Login route
   * @property {string} signUp - Sign up route
   * @property {string} afterSignout - Route after sign out
   * @property {string} afterLogin - Route after login
   * @property {number} maxAge - Maximum age of the session in seconds
   * @property {string} secret - Secret for signing the session
   * @property {string} newUser - Route for new users after first-time signup
   * ============================================
   */
  auth: {
    login: "/login",
    signUp: "/register",
    afterSignout: "/",
    afterLogin: "/dashboard",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    secret: process.env.AUTH_SECRET,
    newUser: "/dashboard/billing"
  },

  /** ============================================
   * Email configuration using Resend
   * @property {string} fromNoReply - 'From' field for magic login links
   * @property {string} fromAdmin - 'From' field for other emails (e.g., abandoned carts, updates)
   * @property {string} supportEmail - Support email shown to customers (leave empty if not needed)
   * @property {string} resendKey - Resend API key
   * ============================================
   */
  resend: {
    resendKey: process.env.AUTH_RESEND_KEY,
    fromNoReply: `UrbanIQ <noreply@resend.urbaniq.ai>`,
    fromAdmin: `Nabed at UrbanIQ <nabed@resend.urbaniq.ai>`,
    supportEmail: "support@urbaniq.ai"
  },

  /** ============================================
   * Email configuration using Mailgun
   * @property {string} domain - Mailgun domain
   * @property {string} apiKey - Mailgun API key
   * @property {string} fromNoReply - 'From' field for magic login links
   * @property {string} fromAdmin - 'From' field for other emails (e.g., abandoned carts, updates)
   * @property {string} supportEmail - Support email shown to customers (leave empty if not needed)
   * ============================================
   */
  mailgun: {
    domain: process.env.MAILGUN_DOMAIN!,
    apiKey: process.env.MAILGUN_API_KEY!,
    fromNoReply: `UrbanIQ <noreply@mailgun.urbaniq.ai>`,
    fromAdmin: `Nabed at UrbanIQ <nabed@mailgun.urbaniq.ai>`,
    supportEmail: "support@urbaniq.ai"
  },

  /** ============================================
   * Stripe payment configuration
   * @property {number} trailPeriod - Trial period in milliseconds (30 days). Change 30 to according to your days.
   * @property {string} billingRoute - Route for billing management
   * @property {object[]} plans - Payment plan configurations
   * @property {string} plans[].priceId - Price ID based on environment
   * @property {number} plans[].price - Price of the plan
   * @property {number} plans[].anchorPrice - Anchor price of the plan
   * @property {string} plans[].title - Title of the plan
   * @property {string} plans[].mode - Payment mode (payment or subscription)
   * ============================================
   */
  stripe: {
    publicKey: process.env.STRIPE_PUBLIC_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    trailPeriod: 7 * 24 * 60 * 60 * 1000, // 7 days
    billingRoute: "/dashboard/billing",
    plans: [
      {
        price: 99,
        credits: 1000,
        title: "Starter",
        mode: "subscription" as "payment" | "subscription",
        priceId: "price_1RhcRyQtxOjnr4Fwctjrtas5"
      },
      {
        price: 149,
        title: "Pro",
        credits: 2000,
        mode: "subscription" as "payment" | "subscription",
        priceId: "price_1RhcSdQtxOjnr4Fw9bqkpKTh"
      },
      {
        price: 499,
        credits: 5000,
        title: "Lifetime",
        mode: "payment" as "payment" | "subscription",
        priceId: "price_1RhcTRQtxOjnr4FwktYqtmfb"
      }
    ]
  },

  /** ============================================
   * SMTP configuration
   * @property {string} host - SMTP host
   * @property {number} port - SMTP port
   * @property {string} from - SMTP from address
   * @property {object} auth - SMTP authentication
   * @property {string} auth.user - SMTP username
   * @property {string} auth.pass - SMTP password
   * ============================================
   */
  smtp: {
    from: process.env.EMAIL_FROM,
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    secure: process.env.NODE_ENV === "production",
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD
    }
  },

  /** ============================================
   * S3 configuration
   * ============================================
   */
  s3: {
    region: process.env.AWS_S3_REGION,
    accessKey: process.env.AWS_S3_ACCESS_KEY,
    secretKey: process.env.AWS_S3_SECRET_KEY,
    bucketName: process.env.AWS_S3_BUCKET_NAME
  },

  /** ============================================
   * Google Analytics configuration
   * ============================================
   */
  googleAnalytics: {
    id: "G-RD175QS1MJ",
    consent: {
      storage: "localStorage",
      cookieName: "cookie-consent"
    }
  }
};
