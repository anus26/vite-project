import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'





const App = () => {
  const title=useRef(null)
  const description=useRef(null)
  const [loading,setLoading]=useState(true)

  const [data,setData]=useState(null)
  const [error, setError] = useState(false);
  useEffect(()=>{
    axios('http://localhost:4000/api/v1/todo')
    .then((res)=>{
      console.log(res.data.todos);
      setData(res.data.todos)
      
    })
    .catch((err)=>{
      console.log(err);
      // setError(true);
      
    })
    .finally(()=>{
      setLoading(false)
    })
  },[])
  const addTodo =async(event)=>{
    event.preventDefault()
    try {
      const response=await axios.post("http://localhost:4000/api/v1/todo",{
        title:title.current?.value,
        description:description.current?.value,
      })
      console.log(response.data.todo);
      // setData((prevData) => (prevData ? [...prevData, response.data.todo] : [response.data.todo]));
      // if (title.current) title.current.value = '';
      // if (description.current) description.current.value = '';
    } catch (err) {
      console.log(error);
      
      
    }
  }
  return (
    <>
      <h1>Todo  </h1>
      <form onSubmit={addTodo}>
        <input type="text" placeholder='title' ref={title} />
        <input type="text" placeholder='description' ref={description} />
        <button type='submit'>add</button>
      </form>
      {loading && <h1>Loading...</h1>}
      {error && <h1>error occured</h1>}
      {data ? (
        data.map((item) => {
          return (
            <div key={item.id}>
              <h1>{item.title}</h1>
              <h1>{item.description}</h1>
              {/* <button onClick={() => deleteUser(item.id)}>delete</button> */}
            </div>
          );
        })
      ) : (
        <h1>No data found</h1>
      )}
    </>
  )
}

export default App