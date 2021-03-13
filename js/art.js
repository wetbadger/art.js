/**
 * art.js v0.1 - javascript for art portfolios
 * Author: Ben Alexander
 * http://www.benalexandermedia.com
 *
 * License: CC BY-SA
 */

var hist = [];
var hash;
var path;
DOMAIN = 'http://localhost/';

function ajaxShowImage(path, elem, name) { //because CSS doesn't know the width of the images, the text has to be centered with javascript
  $.ajax({
    url : path,
    success: function (data) {
      var img = new Image();
      img.src = path;
      img.onload = function(){
        var imgHeight = img.naturalHeight;
        var imgWidth = img.naturalWidth;
        // code here to use the dimensions;
        var width = imgWidth/(imgHeight/thumbnailHeight);
        img.height = thumbnailHeight;
        $(elem).append("<div class=\"centered\" style='transform:translate("+-((thumbnailHeight-width)/2)+"px,"+(-thumbnailHeight/2)+"px)'>"+name+"</div>");
      }
      $(elem).append(img);//"<img src='"+ arrOfDirThumbnails[i] +"' height='240'/>");
    },
    error: function() {
      // Handle error here
      $(elem).append("<img src='assets/missing.png' height = '"+thumbnailHeight+"px'></img>"); //thumbnail not found
      $(elem).append("<div class=\"centered\" style='transform:translate("+0+"px,"+(-thumbnailHeight/2)+"px)'>"+name+"</div>");
    }
  });
}

function clearBox(className) {
   jQuery(className).empty();
}

function urlExists(url) {
    var http = new XMLHttpRequest(); //deprecated!
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

function createHash (hash) {
 location.hash = hash;
}

function displaySidebar() {
  //$(".container").append("<div class='vline'></div>");
  var maxLength = 0;
  $.ajax({
      url : "/"+imageFolder+"/",
      success: function (data) {
          $(data).find("a").attr("href", function (i, val) {
              val = val.substring(1);
              if( val.startsWith(imageFolder+"/") && !val.match(/\.(jpe?g|png|gif)$/) ) {
                  var lastWord = val.split("/").slice(-1);
                  if (lastWord[0].length > maxLength) {
                    maxLength = lastWord[0].length;
                  }
                  var checked = "";
                  if (lastWord == window.location.hash.substring(1).split("/")[0]) {
                    checked = "checked";
                  }
                  //labels in tables can be equally wide
                  content = "<tr cellpadding='0'><th cellpadding='0'><input id='"+(lastWord+'').replace('%20', '_')+"_' " +
                  "type='radio' name='radio' value='"+decodeURIComponent(lastWord)+"' class='sideButton' "+checked+">"+
                  "<label class='side-label' for='"+(lastWord+"").replace('%20', '_')+"_'>"+decodeURIComponent(lastWord)+
                  "</label></input></th></tr>"
                  if (side == "prepend") {
                    $("aside").prepend(content);
                  } else {
                    $("aside").append(content);
                  }
                  checked = "";
              }
          });
          document.addEventListener('change', function(e) {
            if(e.target && e.target.className == 'sideButton') { //removed && e.target.id == 'sideButton' (was this important?)
              var sideButton = e.target.value;
              if (window.location.hash != "#"+encodeURIComponent(sideButton)) { //so stuff doesn't disapear if u click the same button
                clearBox(element);
              }
              createHash(sideButton);
            }
          });
          document.addEventListener('click', function(e) {
            if(e.target && e.target.className == 'side-label') { //removed && e.target.id == 'sideButton' (was this important?)
              var sideButton = $('input[name=radio]:checked').val();
              var clickedThing = e.target;
              var checkHash = decodeURIComponent(window.location.hash.substring(1));
              if (checkHash.startsWith("_")) {
                  checkHash = checkHash.substring(1);
              }
              if (sideButton != checkHash && sideButton == clickedThing.getAttribute('for').slice(0, -1)) { //only in the rare event that user clicks the sidebar element that they are already at least 1 layer deep in do we run createHash()
                createHash(sideButton);
              }
            }
          });
        //an example of some adjustments that can be made based on the size of things:
        //$('.sidebar').css('padding-left', (-1.59*maxLength+10)+"%");
        //$('.name').css('margin-left', (1.1*maxLength-4.5)+"%");
        //$('.sidebar').css('padding-right', (2.8*maxLength-20)+"%");
        //$(element).css('padding-left', (0.55*maxLength-4)+"%");
        //$('.vline').css('margin-left', (0.4*maxLength+16)+"%");
      }
  });
}

function displayNavbar() {
  $.ajax({
      url : "/"+textFolder+"/",
      success: function (data) {
          $(data).find("a").attr("href", function (i, val) {
              val = val.substring(1);
              if( val.startsWith(textFolder+"/") && !val.match(/\.(jpe?g|png|gif)$/) ) {
                  var lastWord = val.split("/").slice(-1);
                  var checked = "";
                  if (lastWord == window.location.hash.substring(2)) { //2 because text files are indicated by #_
                    checked = "checked";
                  }

                  if (nav == 'hover') {
                    content = "<div class='dropdown'><li><input class='navButton' id='"+(lastWord+'').replace('%20', '_')+"' type='radio' "+
                    "name='radio' value='"+decodeURIComponent(lastWord)+"' "+checked+">" +
                    "<label class='nav-label' for='"+(lastWord+"").replace('%20', '_')+"'>"+decodeURIComponent(lastWord)+"</label></input></li></div>";
                  } else {
                    content = "<li><input class='navButton' id='"+(lastWord+'').replace('%20', '_')+"' type='radio' "+
                    "name='radio' value='"+decodeURIComponent(lastWord)+"' "+checked+">" +
                    "<label class='nav-label' for='"+(lastWord+"").replace('%20', '_')+"'>"+decodeURIComponent(lastWord)+"</label></input></li>"
                  }
                  $("nav").append(content);
                  checked="";
              }
          });
          document.addEventListener('change', function(e) {
            if(e.target && e.target.className == 'navButton') {
              var navButton = e.target.value;
              if (window.location.hash != "#_"+encodeURIComponent(navButton)) { //so stuff doesn't disapear if u click the same button
                clearBox(element);
              }
              createHash("_"+navButton);
            }
          });
          document.addEventListener('click', function(e) {
            if(e.target && e.target.className == 'nav-label') { //removed && e.target.id == 'sideButton' (was this important?)
              var navButton = $('input[name=radio]:checked').val();
              var clickedThing = e.target;
              var checkHash = decodeURIComponent(window.location.hash.substring(1));
              if (checkHash.startsWith("_")) {
                  checkHash = checkHash.substring(1);
              }
              if (navButton != checkHash && navButton == clickedThing.getAttribute('for')) {
                createHash("_"+navButton);
              }
            }
          });
      }
  });
}

function displayImage(thumbnail, image) {
  id = image.split("/");
  id = id[id.length - 1];
  id = id.replace(/\./g,"_");
  //id = id.replace(/ /g,"_");
  html = '<a href="'+image+'" data-lightbox="gallery" id="'+id+'"><img class="pic" src="'+thumbnail+'" height="240" / ></a>';
  $(element).append(html);
}

function loadVideo(path) {
  path = decodeURIComponent(path);
  $.featherlight("<div style='height:720px;width:1280px;'><video id=\"my-video\" class=\"video-js\"" +
  " autoplay controls preload=\"auto\" style='height:720px;width:1280px;'" +
  " poster=\"MY_VIDEO_POSTER.jpg\" data-setup=\"{}\">" +
  "<source src='"+path+"' type='video/mp4'></source></video><div>");
}

function displayArt (path) {
  clearBox(element);
  var count = 0;
  var arrOfThumbnails = [];
  var arrOfImages = [];
  var json;
  var filenames = [];
  var headlines = [];
  var descriptions = [];
  var statuses = [];
  var arrOfHashes = [];
  var arrOfDirNames = [];
  var arrOfDirPaths = [];
  var arrOfDirThumbnails = [];
  var arrOfMovieThumbnails = [];
  var arrOfMovies = [];
  var width = 0;
  var arrOfWidths = [];
  var folder = imageFolder;
  if (window.location.hash.substring(1).startsWith("_")) { //look in /TextFiles/
    folder = textFolder;
    path = path.substring(1);
  }
  //clearBox(".main-label");
  //$(".main-label").append(decodeURIComponent(path)); //tell the user where they are
  $.ajax({
    url : folder+"/"+path,
    data : folder+"/"+path+("/info.json"),
    success: function (data) {
        $(data).find("a").attr("href", function (i, val) {
          var lastWord = val.split("/").splice(-1)[0];
          //file is a directory
          val = val.substring(1);
          console.log("if ("+val+".startsWith("+folder+"/"+path+"/)");
          if (val.startsWith(folder+"/"+path+"/") && !val.match(/\.(jpe?g|png|gif|mp4|m4v|mov|avi|txt|html|json)$/i)) {
            var newHash = val.replace(folder,''); //remove root folder from path in hash
            arrOfHashes.push(newHash);
            arrOfDirNames.push(decodeURIComponent(lastWord));
            arrOfDirPaths.push(val);
            arrOfDirThumbnails.push(val+".jpg");
          }
          //file is an image
          if(!lastWord.startsWith("_") && val.match(/\.(jpe?g|png|gif)$/i) ) { //if source is not a thumbnail and is an image
            var thumbnail = "_" + lastWord.replace(/\.(jpe?g|png|gif)$/i, "") + ".jpg";
            var thumbnailFullPath = val.replace(lastWord, "")+thumbnail;
            //var details = lastWord.replace(/\.(jpe?g|png|gif)$/i, "") + ".json";
            //var detailsFullPath = val.replace(lastWord, "")+details;
            arrOfThumbnails.push(thumbnailFullPath);
            arrOfImages.push(val);
            //arrOfJSON.push(detailsFullPath);
          }
          //file is a movie
          if(  val.match(/\.(mp4|mov)$/i) ) {
            var thumbnail = "_" + lastWord.replace(/\.(mp4|mov)$/i, "") + ".jpg";
            var thumbnailFullPath = val.replace(lastWord, "")+thumbnail;
            //var details = lastWord.replace(/\.(mp4|mov)$/i, "") + ".json";
            //var detailsFullPath = val.replace(lastWord, "")+details;
            arrOfMovieThumbnails.push(thumbnailFullPath);
            arrOfMovies.push(val);
            //arrOfJSON.push(detailsFullPath);
          }
          //file is text or html
          if(  val.match(/\.(txt|html|php)$/i) ) {
            $(element).append("<div class='text'></div>");
            text = $(".text").load(val);
            count++;
          }
          //file is json
          if( val.match(/\.(json)$/i) ) {
            jQuery.get(DOMAIN+folder+path+"/info.json", function(data) {
              json = data;
              var id;
              for (var i = 0; i < json.length; i++) {
                id = json[i]["filename"].replace(/\./g,"_");
                //id = id.replace(/ /g,"_");
                if (typeof json[i]["headline"] === 'undefined') {
                  headline = "";
                } else {
                  headline = json[i]["headline"];
                }

                if (typeof json[i]["description"] === 'undefined') {
                  description = "";
                } else {
                  description = json[i]["description"];
                }

                if (typeof json[i]["status"] === 'undefined') {
                  status = "";
                } else {
                  status = "<br>Status: "+json[i]["status"];
                }
                $('#'+id).attr('data-headline', headline);
                $('#'+id).attr('data-title', description + status);
              }
            });
          }
        });
        //display images
        for (var i = 0; i < arrOfThumbnails.length; i++) {
          var matchDirName = decodeURIComponent(arrOfImages[i].replace(/\.(jpg)$/i, "").split("/").splice(-1)[0]);
          try { //an overly complicated way of checking for movie thumbnail matches
            var matchMovName = decodeURIComponent(arrOfMovies[i].replace(/\.(mov|mp4)$/i, "").split("/").splice(-1)[0]);
            matchMovName = matchMovName.replace(/\ /g, "%20");
            var lastWordArrOfImages = [];
            for (j = 0; j < arrOfImages.length; j++) {
              lastWordArrOfImages.push(arrOfImages[j].replace(/\.(jpg)$/i, "").split("/").splice(-1)[0]);
            }
          } catch (error) {
            matchMovName = "Dont Use This Title";
            lastWordArrOfImages = "Dont use this title";
          }
          if (arrOfDirNames.includes(matchDirName) || lastWordArrOfImages.includes(matchMovName)) {
            //if name matches dir, do not show
          } else {
            var headline = "";
            var description = "";
            var status = "";
            f = arrOfImages[i].split("/");
            for (j = 0; j < filenames.length; j++) {
            }
            if (thumbnails) {
              displayImage(arrOfThumbnails[i], arrOfImages[i]);
              //$(element).append( "<img alt='Art Thumbnail' class='pic' src='"+ arrOfThumbnails[i] +"' height='240' data-lightbox='gallery' data-title='My caption' data-headline='My title' data-alt='title'/ >" );
            } else {
              displayImage(arrOfImages[i], arrOfImages[i]);
              //$(element).append( "<img alt='Artwork' class='pic' src='"+ arrOfImages[i] +"' height='240' data-lightbox='"+ arrOfImages[i] +"' data-title='My caption' data-headline='My title' data-alt='title'/ >" );
            }
            count++;
          }
        }
        //display directories
        for (var i = 0; i < arrOfDirNames.length; i++) {
          var underscore = arrOfDirThumbnails[i].split("/");
          underscore[underscore.length-1] = "_" + underscore[underscore.length-1];
          underscore = underscore.join("/");
          if (window.location.hash[1] == "_") {
            hash = "_" + arrOfHashes[i].substring(1);
          } else {
            hash = arrOfHashes[i].substring(1);
          }
          console.log(hash);
          if (hash.startsWith("_") && nav == 'hover') {
            content = "<div class='dropdown-content' ><!--\n--><a id='drop"+i+"'onClick=\"clearBox('"+element+"');" +
            "createHash('"+hash+"');\">" +
            hash+"</a><!--\n--></div>";
            $('.dropdown').append(content);
          } else {
            content = "<div class='but' ><!--\n--><button id='img"+i+"'onClick=\"clearBox('"+element+"');" +
            "createHash('"+hash+"');\">" +
            "</button><!--\n--></div>";
            $(element).append(content);
          }
          //ajax success goes her i guess
          ajaxShowImage(arrOfDirThumbnails[i], "#img"+i, arrOfDirNames[i]);
          count++;
        }
        //display movies
        for (var i = 0; i < arrOfMovies.length; i++) {
          var lastWord = arrOfMovies[i].split("/").splice(-1)[0];
          lastWord = lastWord.replace(/%20/g," ");
          console.log(arrOfMovieThumbnails[i]);
          if (urlExists(decodeURIComponent(arrOfMovieThumbnails[i]))) {
            $(element).append( "<div class='but' >"+
            "<button onClick=\"loadVideo('.."+arrOfMovies[i]+"')\"" + "id='mov"+i+"'><img height='240' src='"+arrOfMovieThumbnails[i]+"'><div class='centered2'>"+lastWord+"</div></img></button></div>"
            );
            //ajax success goes her i guess
            //ajaxShowImage(arrOfMovieThumbnails[i], "#img"+i, arrOfMovies[i]);
          } else {
            $(element).append( "<div class='but' >"+
            "<button onClick=\"loadVideo('.."+arrOfMovies[i]+"')\"" + "id='mov"+i+"'><img height='240' src='/assets/play-button.png'><div class='centered2'>"+lastWord+"</div></img></button></div>"
            );
            //ajax success goes her i guess
            //ajaxShowImage('/assets/play-button.png', "#img"+i, arrOfMovies[i]);
          }
          count++;
        }
      //if folder loads nothing display this error message
      if (count === 0) {
        $(element).append("<div class='empty'>Nothing to show here.</div>");
      }
    }
  });
}
//load page and/or handle refresh
function go() {
  console.info(performance.navigation.type);
  if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    console.log("Refresh detected.");
    hash = window.location.hash;
    path = window.location.hash.substring(1); //remove the #
    createHash (""); //when window is refreshed store the current hash and send the website to #'' which will trigger a return to the original hash of the page
  } else {
    //load page normally
    console.log("Loading page normally...");
    createHash (start); //folder with dirs / images to start in
    var path = window.location.hash.substring(1); //remove the #
    displaySidebar();
    displayNavbar();
  }
}

window.onhashchange = function() {
  path = window.location.hash.substring(1); //remove the #, path is global
  var firstWord = path.split("/")[0].replace('%20','_');
  if (firstWord.startsWith("_")) {
    firstWord = firstWord.substring(1); //remove starting _ which indicates a text file
  } else {
    firstWord = firstWord + "_"; //add _ to side-label (changing hash from button id prevents page "jumping")
  }
  if (path == "") {
    try {
      if (hash.split("/").length < 1) { // hash is either undefined or of 0 length because back arrow
        window.location.replace("/");
      } else {
        hist.push(hash);
        if (hist[0] == hist[1]) {
          window.location.replace("/");
        } else {
          createHash (hash); //hash is global created by refresh
          displaySidebar();
          displayNavbar();
          //$(".name").append("<div class='line'></div>");
        }
      }
    } catch(e) {
      window.location.replace("/");
    }
  } else if (path == "undefined") { //this error is caused by the back arrow in some instances. (not sure why, but it's handled by returning to main page)
    window.location.replace("/index.html");
  } else {
    displayArt(path);
  }
  try {
    clearBox(element);
    $("#"+firstWord).prop("checked", true);
  } catch(e) {
    console.log("Refresh");

  }
}
