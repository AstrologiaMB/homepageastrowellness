import * as React from 'react';
import { Slot as SlotPrimitive } from 'radix-ui';
import { MoreHorizontal } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Diamond separator for celestial-themed breadcrumbs
 * A stylized diamond shape that replaces the standard chevron
 */
const DiamondSeparator = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('w-3.5 h-3.5', className)}
    aria-hidden="true"
  >
    <path
      d="M12 2L22 12L12 22L2 12L12 2Z"
      fill="currentColor"
      fillOpacity="0.3"
      className="text-primary"
    />
  </svg>
);

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<'nav'> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<'ol'>>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2',
        'px-4 py-2.5 rounded-lg',
        'bg-background/50 backdrop-blur-sm',
        'border border-border/40',
        'shadow-sm',
        className
      )}
      {...props}
    />
  )
);
BreadcrumbList.displayName = 'BreadcrumbList';

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />
  )
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<'a'> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? SlotPrimitive.Slot : 'a';

  return (
    <Comp
      ref={ref}
      className={cn(
        'transition-all duration-300 ease-out',
        'hover:text-foreground hover:scale-105',
        'rounded px-1.5 py-0.5 -mx-1.5 -my-0.5',
        'hover:bg-accent/50',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(
        'font-medium text-foreground',
        'px-2.5 py-1 rounded-lg',
        'bg-primary/10',
        'shadow-[0_0_15px_-3px_rgba(121,104,231,0.3)]',
        'border border-primary/20',
        'transition-all duration-300',
        className
      )}
      {...props}
    />
  )
);
BreadcrumbPage.displayName = 'BreadcrumbPage';

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<'li'>) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn(
      '[&>svg]:w-3.5 [&>svg]:h-3.5',
      'transition-transform duration-300 hover:scale-125',
      className
    )}
    {...props}
  >
    {children ?? <DiamondSeparator />}
  </li>
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = 'BreadcrumbElipssis';

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  DiamondSeparator,
};
