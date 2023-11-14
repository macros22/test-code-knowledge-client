import { FC } from 'react'
import { ISnippetFormProps } from './snippet-form.props'

import { useSnippetForm } from './use-snippet-form'
import { useSnippets, useSnippetsInfo } from '@/lib/hooks'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  Form,
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

export const SnippetForm: FC<ISnippetFormProps> = ({
  snippetItem,
  mode,
}) => {
  const {
    handleResetButton,
  } = useSnippetForm({
    snippetItem,
    mode,
  })

  const { snippetsInfo } = useSnippetsInfo()

  const form = useForm({
    resolver: yupResolver(snippetFormSchema),
    defaultValues: snippetItem,
  })

  const { patchSnippet, isPatchSnippetLoading, postSnippet, isPostSnippetLoading } = useSnippets({
    id: snippetItem.id,
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

  return (
    <>
      <Form {...form}>
        {/* className="space-y-2" */}
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
            <Button type="submit" loading={isPatchSnippetLoading || isPostSnippetLoading}>
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
      </Form>

      {/* <Form>
      <Form className={styles.form}>
      <HrWithContent className={styles.title}>Category</HrWithContent>


      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Snippet</Form.Label>
        <HrWithContent className={styles.title}>Description</HrWithContent>
        <Form.Control
          placeholder="Enter Snippet"
          value={description}
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <Form.Text className="text-error">{descriptionError}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-2" controlId="formBasicPassword">
        <Separator>
        <BsFillTerminalFill /> Snippet
        </Separator>
        <Form.Control
          as="textarea"
          placeholder="Snippet"
          value={snippet}
          onChange={(e) => setSnippet(e.target.value)}
          // className={styles.textareaSnippet}
        />
      </Form.Group>

     
    </Form> */}
    </>
  )
}
