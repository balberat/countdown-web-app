$(document).ready(function () {
    var dateKey = "saved-date";


    function init() {
        var date = getDateHistory();
        if (date === null) {
            $("#date-picker").addClass("d-flex").show()
            $("#countdown").hide()
        } else {
            calculateTime(date);
            setInterval(calculateTime, 1000, date);
            $("#date-picker").removeClass("d-flex").hide()
            $("#countdown").show()
        }
    }
    init();

    function getDateHistory() {
        if (localStorage.getItem(dateKey) === null) {
            return null;
        } else {
            return new Date(JSON.parse(localStorage.getItem(dateKey)));
        }
    }
    function setDateHistory(date) {
        localStorage.setItem(dateKey, JSON.stringify(date));
    }

    $("#startButton").click(function () {
        var endDate = new Date($("#date").val());
        //Todo: geçerliyse
        setDateHistory(endDate);
        calculateTime(endDate);
        $("#date-picker").removeClass("d-flex").hide()
        $("#countdown").show();
        setInterval(calculateTime, 1000, endDate);

    })
    $("#stopButton").click(function () {
        localStorage.clear()
        location.reload();
    })
    function calculateTime(endDate) {
        var today = new Date();
        var remainingTime = {
            "year": endDate.getFullYear() - today.getFullYear(),
            "month": endDate.getMonth() - today.getMonth(),
            "date": endDate.getDate() - today.getDate() - 1,
            "hour": 24 - today.getHours(),
            "minute": 60 - today.getMinutes(),
            "second": 60 - today.getSeconds()
        }
        displayCount(remainingTime)
    }
    function displayCount(remainingTime) {
        $("#year #number").text(remainingTime.year.toString().padStart(2, '0'))
        $("#month #number").text(remainingTime.month.toString().padStart(2, '0'))
        $("#day #number").text(remainingTime.date.toString().padStart(2, '0'))
        $("#hour #number").text(remainingTime.hour.toString().padStart(2, '0'))
        $("#minute #number").text(remainingTime.minute.toString().padStart(2, '0'))
        $("#second #number").text(remainingTime.second.toString().padStart(2, '0'))
        addOverClass(remainingTime)
    }
    function addOverClass(time) {
        if (time.year === 0) {
            $("#year").children().addClass("time-over");
        }
        if (time.month === 0 && time.year === 0) {
            $("#month").children().addClass("time-over");
        }
        if (time.date === 0 && time.month === 0 && time.year === 0) {
            $("#day").children().addClass("time-over");
        }
        if (time.hour === 0 && time.day === 0 && time.month === 0 && time.year === 0) {
            $("#hour").children().addClass("time-over");
        }
        if (time.minute === 0 && time.hour === 0 && time.day === 0 && time.month === 0 && time.year === 0) {
            $("#minute").children().addClass("time-over");
        }
        if (time.second === 0 && time.minute === 0 && time.hour === 0 && time.day === 0 && time.month === 0 && time.year === 0) {
            // "saniye bittiyse"
        }

    }

    //TODO: saat default aynı gün olur olmaz.
    // animasyon
});