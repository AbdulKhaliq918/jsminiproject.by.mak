const showNotification = (msg, type) => {
    let bgColor;
    switch (type) {
        case "success":
            bgColor = "linear-gradient(to right, #1D976C, #93F9B9)"
            break;
        case "error":
            bgColor = "linear-gradient(to right, #93291e, #ed213a)"
            break;
        default:
            break;
    }


    Toastify({
        text: msg,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
            background: bgColor,
        },
        onClick: function () { }
    }).showToast();
}



let users = [];
function emailvalid(email) {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}


function handleUserRegister() {
    let registerEmail = document.getElementById('register-email').value
    let registerPassword = document.getElementById('register-password').value
    let alreadyRegistered = false

    if (registerEmail === "" || registerPassword === "") {
        showNotification('Please Enter Email & Password...', 'error')
        return
    }
    else if (!emailvalid(registerEmail)) {
        showNotification('Invalid Email Format', 'error');
        return;
    }
    else if (registerPassword.length < 8) {
        showNotification('Password must be at least 8 characters long', 'error');
        document.getElementById('minidigit').innerHTML = '<p class="text-danger"id="minidigit">' + 'Password must be at least 8 characters long...' + '</p>';
        return;
    }
    else {
        for (let i = 0; i < users.length; i++) {

            if (users[i].email == registerEmail) {
                showNotification('Email Already Registered', 'error')

                alreadyRegistered = true
                break;
            }

        }
    }


    if (alreadyRegistered === false) {
        let newUser = {
            email: registerEmail,
            password: registerPassword,
            uid: Math.random().toString(36).slice(2),
            status: 'active',
            createdAt: new Date()
        }
        users.push(newUser)
        console.log("users",users)
        showNotification('Registration Successful', 'success')


    }
    
        
    document.getElementById('register-email').value = "";
    document.getElementById('register-password').value = "";
    toggleLoginPage();


} 

function handleUserLogin() {

    let loginEmail = document.getElementById('login-email').value
    let loginPassword = document.getElementById('login-password').value
    let userFound = false

    if (loginEmail === "" || loginPassword === "") {
        showNotification('Please Enter Email & Password...', 'error')
        return
    }
    for (let i = 0; i < users.length; i++) {

        if (users[i].email == loginEmail && users[i].password === loginPassword) {
            document.getElementById('result').innerHTML = '<span class=" text-warning fw-bold">Logged In : </span> ' + '<span class="btn text-white fw-bold border-warning overflow-hidden me-2 border-2 p-1" id="result" > ' + loginEmail + ' </span> ';
            userFound = true
            showNotification(`Welcome ${loginEmail}`, 'success')
            document.getElementById('REGISTER-FORM').style.display = "none"
            document.getElementById('LOGIN-FORM').style.display = "none"
            document.getElementById('forgotPassword').style.display = "none"
            document.getElementById('TODO-FORM').style.display = "block"
            document.getElementById('header').style.opacity = "100"
            
            break;
        }else {
            showNotification('You have entered the wrong password.', 'error');
            return;
        }

        }
        
        if (userFound == false) {
            showNotification('User not found. Please Register First.', 'error');
            
            }
            
            document.getElementById('login-email').value = "";
            document.getElementById('login-password').value = "";

}


function handleResetPassword(){
    let forgotEmail = document.getElementById('forgot-email').value;
    let newPassword = document.getElementById('forgot-password').value;
    let confirmPassword = document.getElementById('confirm-password').value;
    if (!forgotEmail || !newPassword || !confirmPassword) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    if (newPassword !== confirmPassword) {
        showNotification('Passwords do not match.', 'error');
        return;
    }
    let userIndex = users.findIndex(user => user.email === forgotEmail);

    if (userIndex === -1) {
        showNotification('User not found.', 'error');
        return;
    }
    users[userIndex].password = newPassword;
    showNotification('Password reset successfully!', 'success');

    document.getElementById('forgot-email').value = "";
    document.getElementById('forgot-password').value = "";
    document.getElementById('confirm-password').value = "";
    console.log("users",users)
    toggleLoginPage();


}

function toggleRegisterPage() {


    document.getElementById('LOGIN-FORM').style.display = "none"
    document.getElementById('TODO-FORM').style.display = "none"
    document.getElementById('forgotPassword').style.display = "none"
    document.getElementById('REGISTER-FORM').style.display = "block"


}


function toggleLoginPage() {


    document.getElementById('REGISTER-FORM').style.display = "none"
    document.getElementById('TODO-FORM').style.display = "none"
    document.getElementById('forgotPassword').style.display = "none"
    document.getElementById('LOGIN-FORM').style.display = "block"


}


function toggleForgotPassword(){
    document.getElementById('REGISTER-FORM').style.display = "none"
    document.getElementById('TODO-FORM').style.display = "none"
    document.getElementById('LOGIN-FORM').style.display = "none"
    document.getElementById('forgotPassword').style.display = "block"
}
function toggleTodoOutput(){
    document.getElementById('REGISTER-FORM').style.display = "none"
    document.getElementById('TODO-FORM').style.display = "none"
    document.getElementById('LOGIN-FORM').style.display = "none"
    document.getElementById('forgotPassword').style.display = "none"
    document.getElementById('TODO-OUTPUT').style.display = "block"
}
function toggleTodoForm(){
    document.getElementById('REGISTER-FORM').style.display = "none"
    document.getElementById('TODO-FORM').style.display = "block"
    document.getElementById('LOGIN-FORM').style.display = "none"
    document.getElementById('forgotPassword').style.display = "none"
    document.getElementById('TODO-OUTPUT').style.display = "none"
}
let todos = [];
function addTask(){
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const date= document.getElementById('task-date').value;
    if(!title || !description || !date){
        showNotification('Please fill the following fields ???', 'error');
        return;
    }
    let getRandomId = () => {
        return Math.random().toString().substr(2,9);
    }
    
    const todo = {
        title: title,
        description: description,
        date: date,
        id: getRandomId(),
        status: "Pending Work",
        createdAt: new Date(),
        
    };
    
    todos.push(todo);
    console.log('todos',todos)
    showNotification('Task added successfully to your TO-DO List..!', 'success');
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-date').value = '';

    
}


function viewTasks() {
    let outputInner = document.getElementById('output-inner');
    outputInner.innerHTML = ''; // Clear existing content

    let table = `
        <table class="table" style="width: 1000px;">
            <tr>
                <th style="padding: 10px; text-align: left; width: 5%;">#</th>
                <th style="padding: 10px; text-align: left; width: 15%;">Task</th>
                <th style="padding: 10px; text-align: left; width: 20%;">Description</th>
                <th style="padding: 10px; text-align: left; width: 10%;">Date</th>
                <th style="padding: 10px; text-align: left; width: 10%;">ID</th>
                <th style="padding: 10px; text-align: left; width: 10%;">Status</th>
                <th style="padding: 10px; text-align: left; width: 15%;">Created At</th>
                <th style="padding: 10px; width: 15%;">Action</th>
            </tr>
    `;
    
    todos.forEach((todo, index) => {
        table += `
            <tr>
                <td style="padding: 10px; text-align: left; width: 5%;">${index + 1}</td>
                <td style="padding: 10px; text-align: left; width: 15%;">${todo.title}</td>
                <td style="padding: 10px; text-align: left; width: 20%;">${todo.description}</td>
                <td style="padding: 10px; text-align: left; width: 10%;">${todo.date}</td>
                <td style="padding: 10px; text-align: left; width: 10%;">${todo.id}</td>
                <td style="padding: 10px; text-align: left; width: 10%;">${todo.status}</td>
                <td style="padding: 10px; text-align: left; width: 15%;">${todo.createdAt}</td>
                <td style="padding: 10px; width: 15%;">
                    <button onclick="updateTask(${index})" class="btn btn-success" style="width: auto;">Update</button>
                    <button onclick="deleteTask(${index})" class="btn btn-danger" style="width: auto;">Delete</button>
                </td>
            </tr>
        `;
    });

    table += `</table>`;
    outputInner.innerHTML = table;
    toggleTodoOutput();
}


 

function updateTask(index){
    todos[index].status = 'Completed';
    showNotification('Task status updated to completed', 'success');
    viewTasks();
      


    
}

function deleteTask(index) {
    todos.splice(index, 1);
    showNotification('Task deleted successfully', 'success');
    viewTasks(); 
}