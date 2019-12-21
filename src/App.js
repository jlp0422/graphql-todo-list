import React, { Fragment, useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import GET_ITEMS from './queries/items'
import CREATE_ITEM from './queries/createItem'

const App = () => {
  const { data, loading, error } = useQuery(GET_ITEMS)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [addItem] = useMutation(CREATE_ITEM, {
    refetchQueries: ['AllItems'],
    variables: {
      input: { title, description: desc }
    }
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
      {/* <button onClick={}>Reload List</button><br /> */}
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
      {/* {mutationData && (
        <>
          <h5>New Item Created</h5>
          <p>
            {mutationData.createItem.title},{' '}
            {mutationData.createItem.description}
          </p>
        </>
      )} */}
      <ol>
        {data.items.map(item => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <h5>{item.description}</h5>
          </li>
        ))}
      </ol>
    </Fragment>
  )
}

export default App
