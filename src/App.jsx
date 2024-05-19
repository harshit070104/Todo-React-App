import { useEffect, useState } from 'react'
import { TodoProvider } from './contexts/TodoContext'
import TodoForm from './Components/TodoForm';
import TodoItem from './Components/TodoItem';
import Alert from './Components/Alert';

function App() {
  const [todos, setTodos] = useState([]);

  const [alertVisible,setAlertVisible] = useState('hidden')
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    // map lga kr uss id wale ko find krenge aur usko update kr denge
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    // filter kr lo wo wali todo ko
    setTodos((prev) => prev.filter((todo) => (todo.id !== id)))
  }

  const toggleComplete = (id) => {
    // map lga kr uss wale ko jo changes krne h kr do
    setTodos((prev) =>
      prev.map((prevTodo) => prevTodo.id === id
        ? { ...prevTodo, completed: !prevTodo.completed }
        : prevTodo))
  };

  // todo jb bhi change ho tb show krna hoga
  useEffect(() => {
    if ( todos.length > 0) 
      localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]);
  
  // to get the todos we use another useEffect
  useEffect(() => {
    const myTodos = JSON.parse(localStorage.getItem("todos"));
    
    if ( myTodos&&myTodos.length > 0) {
      // check for length > 0 bcz array can be [] empty
      setTodos(myTodos)
    }
  },[]);

  return (
    <TodoProvider value={{ addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8 relative">
        <Alert alertVisible={alertVisible}/>
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className='w-full'>
                <TodoItem todo={todo} setAlertVisible={setAlertVisible} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
