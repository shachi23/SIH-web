$(function(){
    ajax("get","home/",null,function(r){
        trending(r);
    },function(err){});
})

$(".nav-link").click(function () {
   var id = this.id;
   console.log(id);
    scroll(id.substring(2));
});


function scroll(scrollPos){
    $('html, body').animate({
        scrollTop: $("."+scrollPos).offset().top
    }, 1000);
}

function redirectSearch() {
    var url = $("#search-input").val();
    location = 'search.html?search=' + url;
    return false;
}

function trending(trendingData){
    var safeData = [];
    var suspiciousData = [];
    var urls = [];
    trendingData.forEach(function(item){
      safeData.push(item.SafePercent);
      suspiciousData.push(100-item.SafePercent);
      urls.push(item.Url);
    })
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: urls,
            datasets: [
                {
                    label: "Safe",
                    data: safeData,
                    backgroundColor: "#2ecc71",
                    borderWidth: 1
                },
                {
                    label: "Suspicious",
                    data: suspiciousData,
                    backgroundColor: "#3498db",
                    borderWidth: 1
                }]
        },
        options: {
            responsive: false,
            scales: {
                xAxes: [{
                    ticks: {
                        maxRotation: 90,
                        minRotation: 80
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}