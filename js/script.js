document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  e.preventDefault();
  console.log("its working");


  var siteName = document.getElementById("siteName").value;
  var siteUrl = document.getElementById("siteUrl").value;

  if(!siteName|| !siteUrl){
      alert("please fill the form");
      return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl,
  };
  console.log(bookmark);

  // local storage
  // localStorage.setItem('test','helloWorld');
  // localStorage.getItem('test');
  if (localStorage.getItem("bookmarks") === null) {
    var bookmarks = [];
    //  add to array
    bookmarks.push(bookmark);
    //  set to localstorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    // get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    //  Add bookmark to array
    bookmarks.push(bookmark);
    // reset back to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    // localStorage.clear();
    // refetch
fetchBookmarks();
  }
}

// refetch
fetchBookmarks();

// deleteBookmark
function deleteBookmark(url) {
    //   console.log(url);
    // get bookmark from localStorage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // Loop throught bookmarks
    for(var i=0;i<bookmarks.length;i++){
         if(bookmarks[i].url==url){
        //    remove from array
        bookmarks.splice(i,1);
         }
    }
    // reset
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    // refetch
    fetchBookmarks();
  }

function fetchBookmarks() {
  // get bookmarks from localstorage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  //  console.log(bookmarks);
  //  get output
  var bookmarksResults = document.getElementById("bookmarksResults");
  bookmarksResults.innerHTML = "";
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    bookmarksResults.innerHTML +=
      '<div class="card  text-center card-body bg-light">' +
      "<h3>" +
      name +
      '<a class="btn btn-success float-right " target="_blank" href="'+url+'">Visit</a> '+
      '<a onClick="deleteBookmark(\''+url+'\')" class="btn btn-danger float-right mr-1"  href="#">Delete</a> '+
      "</h3>" +
      "</div>";
  }
}
