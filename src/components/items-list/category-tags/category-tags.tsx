import { Badge } from '@/components/ui/badge'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useKeenSlider } from 'keen-slider/react'

export const CategoryTags = ({
  itemsInfo,
  currentCategory,
  categoryButtonHandler,
}) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    mode: 'snap',
    rtl: false,
    slides: { perView: 'auto' },
  })

  return (
    // max-w-[400px] flex-wrap
    <ScrollArea className="mx-auto w-full whitespace-nowrap md:w-2/3">
      {/* <div
      // ref={sliderRef}
      // className="keen-slider mx-auto w-4/6 justify-center gap-4 2xl:fixed 2xl:right-1 2xl:top-20"
      // className="keen-slider mx-auto max-w-[500px]"
      > */}
      {Object.keys(itemsInfo).map((category, idx) => {
        return (
          <Badge
            variant={category == currentCategory ? 'default' : 'outline'}
            // variant={'outline'}
            // keen-slider__slide
            className={` hover:text-md mr-4 cursor-pointer border px-3 py-2 ${
              category == currentCategory ? 'border-primary' : ''
            }`}
            // className={
            //   category == currentCategory ? '' : '' //styles.inActiveButton
            // }
            key={category}
            onClick={() => categoryButtonHandler(category)}
          >
            {category}

            {/* <span className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-black p-2 text-sm font-semibold text-white dark:bg-primary dark:text-black"> */}
            <span
              className={`ml-2 inline-flex items-center justify-center rounded-full ${
                category == currentCategory ? 'opacity-60' : 'text-primary'
              }`}
            >
              {/* {`${category}: ${itemsInfo[category].amount}`} */}
              {itemsInfo[category].amount}
            </span>
          </Badge>
        )
      })}
      {/* </div> */}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
