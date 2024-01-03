import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";

const url = process.env.REACT_APP_BASE_ENDPOINT




// login user
export const loginAuth = createAsyncThunk('auth/loginAuth', async (login) => {
  const response = await axios.post(`${url}/auth/authenticate`, login);
  console.log(response.data.token)
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("userid",response.data.userId)


  return response.data;
});



export const getOneUserAsync=createAsyncThunk('users/getbyid',async ()=>{

    const data=await axios.get(`${url}/users/getbyid/${parseInt(localStorage.getItem("userid"))}`,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials:true
    })
    return data.data.data;
})




export const updateAvatar=createAsyncThunk('users/avatar',async (temp)=>{
  const avatar=temp?.avatar
  const data=await axios.put(`${url}/users/${parseInt(temp?.userId)}`,{avatar},{
      headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials:true
  })
  return data.data.data;
})



export const startBreak = createAsyncThunk('breaks/startBreak', async (breaksData) => {
  const data = await axios.post(
    `${url}/break/add`,
    breaksData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    }
  );
  return data.data.data;
});


export const endBreaks = createAsyncThunk('breaks/endBreak', async (breaksId) => {
  const data = await axios.post(
    `${url}/break/delete/${breaksId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    }
  );
  return data.data.data;
});


export const theLastBreaks = createAsyncThunk('theLastBreak/break', async (userId) => {
  console.log(userId)
  const data = await axios.get(
    `${url}/break/getuserendby/${userId}`,
    
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    }
  );
  return data.data.data;
});


export const getAllUsers=createAsyncThunk('users/getAll',async ()=>{

  const data=await axios.get(`${url}/users/getall`,{
      headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials:true
  })
  return data.data.data;
})


export const getUserById=createAsyncThunk('users/byId',async (userId)=>{

  const data=await axios.get(`${url}/users/getbyid/${userId}`,{
      headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials:true
  })
  return data.data.data;
})





export const changePassword=createAsyncThunk('users/change',async (password)=>{
  const data=await axios.put(`${url}/users/changepassword/${localStorage.getItem("userid")}`,password,{
      headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials:true
  })
  return data.data
})




export const getLoginAndLogout=createAsyncThunk('loginandlogout/users',async (userId)=>{

  const data=await axios.get(`${url}/usersession/userloginandlogout/${userId}`,{
      headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials:true
  })
  console.log(data.data)
  return data.data.data;
})


export const logoutUser=createAsyncThunk('users/logoutlogin',async ()=>{

  const data=await axios.get(`${url}/auth/perform-logout`,{
      headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials:true
  })
  localStorage.removeItem("token")
  localStorage.removeItem("userid")
  return data.data;
})



