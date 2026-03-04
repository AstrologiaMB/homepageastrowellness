'use client';

import dynamic from 'next/dynamic';
import type { Components } from 'react-markdown';

// Dynamic import for react-markdown to reduce initial bundle size (~30KB savings)
// Only loads when markdown content needs to be rendered
const ReactMarkdown = dynamic(() => import('react-markdown'), {
  ssr: true,
  loading: () => <span className="opacity-50">Cargando...</span>,
});

interface MarkdownRendererProps {
  content: string;
  components?: Components;
  className?: string;
}

/**
 * Lightweight markdown renderer with dynamic import
 * Use this instead of importing react-markdown directly
 */
export function MarkdownRenderer({ content, components, className }: MarkdownRendererProps) {
  return (
    <div className={className}>
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
}

// Default prose styling for astrological interpretations
const defaultProseComponents: Components = {
  p: ({ ...props }) => <p className="mb-4 last:mb-0 leading-relaxed" {...props} />,
  strong: ({ ...props }) => (
    <strong className="font-bold text-blue-600 dark:text-blue-300" {...props} />
  ),
};

interface ProseMarkdownProps {
  content: string;
  className?: string;
}

/**
 * Pre-configured markdown renderer with prose styling for interpretations
 */
export function ProseMarkdown({ content, className }: ProseMarkdownProps) {
  return (
    <MarkdownRenderer
      content={content}
      components={defaultProseComponents}
      className={className}
    />
  );
}
