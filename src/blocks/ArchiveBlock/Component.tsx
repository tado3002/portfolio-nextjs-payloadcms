import type { Post, ArchiveBlock as ArchiveBlockProps, Skill, Project } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    relationTo,
  } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []
  let skills: Skill[] = []
  let projects: Project[] = []

  if (relationTo === 'posts') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    posts = fetchedPosts.docs
  } else if (relationTo === 'skills') {
    const payload = await getPayload({ config: configPromise })

    const fetchedSkills = await payload.find({
      collection: 'skills',
      depth: 1,
      limit,
    })

    skills = fetchedSkills.docs
  } else if (relationTo === 'projects') {
    const payload = await getPayload({ config: configPromise })

    const fetchedSkills = await payload.find({
      collection: 'projects',
      depth: 1,
      limit,
    })

    projects = fetchedSkills.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive posts={posts} skills={skills} projects={projects} />
    </div>
  )
}
