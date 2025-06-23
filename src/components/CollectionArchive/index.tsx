import { cn } from '@/utilities/ui'
import React from 'react'

import {
  CardPost,
  CardPostData,
  CardProject,
  CardProjectData,
  CardSkillData,
} from '@/components/Card'
import { Icon } from '@/payload-types'

export type Props = {
  posts: CardPostData[]
  skills: CardSkillData[]
  projects: CardProjectData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts, skills, projects } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <CardPost className="h-fit" doc={result} relationTo="posts" showCategories />
                </div>
              )
            }

            return null
          })}
        </div>
        <div className="flex justify-center gap-8">
          {skills?.map((skill) => {
            const icon = skill.icon as Icon
            return (
              <div className="flex flex-col gap-2 items-center" key={skill.id}>
                {skill.icon && <SkillIcon slug={icon.value} className="w-16 h-16" />}
                <div className="flex justify-center">{skill.name}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
        {projects?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div className="col-span-4" key={index}>
                <CardProject className="h-full" doc={result} relationTo="projects" showCategories />
              </div>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}

function SkillIcon({ slug, className }: { slug: string; className: string }) {
  const iconUrl = `https://cdn.simpleicons.org/${slug}/black/white`
  return <img src={iconUrl} alt={slug} className={className} loading="lazy" />
}
