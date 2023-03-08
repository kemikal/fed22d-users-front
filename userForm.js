let userForm = document.getElementById("userForm");

export function printLoginForm() {
    // SKAPA VY FÖR ATT LOGGA IN

    let loginUsername = document.createElement("input");
    loginUsername.placeholder = "Ditt namn...";
    let loginPassword = document.createElement("input");
    loginPassword.placeholder = "Ditt lösen...";
    let loginUserBtn = document.createElement("button");
    loginUserBtn.innerText = "Logga in"

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
                    printLogoutBtn();
                }
                else {
                    userGreeting.innerText = "Inloggning misslyckades, var vänlig och kontrollera användarnamn och lösenord."
                }
    
           });
        });

        userForm.innerHTML = "";
        userForm.append(loginUsername, loginPassword, loginUserBtn);
}

export function printLogoutBtn() {
    // SKAPA LOGGA UT KNAPP
    let logoutBtn = document.createElement("button");
    logoutBtn.innerText = "Logga ut";

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("username");
        printLoginForm();
    })

    userForm.innerHTML = "";
    userForm.appendChild(logoutBtn);
}