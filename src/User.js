import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function User() {
  const { id } = useParams();
  const navigate = useNavigate();
  //console.log(id);
  const [user, setUser] = useState([]);

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
  return (
    <div className="user-container">
      <h1> User Data</h1>
      <div className="user">
        <h4> {user.name} </h4>
        <p>{user.message}</p>
        <button onClick={deleteUser}>Delete</button>
      </div>
    </div>
  );
}

export default User;
