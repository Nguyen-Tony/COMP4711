
Object.keys(localStorage).forEach(function (key) {
    console.log(localStorage.getItem(key))
	console.log(key)
    var data = localStorage.getItem(key)
    var dataArray = data.split(",")
	var ul = document.getElementById("myUL")

    addRow(ul, key, dataArray[0], dataArray[1])
})

function expandForm() {
    var newForm = document.getElementById("myForm");
    // newForm.style.display = "block";
    if (newForm.style.display === "none" || newForm.style.display === '') {
        newForm.style.display = "block";
    } else {
        document.getElementById("artistName").value = "";
		document.getElementById("artistDesc").value = "";
		document.getElementById("imgURL").value = "";
        newForm.style.display = "none";
    }
}

function addArtist() {
    var imageURLForm = document.getElementById("imgURL").value
    var name = document.getElementById("artistName").value;
    var aboutArtistForm = document.getElementById("artistDesc").value;
    var ul = document.getElementById("myUL")
    var data = []
    data.push(name)
    data.push(aboutArtistForm)

    localStorage.setItem(imageURLForm, data);
    addRow(ul, imageURLForm, name, aboutArtistForm);
	console.log("add")
    var newForm = document.getElementById("myForm");
    if (newForm.style.display === "none" || newForm.style.display === '') {
        newForm.style.display = "block";
    } else {
		document.getElementById("artistName").value = "";
		document.getElementById("artistDesc").value = "";
		document.getElementById("imgURL").value = "";        
		newForm.style.display = "none";
    }
}

function addRow(ul, url, name, about) {
	var li = document.createElement("li");
	var a = document.createElement("a");
	var t1 = document.createTextNode(name);
	var t2 = document.createTextNode(about);
	var img = document.createElement("img");
	var br = document.createElement("br");

	
	img.src = url;
	a.appendChild(img);
	a.appendChild(t1);
	a.appendChild(br);
	a.appendChild(t2);
	li.appendChild(a);
	ul.appendChild(li);
	
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

function removeRow(oButton,url) {
    //var ul = document.getElementById('myUL');
    //var data = localStorage.getItem(url);
    //console.log(url)
    //console.log(data)

    //localStorage.removeItem(url)
    //ul.parentNode.removeChild(this);
}

function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}




