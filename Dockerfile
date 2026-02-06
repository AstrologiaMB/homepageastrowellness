# Dockerfile for Next.js 15 with Prisma - Fly.io deployment
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Copy package files and Prisma schema (needed for postinstall hook)
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm ci --legacy-peer-deps

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build-time environment variables for Next.js
ARG NEXT_PUBLIC_CALCULOS_API_URL
ARG NEXT_PUBLIC_INTERPRETACIONES_API_URL
ARG COMMIT_SHA

ENV NEXT_PUBLIC_COMMIT_SHA=$COMMIT_SHA
ARG NEXT_PUBLIC_CALENDARIO_API_URL
ARG NEXT_PUBLIC_ASTROGEMATRIA_API_URL
ARG NEXT_PUBLIC_CARTA_ELECTIVA_API_URL

# Provide default dummy URLs if not supplied (for build time only)
ENV NEXT_PUBLIC_CALCULOS_API_URL=${NEXT_PUBLIC_CALCULOS_API_URL:-https://placeholder.example.com}
ENV NEXT_PUBLIC_INTERPRETACIONES_API_URL=${NEXT_PUBLIC_INTERPRETACIONES_API_URL:-https://placeholder.example.com}
ENV NEXT_PUBLIC_CALENDARIO_API_URL=${NEXT_PUBLIC_CALENDARIO_API_URL:-https://placeholder.example.com}
ENV NEXT_PUBLIC_ASTROGEMATRIA_API_URL=${NEXT_PUBLIC_ASTROGEMATRIA_API_URL:-https://placeholder.example.com}
ENV NEXT_PUBLIC_CARTA_ELECTIVA_API_URL=${NEXT_PUBLIC_CARTA_ELECTIVA_API_URL:-https://placeholder.example.com}

# Dummy secrets for build-time (real values come from Fly.io secrets at runtime)
ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"
ENV NEXTAUTH_SECRET="build-time-placeholder-secret-not-used-in-production"
ENV NEXTAUTH_URL="http://localhost:3000"
ENV GOOGLE_CLIENT_ID="build-time-placeholder-client-id"
ENV GOOGLE_CLIENT_SECRET="build-time-placeholder-client-secret"
ENV JWT_SECRET="build-time-placeholder-jwt-secret"
ENV OPENCAGE_API_KEY="build-time-placeholder-opencage-key"
ENV STRIPE_SECRET_KEY="sk_test_build_time_placeholder_key_not_used"
ENV STRIPE_WEBHOOK_SECRET="build-time-placeholder-webhook-secret"
ENV OPENAI_API_KEY="sk-build_time_placeholder_key_not_used"
ENV FROM_EMAIL="noreply@example.com"

# Build Next.js
# This will use the DATABASE_URL from build time if needed
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

# Copy package.json for prisma
COPY --from=builder /app/package.json ./package.json

# Install Prisma CLI at the exact version from package.json for migrations
RUN npm install prisma@6.7.0 --save-dev --legacy-peer-deps

# Install sharp for image optimization (required in standalone mode)
RUN npm install sharp@0.33.5 --legacy-peer-deps

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the Next.js server
# Migrations are handled by release_command in fly.toml
CMD ["node", "server.js"]
