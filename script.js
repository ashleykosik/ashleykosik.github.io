document.querySelectorAll(".truncated").forEach(function(current) {

    current.addEventListener("click", function(e) {
      current.classList.remove("truncated");
    }, false);
  
  });