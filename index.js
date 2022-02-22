let user = [];
let pass = [];

user.push("batho@kisasa.com");
user.push("people@kisasa.com")
pass.push("{007Batho}");
pass.push("#10Kisasa");

function createUser(){
    if(!document.getElementById("userc").value.toLowerCase().match(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    )){
        alert("Email not in correct format");
    }else if(!document.getElementById("passc").value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)){
        document.getElementById("userc").style.border = "thin solid red";
        document.getElementById("passc").style.border = "1px solid rgba(0,0,0,0.3)";
        alert("Password needs to have at least 1 uppercase alphabet, 1 lowercase alphabet, 1 number, 1 special character, and must have a minimum of 8 characters");
    }else{
        user.push(document.getElementById("userc").value);
        pass.push(document.getElementById("passc").value);
        alert("Account Created");
    }
    
}

function validate(){

    for(let i = 0; i<user.length; i++){
        if(document.getElementById("useri").value ==  user[i]){
            if(document.getElementById("passi").value == pass[i]){
                document.location.href = "https://kisasa.co.za/services/";
                break;
            }else{
                document.getElementById("passi").style.border = "thin solid red";
                alert("The entered password is not correct");
            }
        }else if(i == user.length - 1){
            document.getElementById("useri").style.border = "thin solid red";
            document.getElementById("passi").style.border = "1px solid rgba(0,0,0,0.3)";
            alert("User not found");
        }
    }   
}