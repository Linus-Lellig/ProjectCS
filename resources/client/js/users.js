"use strict";
function getUsersList() {
    //debugger
    console.log("Invoked getUsersList()");     //console.log for debugging client side
    const url = "/users/list/";   //API method on web server will be in Users class
    fetch(url, {
        method: "GET",
    }).then(response => {
        return response.json();                 //return response as JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) { //checks if response from the web server has an "Error"
            alert(JSON.stringify(response));    // if it does, convert JSON object to string and alert
        } else {
            formatUsersList(response);          //this function will create a HTML table of the data (as per previous lesson)
        }
    });
}

function getUser() {
    console.log("Invoked getUser()");     //console.log your BFF for debugging client side
    const UserID = document.getElementById("UserID").value;  //get the UserId from the HTML element with id=UserID
    //let UserID = 1; 			  //You could hard code it if you have problems
    //debugger;				  //debugger statement to allow you to step through the code in console dev F12
    const url = "/users/get/";       // API method on webserver
    fetch(url + UserID, {                // UserID as a path parameter
        method: "GET",
    }).then(response => {
        return response.json();                         //return response to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) {         //checks if response from server has an "Error"
            alert(JSON.stringify(response));            // if it does, convert JSON object to string and alert
        } else {
            document.getElementById("DisplayOneUser").innerHTML = response.UserID + " " + response.UserName;  //output data
        }
    });
}

//addUser function to add a user to the database
function addUser() {
    console.log("Invoked AddUser()");
    const formData = new FormData(document.getElementById('InputUserDetails'));
    let url = "/users/add";
    fetch(url, {
        method: "POST",
        body: formData,
    }).then(response => {
        return response.json()
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {
            window.open("/client/index.html", "_self");   //URL replaces the current page.  Create a new html file
        }                                                  //in the client folder called welcome.html
    });
}

function formatUsersList(myJSONArray){
    let dataHTML = "";
    for (let item of myJSONArray) {
        dataHTML += "<tr><td>" + item.UserID + "<td><td>" + item.UserName + "<tr><td>";
    }
    document.getElementById("UsersTable").innerHTML = dataHTML;
}