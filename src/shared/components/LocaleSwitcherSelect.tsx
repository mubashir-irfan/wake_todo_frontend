'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/services/locale';
import { Globe } from 'lucide-react';
import { useTransition } from 'react';

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label,
}: Props) {
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="relative">
      <Select
        value={defaultValue}
        onValueChange={onChange}
        disabled={isPending}
      >
        <SelectTrigger aria-label={label} className="">
          <Globe className="me-2 h-4 w-4" />
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {/* <div className="mr-2 w-[1rem]">
                {item.value === defaultValue && (
                  <Check className="h-4 w-4" />
                )}
              </div> */}
              <span>{item.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
