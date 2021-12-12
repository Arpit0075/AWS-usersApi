import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function User() {
  const { id } = useParams();
  const navigate = useNavigate();
  //console.log(id);
  const [user, setUser] = useState([]);

  //updating user state
  const [state, setState] = useState({ newName: "", newMessage: "" });

  // eslint-disable-next-line
  useEffect(async () => {
    const url = `https://dw0n60u6j4.execute-api.us-east-1.amazonaws.com/prod/users/${id}`;

    try {
      const res = await axios.get(url);
      //console.log(res);
      setUser(res.data.Item);
    } catch (err) {
      console.log(err);
    }
    return;
    // eslint-disable-next-line
  }, []);

  const deleteUser = async () => {
    const url = `https://dw0n60u6j4.execute-api.us-east-1.amazonaws.com/prod/users/${id}`;
    try {
      await axios.delete(url);
    } catch (err) {
      console.log(err);
    }
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };
  const updateUser = async () => {
    const url = `https://dw0n60u6j4.execute-api.us-east-1.amazonaws.com/prod/users/${id}`;

    try {
      await axios.put(url, {
        newName: state.newName,
        newMessage: state.newMessage,
        id: id,
      });
      setState((prev) => ({ ...prev, newName: "", newMessage: "" }));
    } catch (err) {
      console.log(err);
    }
    navigate("/");
  };

  return (
    <div className="user-container">
      <h1 style={{ textAlign: "center" }}> User Data</h1>
      <div className="user">
        <h4> {user.userName} </h4>
        <p>{user.message}</p>
        <button onClick={deleteUser}>Delete</button>
      </div>
      <div className="updateUser">
        <h3> Update User</h3>
        <input
          type="text"
          placeholder="enter new Name"
          name="newName"
          onChange={handleChange}
          value={state.newName}
        />
        <input
          type="text"
          placeholder="enter new Mssage"
          onChange={handleChange}
          value={state.newMessage}
          name="newMessage"
        />
        <button onClick={updateUser}>Update User</button>
      </div>
    </div>
  );
}

export default User;
