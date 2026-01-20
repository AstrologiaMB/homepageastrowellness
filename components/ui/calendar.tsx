'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      weekStartsOn={1} // Monday for Spanish locale
      className={cn('p-3', className)}
      classNames={{
        // Root container
        root: 'p-3',
        // Months container
        months: 'flex flex-col gap-4',
        // Month wrapper
        month: 'space-y-4',
        // Month grid (was "table")
        month_grid: 'w-full border-separate border-spacing-y-1',
        // Weeks container
        weeks: 'mt-2',
        // Week row
        week: 'grid grid-cols-7 gap-1',
        // Weekdays row
        weekdays: 'grid grid-cols-7 gap-1',
        // Weekday header cell
        weekday:
          'text-xs font-medium text-muted-foreground uppercase tracking-wider text-center py-2',
        // Month caption container
        month_caption: 'flex justify-center pt-1 relative items-center w-full',
        // Caption label
        caption_label: 'text-base font-semibold text-foreground',
        // Navigation
        nav: 'flex gap-1',
        // Previous month button
        button_previous: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 rounded-lg hover:bg-accent transition-all duration-200 flex items-center justify-center text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95 p-0'
        ),
        // Next month button
        button_next: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 rounded-lg hover:bg-accent transition-all duration-200 flex items-center justify-center text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95 p-0'
        ),
        // Dropdowns
        dropdowns:
          'flex gap-1 [&:has(>_[hidden])]:hidden [&_button]:bg-accent/50 [&_button]:hover:bg-accent [&_button]:text-foreground',
        dropdown:
          'bg-background border border-input rounded-md px-3 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring',
        dropdown_icon: 'h-4 w-4 mr-1 opacity-50',
        // Day cell
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          // Responsive sizing: mobile -> tablet -> desktop
          'h-10 w-10 p-0 sm:h-11 sm:w-11 lg:h-12 lg:w-12',
          // Base day styles
          'font-normal rounded-lg transition-all duration-200 ease-out',
          // Hover scale effect
          'hover:scale-105 active:scale-95',
          // Selected state
          'aria-selected:bg-primary aria-selected:text-primary-foreground',
          'aria-selected:shadow-md',
          // Today indicator
          'data-today:font-semibold',
          // Focus ring
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          // Outside month styling
          'data-outside:text-muted-foreground/50 data-outside:hover:text-muted-foreground',
          // Disabled styling
          'data-disabled:opacity-40 data-disabled:pointer-events-none'
        ),
        // Allow custom class overrides
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          if (orientation === 'left') {
            return <ChevronLeft className="h-4 w-4" />;
          }
          return <ChevronRight className="h-4 w-4" />;
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
