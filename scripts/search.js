$(function(){
  var url = new URL(window.location.href);
  var searchedUrl = url.searchParams.get("search");
  showLoader();
  ajax("get","/url/"+searchedUrl,null,function(r){
    // if(r.Status===2000){
        hideLoader();
        renderSearchHead(r.Url);
        renderDoughnutChart(r.SafePercent);
    // }
  },function(err){
    console.log(err);
  });
  // setTimeout(function(){
  //   hideLoader();
  //   renderSearchHead(searchedUrl);
  //   renderDoughnutChart(20);
  // },2000);
})

function renderSearchHead(url){
  var html = '<div class="search-result-head">Search Result For : <span id="searched-for">' + url + '</span></div>';
  $(".search-head").append(html);
}

function showLoader(){
   $(".loader").css("display","inline-block");
}

function hideLoader(){
  $(".loader").css("display", "none");
}

function ajax(type, urlApi, data, func, efunc, dataType, contentType, aSync, processData) {
  var API = "localhost:3001"
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
      url: API + urlApi,
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
