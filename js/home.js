
var dataset;

function slugify(strn) {
  return strn.replace(/[^a-zA-Z0-9-]/g,"-").toLowerCase()
  }

function toggle(el) {
  el=$("#"+el.id)
  if (el.hasClass("expanded")) {
    el.removeClass("expanded") }
    else {
      el.addClass("expanded")
      }
  }

function create_offsetlist() {
  for (var i=0; i<dataset.recordCount/10; i++) {
    html=["<a class='btn btn-small' href='#' onclick='show_dataset("]
    html.push(i*10);
    html.push(")'")
    html.push("id='ol-"+i+"'>");
    html.push(i+1);
    html.push("</a>");
    $("#ol").append(html.join(""))
    }
  }
function show_dataset(offset) {
  dataset.query({size:10, offset:offset}).done(function() {
  $("#requests").empty();
      _.each(dataset.records.models, function(d) {
        $("#ol a").removeClass("active");
        $("#ol-"+(offset/10)).addClass("active");
        html=["<li onclick='toggle(this)'"];
        if (d.attributes.delivered) {
          html.push("class='delivered'");
        }
        html.push("id='"+slugify(d.attributes.title)+"'>");
        html.push(d.attributes.title);
        html.push("<span class='icon-download'></span>");
        html.push("<div class='description'>");
        html.push(d.attributes.description);
        html.push("</div>");
        html.push("</li>");
        $("#requests").append(html.join(""));
        }) })
  }
$(document).ready(function() {
  var url="https://docs.google.com/spreadsheet/ccc?key=0AlgwwPNEvkP7dGpPQkZ3ZS1iR18tTzRjTmJZMkVxUnc#gid=0"
  dataset = new recline.Model.Dataset ({
    id:"witd-tz",
    url: url,
    backend: 'GDocs'
    });
    dataset.fetch().done(function() {
      create_offsetlist();
      show_dataset(0);
      })
  })
