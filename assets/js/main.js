
var modal = document.getElementById('modal');
var collapse = document.getElementsByClassName("collapse");

var local = {
  init:function(){
    document.getElementById("popme").onclick = function() {
      modal.style.display = "block";
    };

    for (i = 0; i < collapse.length; i++) {
      collapse[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        var icon = this.querySelector(".fa");

        if (content.style.display === "block") {
          content.style.display = "none";
          icon.classList.add('fa-angle-down');
          icon.classList.remove('fa-angle-up');
        } else {
          content.style.display = "block";
          icon.classList.remove('fa-angle-down');
          icon.classList.add('fa-angle-up');
        }
      });
    }
  },
  closeModal:function(id){
    document.getElementById(id).style.display = "none";
  }
}