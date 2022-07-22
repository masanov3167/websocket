let socket = io();

const chatlist = document.querySelector('.chats-list');
const profil = document.querySelector('.profile-body');
const form = document.querySelector('.form');
const chatMain = document.querySelector('.chat-main')

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  const ism = getCookie('name')

if(ism){
    socket.emit('user-joined', { ism })

    profil.innerHTML = `
    <img src="./images/background.jpg" alt="profile-avatar" class="profile-avatar">
    <p class="profile-name">${ism}</p>
    `
}

socket.on('new-user-joined', data => {
    const chatItem = document.createElement('li');
    chatItem.classList.add('chats-item');
    chatItem.innerHTML = `
    <img src="./images/avatar.jpg" alt="profile-picture">
    <p>${data}</p>
    `
    chatlist.appendChild(chatItem)
})

form.addEventListener('submit', e => {
    e.preventDefault()

    const { message } = e.target

    const test = document.createElement('div');
    test.classList.add("msg-wrapper","from");
    test.innerHTML = `
        <p class="msg-author" >#${ism}</p>
        <h2 class="msg-text">${message.value}</h2>
    `

    chatMain.appendChild(test);
    socket.emit('new-message', {
        name: ism,
        message: message.value
    })

    e.target.message.value = ''
})

socket.on('new-user-message', ({ name,  message }) => {
    const test = document.createElement('div');
    test.classList.add("msg-wrapper");
    test.innerHTML = `
        <p class="msg-author" >#${name}</p>
        <h2 class="msg-text">${message}</h2>
    `

    chatMain.appendChild(test);
})