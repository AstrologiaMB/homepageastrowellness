# Dockerfile for Next.js 15 with Prisma - Fly.io deployment
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
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
ARG NEXT_PUBLIC_CALENDARIO_API_URL
ARG NEXT_PUBLIC_ASTROGEMATRIA_API_URL
ARG NEXT_PUBLIC_CARTA_ELECTIVA_API_URL

ENV NEXT_PUBLIC_CALCULOS_API_URL=$NEXT_PUBLIC_CALCULOS_API_URL
ENV NEXT_PUBLIC_INTERPRETACIONES_API_URL=$NEXT_PUBLIC_INTERPRETACIONES_API_URL
ENV NEXT_PUBLIC_CALENDARIO_API_URL=$NEXT_PUBLIC_CALENDARIO_API_URL
ENV NEXT_PUBLIC_ASTROGEMATRIA_API_URL=$NEXT_PUBLIC_ASTROGEMATRIA_API_URL
ENV NEXT_PUBLIC_CARTA_ELECTIVA_API_URL=$NEXT_PUBLIC_CARTA_ELECTIVA_API_URL

# Dummy secrets for build-time (real values come from Fly.io secrets at runtime)
ENV STRIPE_SECRET_KEY="sk_test_build_time_placeholder_key_not_used"
ENV OPENAI_API_KEY="sk-build_time_placeholder_key_not_used"

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
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder /app/node_modules/.bin/prisma ./node_modules/.bin/prisma
COPY --from=builder /app/prisma ./prisma

# Copy package.json for prisma
COPY --from=builder /app/package.json ./package.json

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Run Prisma migrations and start app
# Use prisma from node_modules instead of npx to avoid version mismatch
CMD node_modules/.bin/prisma migrate deploy && node server.js
