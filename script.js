var todos = [];

function generateTodos() {
    event.preventDefault();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) { 
        todos = JSON.parse(this.responseText);
        console.log(todos); 
        console.log(todos[0].created);
        displayTodos();
    } 
    };
    xhttp.open("GET", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("x-api-key", "3665e5-754c28-72b1e8-08c5bc-2a22ac");
    xhttp.send();
}
  
function clearForm() {
    document.getElementById("todo-text").value = "";
}

  function addTodo() {
    event.preventDefault();
    var data = {
        text: document.getElementById("todo-text").value
    }

    clearForm();

    var xhttp2 = new XMLHttpRequest();

    xhttp2.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            var todo = JSON.parse(this.responseText);
            console.log(todo);
            generateTodos();
        } else if (this.readyState == 4){
            console.log(this.responseText);
        }
    };

    xhttp2.open("POST", "https://cse204.work/todos", true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "3665e5-754c28-72b1e8-08c5bc-2a22ac");
    xhttp2.send(JSON.stringify(data));
  }
  
  function displayTodos() {
    event.preventDefault();
    document.getElementById("todo-list").innerHTML = "";
    var checkBox = document.createElement("INPUT");
    checkBox.setAttribute("type", "checkbox");
    var btn = document.createElement("button");
    btn.setAttribute("class", "btn btn-secondary btn-sm");
    btn.innerHTML = "Delete";
    for(let i = todos.length-1; i > -1; i--){
        checkBox.setAttribute("id", i);
        checkBox.setAttribute("onclick", "checkBoxChecked(this)");
        btn.setAttribute("id", i);
        btn.setAttribute("onclick", "deleted(this)");
        var item = document.createElement("div");
        document.getElementById("todo-list").appendChild(item);
        item.appendChild(checkBox);
        item.innerHTML += " " + todos[i].text + " ";
        item.appendChild(btn);
        item.innerHTML += "<br>";
        item.style.padding = "0.2%";
        item.style.fontSize = "200%"
        if(todos[i].completed){
            item.style.color = "red";
            console.log("red");
        }else {
            item.style.color = "black";
            console.log("black");
        }
    }
  }
  
function checkBoxChecked(e){
    event.preventDefault();
    
    var data;
    
    if(todos[e.id].completed){
        data = {
            completed: false
        }
    }else{
        data = {
            completed: true
        }
    }

    var id = todos[e.id].id;

    var xhttp3 = new XMLHttpRequest();
    
    xhttp3.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            var todo = JSON.parse(this.responseText);
            console.log(todo);
            generateTodos();
        } else if(this.readyState == 4){
            console.log(this.responseText);
        }
    };
    
    xhttp3.open("PUT", "https://cse204.work/todos/"+id, true);
    
    xhttp3.setRequestHeader("Content-type", "application/json");
    xhttp3.setRequestHeader("x-api-key", "3665e5-754c28-72b1e8-08c5bc-2a22ac");
    xhttp3.send(JSON.stringify(data));
}

function deleted(e){
    event.preventDefault();

    var id = todos[e.id].id;

    var xhttp4 = new XMLHttpRequest();
    
    xhttp4.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            generateTodos();
        } else if(this.readyState == 4){
            console.log(this.responseText);
        }
    };
    
    xhttp4.open("DELETE", "https://cse204.work/todos/"+id, true);
    xhttp4.setRequestHeader("x-api-key", "3665e5-754c28-72b1e8-08c5bc-2a22ac");
    xhttp4.send();

}
  const formElement = document.getElementById("add-todo");
  formElement.addEventListener("submit", addTodo);

