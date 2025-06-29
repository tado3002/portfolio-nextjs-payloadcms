'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post, Project, Skill } from '@/payload-types'

import { Media } from '@/components/Media'
import { Button } from '../ui/button'
import { Book, BookOpen, Github } from 'lucide-react'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>
export type CardSkillData = Skill
export type CardProjectData = Project

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts' | 'projects'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full ">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" />}
      </div>
      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
    </article>
  )
}

export const CardPost: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'border border-primary rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative  w-full ">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" />}
      </div>
      <div className="">
        {showCategories && hasCategories && (
          <div className="p-4 border border-t-primary border-b-primary uppercase text-sm">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose p-4">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && (
          <div className="hidden md:block p-4 pt-0">
            {description && <p>{sanitizedDescription}</p>}
          </div>
        )}
        <div className="flex justify-end px-4 pb-4">
          <Button variant={'outline'} className="border-blue-500">
            <BookOpen />
            <span className="ms-2">Read</span>
          </Button>
        </div>
      </div>
    </article>
  )
}

export const CardProject: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardProjectData
  relationTo?: 'projects'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { className, doc, showCategories, title: titleFromProps } = props

  const { name, description, link, skills, image } = doc || {}

  const hasSkills = skills && Array.isArray(skills) && skills.length > 0
  const titleToUse = titleFromProps || name
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space

  console.log(link)

  return (
    <article
      className={cn(
        'flex flex-col gap-4 border border-primary rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
    >
      <div className="relative w-full border border-b-primary">
        {!image && <div className="">No image</div>}
        {image && typeof image !== 'string' && <Media resource={image} size="33vw" />}
      </div>
      {showCategories && skills && (
        <div className="uppercase text-sm border px-4 pb-4 border-t-transparent border-b-primary">
          {showCategories && hasSkills && (
            <div>
              {skills?.map((skill, index) => {
                if (typeof skill === 'object') {
                  const { name } = skill

                  const skillName = name || 'Untitled skill'

                  const isLast = index === skills.length - 1

                  return (
                    <Fragment key={index}>
                      {skillName}
                      {!isLast && <Fragment>, &nbsp;</Fragment>}
                    </Fragment>
                  )
                }

                return null
              })}
            </div>
          )}
        </div>
      )}
      {titleToUse && (
        <div className="prose px-4">
          <h3>
            <a className="not-prose" href={`${link}`}>
              {titleToUse}
            </a>
          </h3>
        </div>
      )}
      {description && <div className="px-4">{description && <p>{sanitizedDescription}</p>}</div>}
      <div className="flex justify-end px-4 pb-4">
        <Button variant={'outline'} className="border-blue-500">
          <Github />
          <span className="ms-2">Link</span>
        </Button>
      </div>
    </article>
  )
}
