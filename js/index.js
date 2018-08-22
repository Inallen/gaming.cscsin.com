$(function () {
    const BASE_API_URL = "http://1zplay.com/api/";
    const LIVE_SCHEDULE = BASE_API_URL + "live_schedules"
    var timeStamp = new Date().getTime();
    var category = "all";
    var data = {
        "_" : timeStamp,
        "category" : category
    };
    function renderView(data) {
        $.each(data, function(key, value){
            console.log(key);
            console.log(value);
            $('.weui-cells').append(getItem(value));
        });
    };

    function getItem(match) {
        var itemBody = '';
        itemBody += '<div class="weui-cell">';
        itemBody += '<div class="weui-cell__hd" style="position: relative;margin-right: 10px;">';
        itemBody += '<img src="' + match['left_team']['logo'] + '" style="width: 50px;display: block"/>'
        itemBody += '</div>';
        itemBody += '<div class="weui-cell__bd">';
        itemBody += '<p style="float:left">' + match['left_team']['name'] + '</p>';
        itemBody += '<p style="float:right">' + match['right_team']['name'] + '</p>';
        itemBody += '</div>';
        itemBody += '<div class="weui-cell__ft">';
        itemBody += '<img src="' + match['right_team']['logo'] + '" style="width: 50px;display: block"/>';
        itemBody += '</div>';
        itemBody += '</div>';
        return itemBody;
    }
    try {
        $.get(LIVE_SCHEDULE, data, function(response){
            console.log(response);
            renderView(response);
        });
    }
    catch(err) {
        console.log(err);
    }
});