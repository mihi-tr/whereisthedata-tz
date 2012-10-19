
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
    data={offset:i*10,
      id:i,
      number:i+1};
    $("#ol").append(Mustache.render("<a class='btn btn-small' href='#'\
    onclick='show_dataset({{offset}})' id='ol-{{id}}'>{{number}}</a>",data))
    }
  }

function show_dataset(offset) {
  dataset.query({size:10, offset:offset}).done(function() {
  $("#requests").empty();
      _.each(dataset.records.models, function(d) {
        $("#ol a").removeClass("active");
        $("#ol-"+(offset/10)).addClass("active");
        data={
          delivered: d.attributes.delivered?true:false,
          slug: slugify(d.attributes.title),
          title: d.attributes.title,
          description: d.attributes.description
          }
        $("#requests").append(Mustache.render("<li onclick='toggle(this)' {{#delivered}} class='delivered' {{/delivered}} id='{{slug}}' > {{title}} <span class='icon-download'></span> <div class='description'> {{description}} </div> </li>",data)) 
  })
  })
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
