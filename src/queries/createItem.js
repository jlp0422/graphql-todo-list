import gql from 'graphql-tag'

export default gql`
  mutation NewItem($input: ItemInput!) {
    createItem(input: $input) {
      title
      description
    }
  }
`
