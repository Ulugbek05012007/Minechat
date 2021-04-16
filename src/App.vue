<template>
<div class="chat" id="chat">
  <div id="app">
    <div class="scroll-down" @click="scrollDown()"> V </div>
    <div class="message" v-for="(message, index) in chat" :key="index">
      <div v-if="message.author && message.text">
        <div style="display:flex; justify-content:space-between;">
            <p class="author">{{ message.author }}</p>
            <p class="reply" @click="replyTo(message)">reply</p>
        </div>

          <div v-if="message.reply" class="reply-content">
            <p class="author"> {{ message.reply.author }}</p>
            <img style="width: 100px" v-if="message.reply.imageUrl" :src="message.reply.imageUrl" alt="">
            <p class="text"> {{ message.reply.text }}</p>
          </div>


        <img class="img" v-if="message.imageUrl" :src="message.imageUrl" alt="">
        <p class="text">{{ message.text }}</p>
        <p class="time"> {{ new Date(message.time).toString().split('GMT')[0] }} </p>
      </div>
    </div>
    <div class="input">
      <div class="reply-author" v-if="Object.keys(reply).length">
      <p>Reply to : {{reply.author}}</p>
       <p @click="reply={}" style="cursor:pointer;">X</p>
       </div><br>
      <div class="justify">
      <input class="author-text" type="text" v-model="author" placeholder="author">
      <input style="width: 300px" class="author-text" type="text" v-model="imageUrl" placeholder="image URL">
      </div>
      <br>
        <div class="button1">
					<div class="button2" @click="callmodal()">
            COLOR STYLE
          </div>
				</div>
       <br>
      <div class="tel">
      <input class="text-text" type="text" v-model="text" placeholder="Text">
      <button class="send" @click="send()"> > </button>
      </div>
</div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';
export default {
  name: 'App',
  data() {
    return {
      author: '',
      text: '',
      imageUrl: '',
      reply:{},
      chat: [],
    }
  },
  mounted() {
    this.getChat();
  },
  methods: {
    replyTo(message){
      this.reply=message;
    },
    scrollDown() {
      window.scroll(0, 999999999999)
    },
     callmodal(){
				let modal = document.getElementById("chat");
				modal.classList.toggle('th');
			},



    getChat() {
      this.chat = [];
      firebase.firestore().collection('messages').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.chat.push(doc.data())
        });
      });
    },
    send() {
      let docName = String(new Date().getTime())
      let message = {
        reply: this.reply,
        author: this.author,
        text: this.text,
        time: new Date().getTime(),
        imageUrl: this.imageUrl,
      }
      firebase.firestore().collection('messages').doc(docName).set(message)
      .then(() => {
        this.chat.push(message)
        this.text = '';
        this.imageUrl = '';
        this.reply={};
      })
    }
  }

}
</script>

<style>
.scroll-down {
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  color: white;
  background-color: rgb(73, 73, 73);
  position: fixed;
  left: 80vw;
  top: 90vh;
}
.reply-content {
  border-radius: 0 10px 10px 0;
  background-color: rgb(107, 107, 107);
  opacity: 0.6;
}
.reply-content > *{
  margin-top: 8px !important;
  color: black !important;
}
.reply-author{
  padding:10px;
  color:white;
  background-color: black;
  border-radius: 20px;
  width:400px;
  display:flex;
  justify-content: space-between;
}
.reply{
  margin-top:5px;
  margin-bottom:-10px;
  margin-right:-20px;
  color:rgb(180, 173, 173);
  cursor:pointer;
}
.chat{
  display: flex;
  justify-content: center;
  width:100%;
  height:100%;
}
#app {

  width: 500px;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.message {
  padding-right: 40px;
  min-width: max-content;
  max-width: 400px;
  border: 1px solid black;
  border-radius: 10px;
  margin: 5px;
}
.author {
  min-width: max-content;
  max-width: 400px;
  margin-left: 5px;
  margin-top: 5px;
  margin-bottom: 0;
}
.img {
  margin-top: 10px;
  margin-left: 20px;
  max-width: 400px;
}
.text {
  max-width: 400px;
  font-size: 20px;
  color: black;
  margin-left: 7px;
  margin-bottom: 10px;
}
.input {
  margin-top: 100px;
}
.author-text {
  width: 120px;
  height:20px;
}
.text-text {
  font-size: 20px;
  width: 400px;
  background-color: rgb(53, 53, 53);
  border:none;
}
.justify{
  display: flex;
  justify-content: space-around;
  background-color: rgb(53, 53, 53);
  height:30px;
  align-items: center;
}
.send {
  width:30px;
  height:30px;
  font-weight: bold;
  background-color: black;
  color: rgb(255, 255, 255);
  font-size: 25px;
  border: none;
  border-radius: 50%;
}
.time {
  padding-left: 20px;
  font-size: 10px;
  color: grey;
  text-align: right;
}
.tel{
  height: 50px;
  background-color:rgb(53, 53, 53);
  display: flex;
  justify-content: space-around;
  align-items: center;
}



		.button2{
			border-style:outset;
			border-radius:30px;
			background-color:rgb(141, 141, 141);
			width:100px;
			height:30px;


      font-size:10px;
      display: flex;
      justify-content: center;
      align-items: center;
      
		}
		.th{
			background-color:grey;
		}
input{
  background:rgb(49, 49, 49);
  border:none;
}
</style>