import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthService";
import firebase from "../config/firebase";
import styled from "styled-components";

const StyledDiv = styled.div`
  width: 60%;
  list-style: none;
  padding: 60px;
`;

const StyledList = styled.li`
  list-style: none;
  font-size: 20px;
  color: purple;
  background-color: #b9c42f;
  margin: 8px 0;
`;

const Room = () => {
  const [messages, setMessages] = useState(null);
  const [value, setValue] = useState("");
 
  const user = useContext(AuthContext);

  const style = {
    backgroundColor: 'green',
    padding: '5px 20px',
    boxShadow: '0 2px 3px #ccc',
    border: '1px solid #eee',
    margin: '20px 0 0 20px'
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.firestore().collection("messages").add({
      content: value,
      user: user.displayName,
      date: new Date(),
    });
    setValue('')
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("messages")
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          return doc.data();
        });
        handleSort(messages)
        // messages.sort((a,b) => {
        //   if(a.date>b.date) return -1;
        //   if(a.date<b.date) return +1;
        //   return 0
        // })
        setMessages(messages);
      });
  }, []);

  console.log(messages)
  // console.log(value.length)
  // console.log(messages[1].content.length)

  const handleSort = (messages) => {messages.sort((a,b) => {
    if(a.date>b.date) return -1;
    if(a.date<b.date) return +1;
    return 0
  })}

  return (
    <StyledDiv>
      <h1>Room</h1>
      <ul>
        {messages ? (
          messages.map((message) => (
            <StyledList>
              {message.user}:{message.content}
            </StyledList>
          ))
        ) : (
          <p>...loading</p>
        )}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button type="submit" style={style
        }>送信</button>
      </form>
      <button
        onClick={() => {
          firebase.auth().signOut();
        }}
        style={style}
      >
        Logout
      </button>
    </StyledDiv>
  );
};

export default Room;