import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [users, setUsers] = useState([]);

  // eslint-disable-next-line
  useEffect(async () => {
    const url =
      "https://dw0n60u6j4.execute-api.us-east-1.amazonaws.com/prod/users";
    try {
      const res = await axios.get(url);
      //console.log(res.data.body.Items);
      setUsers(res.data.body.Items);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="home">
      <h1 style={{ textAlign: "center" }}>Users Data</h1>
      <div className="users-container">
        {users.map((u) => {
          return (
            <div className="users" key={u.id}>
              <h4> {u.userName} </h4>
              <p>{u.message}</p>
              <div className="buttons-users">
                <button>
                  <Link to={`/${u.id}`}> Details</Link>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
