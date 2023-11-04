import * as React from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 

 
export function ComboboxDemo({items}: {
  items: {value: string, label: string}[]
}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")


 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {/* {value
            ? items.find((framework) => framework.value === value)?.label
            : "Select framework..."} */}
          snippets

          {open ?
          <ChevronUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />  
          :<ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        }
          
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[160px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {items.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}