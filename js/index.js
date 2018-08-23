$(function () {
    const BASE_API_URL = "http://1zplay.com/api/";
    const LIVE_SCHEDULE = BASE_API_URL + "live_schedules"
    var timeStamp = new Date().getTime();
    var category = "dota2";
    var data = {
        "_" : timeStamp,
        "category" : category
    };
    function renderListView(data) {
        $.each(data, function(key, value){
            $('.weui-cells').append(getItem(value));
        });
    };

    function getItem(item) {
        var itemBody = '';
        itemBody += '<div class="weui-cell">';
        itemBody += '<div class="weui-cell__hd" style="position: relative;margin-right: 10px;">';
        itemBody += '<img src="' + item['left_team']['logo'] + '" style="width: 50px;display: block"/>'
        itemBody += '</div>';
        itemBody += '<div class="weui-cell__bd">';
        itemBody += '<p style="float:left">' + item['left_team']['name'] + '</p>';
        itemBody += '<p style="float:left">' + item['live_match']['left_data']['score'] + '</p>';
        itemBody += '<p style="float:right">' + item['right_team']['name'] + '</p>';
        itemBody += '<p style="float:right">' + item['live_match']['right_data']['score'] + '</p>';
        itemBody += '</div>';
        itemBody += '<div class="weui-cell__ft">';
        itemBody += '<img src="' + item['right_team']['logo'] + '" style="width: 50px;display: block"/>';
        itemBody += '</div>';
        itemBody += '</div>';
        return itemBody;
    }
    try {
        $.get(LIVE_SCHEDULE, data, function(response){
            console.log(response);
            renderListView(response);
        });
    }
    catch(err) {
        console.log(err);
    }
});