import gql from 'graphql-tag'

export default gql`
  mutation RemoveItem($input: RemoveItemInput!) {
    removeItem(input: $input)
  }
`
