import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useItemsInfo } from '@/lib/hooks/items/useItemsInfo.hook'
import { ItemsMode } from '@/lib/interfaces/common.interface'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

export const AvatarMenu = () => {
  const [isOpen, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const router = useRouter()

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Avatar role="combobox" aria-expanded={isOpen}>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {/* <Button
          variant="ghost"
          role="combobox"
          aria-expanded={isOpen}
          className="justify-between text-sm capitalize text-muted-foreground"
        >
          {itemsMode}
          {isOpen ? (
            <ChevronUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button> */}
      </PopoverTrigger>
      <PopoverContent className="w-[160px] p-0">
        <Link
          href="/profile"
          className="text-sm capitalize text-muted-foreground"
        >
          Profile
        </Link>
      </PopoverContent>
    </Popover>
  )
}
