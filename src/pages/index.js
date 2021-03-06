import React from "react"
import Link from "gatsby-link"
import Helmet from "react-helmet"

import { PreviewList } from "../ui"

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <div>
      <Helmet
        title="Granular Insights Blog"
        meta={[
          { name: "description", content: "marketing insights for humans" },
          {
            name: "keywords",
            content:
              "marketing, visualisation, granular, ads, tableau, data studio, quicksight",
          },
        ]}
      />
      <PreviewList.Wrapper>
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => {
            return (
              <PreviewList.Item key={post.id}>
                <PreviewList.Title>
                  <Link to={post.frontmatter.path}>
                    {post.frontmatter.title}
                  </Link>
                </PreviewList.Title>
                <PreviewList.Meta>{post.frontmatter.date}</PreviewList.Meta>
                <PreviewList.Excerpt>{post.excerpt}</PreviewList.Excerpt>
              </PreviewList.Item>
            )
          })}
      </PreviewList.Wrapper>
    </div>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`
