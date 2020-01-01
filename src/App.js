import React, { Fragment, useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import GET_ITEMS from './queries/items'
import CREATE_ITEM from './queries/createItem'
import REMOVE_ITEM from './queries/removeItem'

const refetchQueries = { refetchQueries: ['AllItems'] }

const App = () => {
  const { data, loading, error } = useQuery(GET_ITEMS)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [addItem] = useMutation(CREATE_ITEM, {
    ...refetchQueries,
    variables: {
      input: { title, description: desc }
    }
  })

  const [removeItem] = useMutation(REMOVE_ITEM, {
    ...refetchQueries
  })

  if (loading) {
    return <h2>Loading</h2>
  }
  if (error) {
    return <h2>Uh oh an error</h2>
  }

  return (
    <Fragment>
      <h1>My To Do List</h1>
      <input
        placeholder={'title'}
        value={title}
        onChange={ev => setTitle(ev.target.value)}
      />
      <input
        placeholder={'description'}
        value={desc}
        onChange={ev => setDesc(ev.target.value)}
      />
      <button
        onClick={() => {
          addItem()
          setTitle('')
          setDesc('')
        }}
      >
        Add Item
      </button>
      <ol>
        {data.items.map(({ id, title, description }) => (
          <li key={id}>
            <h3>{title}</h3>
            <h5>{description}</h5>
            <button
              onClick={() => removeItem({ variables: { input: { id } } })}
            >
              mark as done
            </button>
          </li>
        ))}
      </ol>
    </Fragment>
  )
}

export default App
