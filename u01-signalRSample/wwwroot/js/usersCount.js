//create connection
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();


// connect to methods that hub invokes aka receive notifications from hub
connectionUserCount.on("updateTotalViews", (value) => {
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = value.toString();
});

connectionUserCount.on("updateTotalUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerText = value.toString();
});


// invoke hub methods aka send notification to hub
function newWindowLoadedOnClient() {
    connectionUserCount.send("NewWindowLoaded")
}

//function newWindowLoadedOnClient() {
//    connectionUserCount.invoke("NewWindowLoaded")
//        .then((value) => {
//            console.log(value);

//        })

//}


// start connection 
function fulfilled() {
    console.log("connection started");
    newWindowLoadedOnClient();
}

function rejected() {
    console.log("connection failed");
}

connectionUserCount.start().then(fulfilled, rejected);
