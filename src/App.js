// import React, { useEffect, useState } from 'react'
// import Header from './component/Header';

// import AddTask from './component/AddTask';
// import { v4 as uuidv4 } from 'uuid';
// import Swal from 'sweetalert2';
// import Tasks from './component/Tasks';


// const App = () => {
//   // useEffect(()=>{
//   //   alert('Welcome to our App')
//   // },[]);
//   const [tasks, setTasks] = useState([]);
//   const [showAddTask, setShowAddTask] = useState(false)
//   const [loading, setLoading] = useState(true)
//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false)
//     }, 3500);
//   }, [])

//   const getTasks = JSON.parse(localStorage.getItem('taskAdded'));
//   useEffect(() => {
//     if (getTasks == null) {
//       setTasks([])
//     } else {
//       setTasks(getTasks)
//     }
//   }, [getTasks])

//   const addTask = (task) => {
//     const id = uuidv4();
//     const newTask = { id, ...task }
//     setTasks([...tasks, newTask]);
//     Swal.fire({
//       icon: 'success',
//       title: 'Yay...',
//       text: 'You have successfully added a new task!'
//     })
//     localStorage.setItem("taskAdded", JSON.stringify([...tasks, newTask]));
//   }

//   const deleteTask = (id) => {
//     const deleteTask = tasks.filter((task) => task.id !== id);
//     setTasks(deleteTask);
//     Swal.fire({
//       icon: 'success',
//       title: 'Oops...',
//       text: 'You have successfully deleted a task!'
//     })
//     localStorage.setItem("taskAdded", JSON.stringify(deleteTask));
//   }
//   const editTask = (id) => {
//     const text = prompt('Task Name');
//     const day = prompt('Day and Time');
//     const myData = tasks.map(x => {
//       if (x.id === id) {
//         return {
//           ...x,
//           text: text,
//           day: day,
//           id: uuidv4()
//         }
//       }
//       return x;
//     })
//     Swal.fire({
//       icon: 'success',
//       title: 'Yay...',
//       text: 'You have successfully edited an existing task!'
//     })
//     localStorage.setItem('taskAdded', JSON.stringify(myData));
//     window.location.reload();
//   }
//   return (
//     <>{loading ?
//       <div className="spinnerContainer">
//         <div className="spinner-grow text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//         <div className="spinner-grow text-secondary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//         <div className="spinner-grow text-success" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//         <div className="spinner-grow text-danger" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//         <div className="spinner-grow text-warning" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div> :
//       <div className='container'>
//         <Header showFrom={() => setShowAddTask(!showAddTask)} changeTextAndColor={showAddTask} />
//         {showAddTask && <AddTask onSave={addTask} />}
//         <h3>Number of Tasks:{tasks.length}</h3>
//         {
//           tasks.length > 0 ?
//             (<Tasks deleteTask={deleteTask} onEdit={editTask} tasks={tasks} />) :
//             ('No Task Found')
//         }
//       </div>
//     }
//     </>
//   )
// }

// export default App








import axios from 'axios';




import React, { useEffect, useState } from 'react'
import { AddUser } from './compo/AddUser';
import { User } from "./compo/user"

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    axios.post("http://172.15.14.240:3030/api/admin/add_product")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error, "::::::"));
  };

  const onAdd = async (title, price, offer_price, description, product_type, tags, file) => {
    axios.post("http://172.15.14.240:3030/api/admin/add_product",
      {
        title: title,
        price: price,
        offer_price: offer_price,
        description: description,
        product_type: product_type,
        tags: tags,
        file: file
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    )
      .then((response) => {
        if (response.status !== 201) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setUsers((users) => [...users, data]);
      })
      .catch((error) => console.log(error, ".....::"))
  };

  const onEdit = async (id, name, email) => {
    await fetch(`http://172.15.14.240:3030/api/admin/edit_product/`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        email: email
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        // setUsers((users) => [...users, data]);
        const updatedUsers = users.map((user) => {
          if (user.id === id) {
            user.name = name;
            user.email = email;
          }

          return user;
        });

        setUsers((users) => updatedUsers);
      })
      .catch((error) => console.log(error));
  };


  const onDelete = async (id) => {
    await fetch(`http://172.15.14.240:3030/api/admin/product_delete/02cc332b-0174-4eed-a16b-91bf21891f5e`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          setUsers(
            users.filter((user) => {
              return user.id !== id;
            })
          );
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <h1>Users</h1>
      <AddUser onAdd={onAdd} />
      {users.map((user) => (
        <User
          id={user.id}
          key={user.id}
          title={user.title}
          price={user.price}
          offer_price={user.offer_price}
          description={user.description}
          product_type={user.product_type}
          tags={user.tags}
          file={user.file}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default App