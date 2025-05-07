import { atom, useAtom } from 'jotai';
import React, { useState } from 'react';
import { age, ageEdit, getId, idx, infoBuId, modalAdd, modalEdit, name, nameEdit, status, statusEdit, usersAtom } from './store';
import "./App.css"

const App = () => {
  const [data, setData] = useAtom(usersAtom);
  const [addModal, setAddModal] = useAtom(modalAdd);
  const [addName, setAddName] = useAtom(name);
  const [addAge, setAddAge] = useAtom(age);
  const [addStatus, setAddStatus] = useAtom(status);
  const [editModal, setEditModal] = useAtom(modalEdit)
  const [editName, setEditName] = useAtom(nameEdit);
  const [editAge, setEditAge] = useAtom(ageEdit);
  const [editStatus, setEditStatus] = useAtom(statusEdit);
  const [Idx, setIdx] = useAtom(idx)
  const [id, setId] = useAtom(getId)
  const [info, setInfo] = useAtom(infoBuId)
  const [infoModal, setInfoModal] = useState(false)
  
  function delUser(id) {
    setData(data.filter((el) => el.id !== id));
  }

  function changeStatus(elem) {
    setData(
      data.map((el) =>
        el.id === elem.id ? { ...el, status: !el.status } : el
      )
    );
  }

  function addUser() {
    let newUser = {
      name: addName,
      age: addAge,
      status: addStatus,
      id: Date.now()
    };
    setData([...data, newUser]);
    setAddAge("")
    setAddName("")
    setAddStatus("false")
    setAddModal(!addModal)
  }

  function editUser(){
    let newUser={
      name:editName,
      id:Idx,
      age:editAge,
      status: editStatus=="true"?true:false
    }
    setData(
      data.map((el)=>{
        if(el.id==Idx){
          return newUser
        }
        return el
      })
    )
    setEditAge("")
    setEditName("")
    setEditStatus("false")
    setEditModal(!editModal)
  }

  function setEditForm(elem){
    console.log(elem);
    
    setEditAge(elem.age)
    setEditName(elem.name)
    setEditStatus(elem.status)
    setIdx(elem.id)
    setEditModal(!editModal)
  }

  function getById(){
    data.map((el)=>{
      if(el.id==id){
        setInfo(el)
      }
      return el;
    })
    
    setInfoModal(!infoModal)
  }

  return (
    <div>
    {
      infoModal && (
        <div className='addModal'>
          <h1>{info.name}</h1>
          <h1>{info.age}</h1>
          <p>{info.status?"Active":"Inactive"}</p>
          <button onClick={()=>setInfoModal(!infoModal)}>Close</button>
        </div>
      )
    }
      <button onClick={() => setAddModal(!addModal)}>ADD USER</button>
      {
        addModal && (
          <div className='addModal'>
            <h1>Add New User</h1>
            <input onInput={(e) => setAddName(e.target.value)} type="text" placeholder='Name' />
            <input onInput={(e) => setAddAge(e.target.value)} type="text" placeholder='Age' />
            <select onChange={(e) => setAddStatus(e.target.value === 'true')}>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
            <button onClick={addUser}>Add New User</button>
            <button onClick={() => setAddModal(!addModal)}>Close</button>
          </div>
        )
      }
      {
        editModal && (
          <div className='addModal'>
            <h1>Edit User</h1>
            <input value={editName} onInput={(e) => setEditName(e.target.value)} type="text" placeholder='Name' />
            <input value={editAge} onInput={(e) => setEditAge(e.target.value)} type="text" placeholder='Age' />
            <select value={editStatus} onChange={(e) => setEditStatus(e.target.value === 'true')}>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
            <button onClick={editUser}>Save Change</button>
            <button onClick={() => setEditModal(!editModal)}>Close</button>
          </div>
        )
      }
      <div className='box'>
      {
        data.map((el) => (
          <div className='card' key={el.id}>
            <h1>{el.name}</h1>
            <h2>{el.age}</h2>
            <p>{el.status ? "Active" : "Inactive"}</p>
            <div className='actions'>
              <input
                type="checkbox"
                onChange={() => changeStatus(el)}
                checked={el.status}
              />
              <button onClick={() => delUser(el.id)}>Delete</button>
              <button onClick={()=> setEditForm(el)}>Edit</button>
              <button onClick={()=>{
                setId(el.id)
                getById()
              }}>Info</button>
            </div>
          </div>
        ))
      }
      </div>
    </div>
  );
};

export default App;
