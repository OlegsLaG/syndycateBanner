function handleInputChange(e) {
    const min = e.min;
    const max = e.max;
    const val = e.value;

    e.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

function showSumVal(sumVal){
    document.getElementById("fiat-result").value=sumVal;
}

function showSumRange(sumRangeVal){
    document.getElementById("sum").value = sumRangeVal;

    if(sumRangeVal < 750) {
        alert('Līzinga summa nevar būt zemāka par 750 €.');
        showSumVal(750);
    }
    else if(sumRangeVal > 7500) {
        alert('Līzinga summa nevar būt lielāka par 7500 €.');
        showSumVal(7500);
    }
}

function showTermVal(termVal){
    document.getElementById("month-result").value=termVal;
}

function showTermRange(termRangeVal){
    document.getElementById("term").value=termRangeVal;

    if(termRangeVal < 3) {
        alert('Līzinga termiņš nevar būt mazāks par 3 mēnešiem.');
        showTermVal(3);
    }
    else if(termRangeVal > 72) {
        alert('Līzinga termiņš nevar būt ilgāks par 72 mēnešiem.');
        showTermVal(72);
    }
}

function getInterests(sum, months) {
    sum = document.getElementById("fiat-result").value;
    months = document.getElementById("month-result").value;

    let monthlyInterests = ((12/9)/100)*sum;
    let submissionInterests = monthlyInterests * months;
    let total = submissionInterests+ parseFloat(sum);

    document.getElementById("loan").innerHTML = "Kredīta summa " + parseInt(total)+"€";

    let monthlyAmount = total.toFixed(2)/months;

    document.getElementById("mothly-amount").innerHTML = parseInt(monthlyAmount)+"€";

}

let clicks = 0;

function saveData(clicked_id) {

    clicks++;

    let data = new FormData();
    data.append(clicked_id, clicks.toString());

    fetch("http://localhost/testBanner/getInfo.php", {
        method:"post",
        body: data
    }).then(function (response){
        return response.text()
    }).then(function (text) {
        console.log(text);
    }).catch(function (error) {
        console.log(error)
    });
    clicks = 0;
    return false;

}