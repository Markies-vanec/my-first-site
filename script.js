const button = document.getElementById("greet");
const message = document.getElementById("message");
let count = 0;
button.addEventListener("click", function () {
count++;  
message.textContent = "You clicked " + count + " times.";});