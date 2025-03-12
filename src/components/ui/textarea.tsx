import * as React from 'react';

import { cn } from '@/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      wrap="soft"
      data-slot="textarea"
      className={cn(
        'w-full max-w-full overflow-auto break-words resize-y min-h-24 max-h-[50vh] rounded-md border border-bg-control-primary bg-transparent px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[1px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
