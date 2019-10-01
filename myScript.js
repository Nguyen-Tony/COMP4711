function openForm() {
	var toggle = document.getElementById("myForm").style.display;
	if (toggle === "none"){
		document.getElementById("myForm").style.display = "block";
	} else {
		document.getElementById("myForm").style.display = "none";
		document.getElementById("artistName").value = "";
		document.getElementById("artistDesc").value = "";
		document.getElementById("imgURL").value = "";
	}
}

function newElement() {
  var li = document.createElement("li");
  var inputValue1 = document.getElementById("artistName").value;
  var inputValue2 = document.getElementById("artistDesc").value;
  var inputValue3 = document.getElementById("imgURL").value;
  var br = document.createElement("br");
  var t1 = document.createTextNode(inputValue1 + "\n");
  var t2 = document.createTextNode(inputValue2);
  var img = document.createElement("img");
  img.src = inputValue3;
  li.appendChild(img);
  li.appendChild(br);
  li.appendChild(t1);
  li.appendChild(br);
  li.appendChild(t2);

  if (inputValue1 === '' || inputValue2 ==='') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("artistName").value = "";
  document.getElementById("artistDesc").value = "";
  document.getElementById("imgURL").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("Delete");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}


// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}