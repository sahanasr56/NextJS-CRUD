'use client';

import { useEffect, useState }from 'react';
import { User } from '@/types/user';
import { v4 as uuidv4 } from 'uuid';

export default function HomePage() {
  const [users, setUsers]=useState<User[]>([]);
  const [name, setName]=useState('');
  const [editingId, setEditingId]= useState<string | null>(null);

  useEffect(()=>{
    fetch('/api/users').then(res=>res.json()).then(setUsers);
  },[]);

  const saveUser=async()=>{
    const user:User={id:editingId||uuidv4(),name};
    const method=editingId?'PUT':'POST';

    await fetch('/api/users', {
      method,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user),
    });

    const updated=editingId? users.map(u=>u.id===user.id?user:u): [...users, user];
    setUsers(updated);
    setName('');
    setEditingId(null)
  };

  const deleteUser=async (id:string)=>{
    await fetch(`/api/users?id=${id}`, {method: 'DELETE'});
    setUsers(users.filter(u=>u.id!==id))
  };

  return (
    <div style={{padding: 20}}>
      <h1>Use Manager</h1>
      <input value={name} onChange={e=> setName(e.target.value)} style={{border: '1px solid black'}}/>
      <button onClick={saveUser}>{editingId? 'Update': 'ADD'} User</button>
      <ul>
        {users.map(u=> (
          <li style={{padding: 10}} key={u.id}>
            {u.name}{' '}
            <button style={{padding: 10}} onClick={()=>{
              setName(u.name);
              setEditingId(u.id);
            }}>Edit</button>{' '}
            <button style={{padding: 10}} onClick={()=> deleteUser(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
