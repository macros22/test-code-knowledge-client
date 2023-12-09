import { AmountButton } from '@/components/ui/amount-button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

export const CategoryTags = ({
  itemsInfo,
  currentCategory,
  categoryButtonHandler,
}) => {
  return (
    <ScrollArea className="mx-auto w-full whitespace-nowrap md:w-2/3">
      {Object.keys(itemsInfo).map((category, idx) => {
        return (
          <AmountButton
            isActive={category == currentCategory}
            amount={itemsInfo[category].amount}
            key={category}
            onClick={() => categoryButtonHandler(category)}
          >
            {category}
          </AmountButton>
        )
      })}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
