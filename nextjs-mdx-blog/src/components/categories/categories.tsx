import { Button } from '../ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card'

import { Github } from 'lucide-react'

export const Categories = () => {
  return (
    <>
      <div className="mx-auto flex flex-wrap gap-5">
        {new Array(10).fill('/').map((item) => {
          return (
            <Card className="w-[228px]">
              <CardHeader>
                <CardTitle className="flex justify-center text-3xl before:mr-3 before:text-primary before:content-['{'] after:ml-3 after:text-primary after:content-['}']">
                  JavaScript
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap justify-center gap-5 pb-5 align-middle">
                <Button asChild size="lg" className="w-full text-lg">
                  <a href="https://github.com/ChangoMan/nextjs-mdx-blog">
                    <Github className="mr-1" /> Questions
                  </a>
                </Button>
                <Button asChild size="lg" className="w-full" variant="outline">
                  <a href="https://github.com/ChangoMan/nextjs-mdx-blog">
                    <Github className="mr-1" /> Snippets
                    <svg
                      className="ml-2 h-3.5 w-3.5"
                      aria-hidden="true"
                      xmlns="http:www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}
