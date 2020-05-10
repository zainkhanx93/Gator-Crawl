const AWSURL = ""
const APIURL = "http://localhost:8080";
const socketURL = AWSURL || APIURL
const axios = require("axios");
// get all user's email
export const getChatRooms = () => axios.get(`${socketURL}/conversation/all`);

// get message for giving chatRoomName
export const getChatRoomMessages = chatRoomName => 
  axios.get(`${socketURL}/conversation/chatroom/messages/${chatRoomName}`);

// export const joinRoom = room =>
//   axios.post(`${socketURL}/conversation/chatroom`, { room });
