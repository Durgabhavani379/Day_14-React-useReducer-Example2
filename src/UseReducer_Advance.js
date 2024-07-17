
import React, { useReducer, useEffect, useState } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USERS_DATA":
      return {
        ...state,
        usersData: action.payload,
      };
    case "LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "DELETE_USER":
      const newUsers = state.usersData.filter((eachUser) => eachUser.id !== action.payload);
      return {
        ...state,
        usersData: newUsers,
      };
    case "ONCLICK_EDIT":
      return {
        ...state,
        isEditing: action.payload,
      };
    case "UPDATE_USER":
      const updatedUsers = state.usersData.map((eachUser) => {
        if (eachUser.id === action.payload.id) {
          return {
            id: action.payload.id,
            name: action.payload.name,
            email: action.payload.email
          };
        }
        return eachUser;
      });
      return {
        ...state,
        usersData: updatedUsers,
      };
    default:
      return state;
  }
};

const UseReducer_Advance = () => {
  const fetchUserData = async (URL) => {
    dispatch({ type: "LOADING", payload: true });
    try {
      const response = await fetch(URL);
      const data = await response.json();
      dispatch({ type: "UPDATE_USERS_DATA", payload: data });
      dispatch({ type: "LOADING", payload: false });
    } catch (error) {
      dispatch({ type: "LOADING", payload: false });
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchUserData("https://jsonplaceholder.typicode.com/users");
  }, []);

  const initialState = {
    usersData: [],
    isLoading: false,
    isEditing: { status: false, id: '', name: "", email: "" }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_USER", payload: id });
  };

  const updateData = (id, name, email) => {
    dispatch({
      type: "UPDATE_USER", payload: {
        id, name, email,
      }
    });
    dispatch({
      type: "ONCLICK_EDIT",
      payload: { status: false, id: '', name: "", email: "" }
    });
  };

  if (state.isLoading) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div>
      <h1>User Information</h1>
      {state.isEditing?.status && <EditContainer id={state.isEditing.id} comingTitle={state.isEditing.name} comingEmail={state.isEditing.email} updateData={updateData} />}
      {
        state.usersData.map((eachUser) => {
          const { id, name, email } = eachUser;
          return <div key={id} style={{ background: "lightblue" }}>
            <h3>{name}</h3>
            <p>{email}</p>
            <button onClick={() => {
              handleDelete(id)
            }}>delete</button>
            <button onClick={() => dispatch({ type: "ONCLICK_EDIT", payload: { status: true, id: id, name: name, email: email } })}>edit</button>
          </div>
        })
      }
    </div>
  );
};

const EditContainer = ({ id, comingTitle, comingEmail, updateData }) => {
  const [title, setTitle] = useState(comingTitle || "");
  const [email, setEmail] = useState(comingEmail || "");
  return (
    <>
      <form onSubmit={(e) => { e.preventDefault(); updateData(id, title, email); }}>
        <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Update data</button>
      </form>
    </>
  );
};

export default UseReducer_Advance;
