var addResult = function(res){
    res = JSON.parse(res)
    let record = res['data'];
    let code = res['code'];
    let tab = $('#result');
    tab.empty();
    if(code == -1) {
        tab.append(
            $('<li class="ui-border-t">').append(
                $('<div class="ui-list-info">').append(
                    $('<h4 class="ui-nowrap">').html("查询结果"),
                    $('<div class="ui-txt-info">').html("该学号没用签到记录")
                )
            ),
        )
        return;
    }

    tab.append(
        $('<li class="ui-border-t">').append(
            $('<div class="ui-list-info">').append(
                $('<h4 class="ui-nowrap">').html("学号"),
                $('<div class="ui-txt-info">').html(record.number)
            )
        ),
        $('<li class="ui-border-t">').append(
            $('<div class="ui-list-info">').append(
                $('<h4 class="ui-nowrap">').html("姓名"),
                $('<div class="ui-txt-info">').html(record.name)
            )
        ),
        $('<li class="ui-border-t">').append(
            $('<div class="ui-list-info">').append(
                $('<h4 class="ui-nowrap">').html("签到次数"),
                $('<div class="ui-txt-info">').html(record.count)
            )
        ),
        $('<li class="ui-border-t">').append(
            $('<div class="ui-list-info">').append(
                $('<h4 class="ui-nowrap">').html("签到时间")
            )
        ),
        $('<li>').append(
            $('<div class="ui-txt-info">').append(
                $('<ul id="record-time">')
            )
        )
    )
    let times = record.times
    times.forEach(time => {
        $('#record-time').append(
            $('<li>').html(time)
        )
    });
};

$(document).on("click", "#history", function () {
    data = {
        'number': $('#hnumber').val()
    }
    $.post("/history", data, addResult)
})