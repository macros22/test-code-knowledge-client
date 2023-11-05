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

export function NavSelect({ itemsMode }: { itemsMode: ItemsMode }) {
  const [isOpen, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const router = useRouter()
  const { itemsInfo } = useItemsInfo(itemsMode)

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={isOpen}
          className="justify-between"
        >
          {/* {value
            ? items.find((framework) => framework.value === value)?.label
            : "Select framework..."} */}
          {itemsMode}
          {isOpen ? (
            <ChevronUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[160px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${itemsMode}...`} />
          <CommandEmpty>No {itemsMode} found.</CommandEmpty>
          <CommandGroup>
            {Object.keys(itemsInfo).map((category) => {
              return (
                <CommandItem
                  key={category}
                  value={category}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                    router.replace(
                      `/${itemsMode}/${itemsInfo[category].categoryURLName}`,
                    )
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === category ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {category}
                </CommandItem>
              )
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
