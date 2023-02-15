const modeToggle = document.getElementById("mode-toggle");

$(document).ready(function(){
    $(".theme_icon").on('click', function(){
        $(this).toggleClass("flip fa-sun fa-moon");
        $("html").attr("data-theme", function(i, attr) {
          return attr === "dark" ? "light" : "dark";
        });
    });
  });
//light and dark mode
modeToggle.addEventListener("click", function(event) {
    if (event.target.classList.contains("night-mode")) {
      document.body.style.backgroundColor = "#333";
      document.body.style.color = 'white';
      taskList.style.backgroundColor = "#444";
    } 
    else if (event.target.classList.contains("light-mode")) {
      document.body.style.backgroundColor = "#fff";
      document.body.style.color = 'black';
      taskList.style.backgroundColor = "#fff";
    }
  });