'use client';

import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  components?: Components;
  className?: string;
}

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
