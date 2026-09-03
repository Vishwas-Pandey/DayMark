export const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
};
