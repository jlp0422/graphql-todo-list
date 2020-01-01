import gql from 'graphql-tag'

export default gql`
  mutation NewItem($input: CreateItemInput!) {
    createItem(input: $input) {
      title
      description
    }
  }
`
