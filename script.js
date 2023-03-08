import {printLoginForm, printLogoutBtn } from "./userForm.js";

let root = document.getElementById("root");
let showUserListBtn = document.getElementById("showUserListBtn");

//let userList = document.getElementById("userList");
let newUser = document.getElementById("newUser");
let newUserPassword = document.getElementById("newUserPassword");
let saveUserBtn = document.getElementById("saveUserBtn");
// let loginUsername = document.getElementById("loginUsername");
// let loginPassword = document.getElementById("loginPassword");
// let loginUserBtn = document.getElementById("loginUserBtn");
// let logoutUserBtn = document.getElementById("logoutUserBtn");
let userGreeting = document.getElementById("userGreeting");

if (localStorage.getItem("username")) {
    console.log("ÄR INLOGGAD");
    printLogoutBtn();
} else {
    console.log("ÄR EJ INLOGGAD");
    printLoginForm();
}



let loggedInUser = localStorage.getItem("username");
if(loggedInUser) {
    userGreeting.innerText = "Godmorgon " + loggedInUser;
}

showUserListBtn.addEventListener("click", () => {
    printUserList()
});

function printUserList() {

    fetch("http://localhost:3000/users/")
    .then(res => res.json())
    .then(users => {
        //console.log(data);
       // printUsers(data);

       console.log(users);

    let userList = document.createElement("ul");
    userList.classList.add("userList");
    userList.innerHTML = "";

    users.map(user => {
        let li = document.createElement("li")
        li.id = user.id;
        li.innerText = user.name;
        userList.appendChild(li);
    })

    userList.addEventListener("click", (e) => {
        console.log("click på lista", e.target.id);

        printUserInfo(e.target.id);
    })

    root.innerHTML = "";
    root.appendChild(userList);
    });  
}

function printUserInfo(userId) {
   // console.log("Visar ingo om user", userId);

   fetch("http://localhost:3000/users/" + userId)
   .then(res => res.json())
   .then(data => {
    console.log(data);

    let userInfoDiv = document.createElement("div");
    userInfoDiv.innerHTML = "<p>" + data.name + "<br/> " + data.likes + "</p>";

    root.innerHTML = "";
    root.append(userInfoDiv);
    })

}

saveUserBtn.addEventListener("click", () => {
   
    // SKAPA EN NY ANVÄNDARE
    let user = {name: newUser.value, password: newUserPassword.value };
   console.log(user);

   // SKICKA TILL SERVERN
   fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    }, 
    body: JSON.stringify(user)
   })
   .then(res => res.json())
   .then(data => {
        printUsers(data);
   });
   newUser.value = "";
   newUserPassword.value = "";
});



// logoutUserBtn.addEventListener("click", () => {
//     localStorage.removeItem("username");
//     userGreeting.innerText = "Du har blivit utloggad."
// });
