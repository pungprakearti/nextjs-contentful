import { createClient } from 'contentful'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import styles from './index.module.scss'

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })

  const res = await client.getEntries({
    content_type: 'blogPost',
  })

  return {
    props: {
      posts: res.items,
    }
  }
}

export default function Home({ posts }) {
  console.log(posts)

  return (
    <div className={styles.wrap}>
      {posts.map((post) => {
        const content = documentToHtmlString(post.fields.body)
        const id = post.sys.id

        return (
          <div key={id}>
            <img src={post.fields.featuredImage.fields.file.url} />
            <h1>{post.fields.title}</h1>
            <div dangerouslySetInnerHTML={{__html: content}} />
          </div>
        )
      })}
    </div>
  )
}
