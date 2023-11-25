import { FC } from 'react'
import { SnippetFormProps } from './snippet-form.props'
import { useSnippetsInfo } from '@/lib/hooks'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  FormProvider,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { SnippetFormSchema, snippetFormSchema } from './snippet-form.schema'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ISnippetDto } from '@/lib/interfaces/snippets.interface'
import { useSnippetsMutation } from '@/lib/hooks/items/snippets/use-snippets-mutation'

export const SnippetForm: FC<SnippetFormProps> = ({ snippetItem, mode }) => {
  const { snippetsInfo } = useSnippetsInfo()

  const form = useForm({
    resolver: yupResolver(snippetFormSchema),
    defaultValues: snippetItem,
  })

  const {
    patchSnippet,
    isPatchSnippetLoading,
    postSnippet,
    isPostSnippetLoading,
  } = useSnippetsMutation({
    id: snippetItem.id,
    categoryURLName: snippetsInfo[snippetItem.category]?.categoryURLName,
  })

  const onSubmit = (data: SnippetFormSchema) => {
    const snippetPayload: ISnippetDto = {
      ...data,
      tags: [],
      infoLinks: [],
    }

    const mutateSnippet = async () => {
      switch (mode) {
        case 'add':
          postSnippet(snippetPayload)
          break
        case 'edit':
          patchSnippet(snippetPayload)
          break
      }
    }
    mutateSnippet()
  }

  const handleResetButton = (e) => {
    form.reset(snippetItem)
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(snippetsInfo).map((category) => {
                      return (
                        <SelectItem value={category} key={category}>
                          {category}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder={field.name} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="snippet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Snippet</FormLabel>
              <FormControl>
                <Textarea
                  className="max-h-40"
                  placeholder={field.name}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-8 flex flex-wrap gap-2">
          <Button
            type="submit"
            // loading={isPatchSnippetLoading || isPostSnippetLoading}
          >
            Save
          </Button>
          <Button
            className="ml-auto"
            variant="outline"
            onClick={handleResetButton}
          >
            Reset
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
