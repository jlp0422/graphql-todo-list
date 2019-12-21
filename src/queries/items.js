import gql from 'graphql-tag'

export default gql`
  query AllItems {
    items {
      id
      title
      description
    }
  }
`
