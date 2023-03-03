let userList = document.getElementById("userList");
let newUser = document.getElementById("newUser");
let newUserPassword = document.getElementById("newUserPassword");
let saveUserBtn = document.getElementById("saveUserBtn");
let loginUsername = document.getElementById("loginUsername");
let loginPassword = document.getElementById("loginPassword");
let loginUserBtn = document.getElementById("loginUserBtn");
let logoutUserBtn = document.getElementById("logoutUserBtn");
let userGreeting = document.getElementById("userGreeting");

fetch("http://localhost:3000/users/")
.then(res => res.json())
.then(data => {
    //console.log(data);
    printUsers(data);
});

let loggedInUser = localStorage.getItem("username");
if(loggedInUser) {
    userGreeting.innerText = "Godmorgon " + loggedInUser;
}


function printUsers(users) {
    console.log(users);

    userList.innerHTML = "";

    users.map(user => {
        let li = document.createElement("li")
        li.id = user.id;
        li.innerText = user.name;
        userList.appendChild(li);
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

loginUserBtn.addEventListener("click", () => {

    let loginUser = {
        name: loginUsername.value,
        password: loginPassword.value
    }
    console.log(loginUser);
    fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify(loginUser)
       })
       .then(res => res.json())
       .then(data => {
            console.log(data)
            if (data.name) {
                userGreeting.innerText = "Godmorgon " + data.name;
                localStorage.setItem("username", data.name);
            }
            else {
                userGreeting.innerText = "Inloggning misslyckades, var vänlig och kontrollera användarnamn och lösenord."
            }

       });
       loginUsername.value = "";
       loginPassword.value = "";
    });

logoutUserBtn.addEventListener("click", () => {
    localStorage.removeItem("username");
    userGreeting.innerText = "Du har blivit utloggad."
});
