import { tv, type VariantProps } from 'tailwind-variants'

import Root from './alert.svelte'
import Description from './alert-description.svelte'
import Title from './alert-title.svelte'

export const alertVariants = tv({
  base: 'relative w-full rounded-lg border py-1.5 px-2 flex items-center gap-1',

  variants: {
    variant: {
      default: 'bg-background text-foreground',
      destructive:
        'text-destructive bg-destructive/20 font-semibold border-none',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type Variant = VariantProps<typeof alertVariants>['variant']
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export {
  Root,
  Description,
  Title,
  //
  Root as Alert,
  Description as AlertDescription,
  Title as AlertTitle,
}
