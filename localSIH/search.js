$(function(){
  var url = new URL(window.location.href);
  var searchedUrl = url.searchParams.get("search");
  var ip;
  var createdDate;
  var country;
  var city;
  var region;
  var latitude;
  var longitude;
  var safePercent;
 showLoader();
 // var data = {
 //   Url : "google.in",
 //   SafePercent:34.4,
 //   IpAddress:"192.168.1.0",
 //   CreatedOn:"1990-08-08",
 //   Location:"Delhi"
 // }
 // ajax("post","url/",JSON.stringify(data),function(r){
 //   console.log(r)}
 //   ,function(err){console.log(err)});
// renderResults("38.9575","-94.6452","68.168.104.110","18.5","Kansas","1995-03-02T05:00:00Z",searchedUrl);
 ajax("get","url/"+searchedUrl,null,function(r){
   if(r.Status){
     region = r.Location;
     ip = r.IpAddress;
     safePercent = r.SafePercent;
     createdDate = r.CreatedOn;
     renderResults("38.9575","-94.6452",ip,safePercent,region,createdDate,r.Url);
   }else{

   }
 },function(err){});
//  ajax("get","whois/"+searchedUrl,null,function(r){
//     var whoisData = JSON.parse(r.Data);
//     whoisData = whoisData.WhoisRecord;
//     var ip = whoisData.ips[0];
//     var createdDate = whoisData.createdDate;
//     ajax("get","ipstack/"+ip,null,function(r){
//       var ipstackData = JSON.parse(r.Data);
//        country = ipstackData.country_name;
//        city = ipstackData.city;
//        region = ipstackData.region_name;
//        latitude = ipstackData.latitude;
//        longitude = ipstackData.longitude;
//        ajax("get","model/"+searchedUrl,null,function(r){
//          safePercent = r.Data;
//          renderResults(latitude,longitude,ip,safePercent,region,createdDate);
//        },function(err){})
//     },function(err){})
//  },function(err){})
})

function renderResults(latitude,longitude,ip,safePercent,region,createdDate,url){
  renderSearchHead(url);
  renderDoughnutChart(safePercent);
  renderMap(latitude,longitude,region);
  renderMiscDetails(ip,region,createdDate);
  hideLoader();
}

function renderSearchHead(url){
  var html = '<div class="search-result-head">Search Result For : <span id="searched-for">' + url + '</span></div>';
  $(".search-head").append(html);
}

function renderMiscDetails(ip,region,createdDate){
  var html = '<div>Ip Address : <span class="ip-add">'+ ip +'</span></div>'+
              '<div>Created On: ' + createdDate + '</div>';
  $(".misc-details").append(html);
}

function showLoader(){
   $(".loader").css("display","inline-block");
}

function hideLoader(){
  $(".loader").css("display", "none");
}

function ajax(type, urlApi, data, func, efunc, dataType, contentType, aSync, processData) {
  var api = "http://localhost:3001/"
  dataType = dataType || 'JSON';
  if (contentType !== false)
    contentType = contentType || 'application/json';
  if (aSync === undefined)
    aSync = true;
  if (processData === undefined)
    processData = true;

    return $.ajax({
      statusCode: {
        401: function () { }
      },
      type: type,
      url: api + urlApi,
      dataType: dataType,
      contentType: contentType,
      data: data,
      success: func,
      error: efunc
    });
}

function renderDoughnutChart(safe){
var ctx = document.getElementById("pie-chart");
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["safe","suspicious"],
    datasets: [{
      backgroundColor: [
        "#2ecc71",
        "#3498db",
      ],
      data: [safe,100-safe]
    }]
  },
  options:{
    responsive:true,
    maintainAspectRatio:false
  }
  });
}

function renderMap(latitude,longitude,region){
  var map ='<iframe  width="100%" height="100%"'+
    'frameborder="0" style="border:0"'+
    'src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD5TPVesWEnMBUL4YgkQDzIwmBgYmV7K40'+
      '&q='+region+'" allowfullscreen>'+
  '</iframe>';
  $(".map").append(map);

  var location = "Location : "+region;
  $(".map-head").append(location);
}

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}