document.addEventListener('DOMContentLoaded', function(){
    console.log("java script");
    
    var show = $(".show");
    var input =$("input");
    var search = $("#search");
    var loc = 'http://apidev.accuweather.com/locations/v1/search?q='
    var key = '&apikey=hoArfRosT1215';
    var map = $("#map");
    var geo = navigator.geolocation;
    var json_key = '.json?language=pl&apikey=hoArfRosT1215';

    //search location
    function getLocation(location){
        location.forEach(function(info){
            let city_key = info.Key;
            let new_url = 'http://apidev.accuweather.com/currentconditions/v1/'+city_key+json_key;
            console.log(new_url);
            
            //get current condition
            function getWeather(){
                $.ajax({
                    url: new_url,
                    method: 'GET',
                    dataType: 'json'
                }).done(function(response){
                    response.forEach(function(info){
                        console.log(info.WeatherText);
                        console.log(info.Temperature.Metric.Value +"°"+ info.Temperature.Metric.Unit);
                        map.text(input.val() +": "+info.Temperature.Metric.Value +"°"+ info.Temperature.Metric.Unit +" " +info.WeatherText);
                    });
                }).fail(function(response){
                    console.log(response);
                });
            };
            getWeather();
        });
    };

    //get client's cuurent condition
    function clinetLocCurr(location){
            let curr_key = location.Key;
            let curr_city = location.LocalizedName;
            let curr_url = "http://apidev.accuweather.com/currentconditions/v1/"+curr_key+json_key;

            console.log(curr_url);
            //current weather
            function currWeather(){
                $.ajax({
                    url : curr_url,
                    method: 'GET',
                    dataType: 'json'
                }).done(function(response){
                    response.forEach(function(info){
                        console.log(info.WeatherText);
                        console.log(info.Temperature.Metric.Value +"°"+ info.Temperature.Metric.Unit);
                        map.text(curr_city+": "+info.Temperature.Metric.Value +"°"+ info.Temperature.Metric.Unit +" " +info.WeatherText);
                    });
                }).fail(function(response){
                    console.log(response);
                })
            };
            currWeather();

    };


        //get client's cuurent condition
        function clinetLocDaily(location){
            let curr_key = location.Key;
            let curr_city = location.LocalizedName;
            let curr_url = "http://apidev.accuweather.com/daily-weather-forecast/v1/"+curr_key+json_key;

            console.log(curr_url);

            //daily weather
            function currWeather(){
                $.ajax({
                    url : curr_url,
                    method: 'GET',
                    dataType: 'json'
                }).done(function(response){
                    console.log(response);
                }).fail(function(response){
                    console.log(response);
                })
            };
            currWeather();

    };


    //window 1
    search.on("click", function(e){
        let city = input.val();
        let url_w1 = loc+city+key;
        $.ajax({
            url: url_w1,
            method: 'GET',
            dataType: 'json'
        }).done(function(response){
            map.css("display","-webkit-box");
            getLocation(response);
            console.log(response);
        }).fail(function(error){
            console.log("nok");
        });
    });

    //window2
    let today = $("#today");
    today.on("click", function(e){

        if(geo) {
            geo.getCurrentPosition(function(location) {
                let lati = location.coords.latitude;
                let longi = location.coords.longitude;
                let url_w2 = "http://apidev.accuweather.com/locations/v1/cities/geoposition/search.json?q="+lati+","+longi+key;
                    
                $.ajax({
                    url: url_w2,
                    method: 'GET',
                    dataType: 'json'
                }).done(function(response){
                    console.log("ok");
                    map.css("display","-webkit-box");
                    clinetLocCurr(response);
                }).fail(function(error){
                    console.log("nok");
                });
            })
        } else {
            console.log('niedostępny');
        };
    });

    //window3
    let periot = $("#periot");
    periot.on("click", function(e){
        
        if(geo) {
            geo.getCurrentPosition(function(location) {
                let lati = location.coords.latitude;
                let longi = location.coords.longitude;
                let url_w3 = "http://apidev.accuweather.com/locations/v1/cities/geoposition/search.json?q="+lati+","+longi+key;
                    
                $.ajax({
                    url: url_w3,
                    method: 'GET',
                    dataType: 'json'
                }).done(function(response){
                    console.log(response.Key);
                    map.css("display","-webkit-box");
                    clinetLocDaily(response);
                }).fail(function(error){
                    console.log("nok");
                });
            })
        } else {
            console.log('niedostępny');
        };
    });
});