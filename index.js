let user = [];
let pass = [];

user.push("banana@mymail.com");
pass.push("#14Bananas");

function createUser(){
    if(!document.getElementById("userc").value.toLowerCase().match(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    )){
        alert("Email not in correct format");
    }else if(!document.getElementById("passc").value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)){
        alert("Password needs to have at least 1 uppercase alphabet, 1 lowercase alphabet, 1 number, 1 special character, and must have a minimum of 8 characters");
    }else{
        user.push(document.getElementById("userc").value);
        pass.push(document.getElementById("passc").value);
        alert("Account Created");
    }
    
}

function validate(){

    for(let i = 0; i<user.length; i++){
        if(document.getElementById("useri").value == user[i]){
            if(document.getElementById("passi").value == pass[i]){
                document.location.href = "https://kisasa.co.za/";
                break;
            }else if(i == user.length-1){
                if(document.getElementById("useri").value != user[i] || document.getElementById("passi").value != pass[i]){
                alert("User Details Can't Be Confirmed");
                }
            }
        }
    }   
}