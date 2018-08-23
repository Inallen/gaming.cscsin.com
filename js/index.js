$(function () {
    const BASE_API_URL = "http://1zplay.com/api/";
    const LIVE_SCHEDULE = BASE_API_URL + "live_schedules"

    var itemManager = {
        _defaultItem: null,
        _defaultType: null,
        setItem: function(item) {
            this._defaultItem = item;
            this._init();
            return this;
        },
        _init: function() {
            console.log(this._defaultItem);
            if (this._defaultItem.hasOwnProperty("csgo_schedule")) {
                this._defaultType = "csgo";
            }
            else if (this._defaultItem.hasOwnProperty("csgo_schedule")) {
                this._defaultType = "dota2";
            }
            return this;
        },
        getItemScore: function(team) {
            if (this._defaultType == "csgo") {
                var team_name = team == "left_team" ? "team1" : "team2";
                if (this._defaultItem.hasOwnProperty("live_match")) {
                    return this._defaultItem['live_match'][team_name + "_score"];
                }
                else {
                    return 0;
                }
            }
            else if(this._defaultType == "dota2") {
                return this._defaultItem['live_match']['left_data']['score']
            }
        },
        getItemName: function() {

        }
    };
    var timeStamp = new Date().getTime();
    var category = "csgo";
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
        itemBody += '<p style="float:left">' + itemManager.setItem(item).getItemScore("left_team") + '</p>';
        itemBody += '<p style="float:right">' + item['right_team']['name'] + '</p>';
        itemBody += '<p style="float:right">' + itemManager.setItem(item).getItemScore("right_team") + '</p>';
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