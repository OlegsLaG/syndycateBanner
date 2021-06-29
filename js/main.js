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

function saveData(clickData) {

    var data = new URLSearchParams();
    data.append("clicks-made",clickData);
    fetch("url", {
        method: 'post',
        body: data
    })
        .then(function (response) {
            if(response.ok) {
                console.log('No errors found. Sending data');
            }
        })
        .then(function (text) {
            console.log(text);
        })
        .catch(function (error) {
            console.log(error)
        });
    return false;

}

var sum = document.getElementById('sum');
var fiatResult = document.getElementById('fiat-result');
var term = document.getElementById('term');
var monthResult = document.getElementById('month-result');

var sumClicks =0;
var fiatClicks =0;
var termClicks =0;
var monthClicks = 0;

var data = [{
    sumSlider: sumClicks,
    sumResult: fiatClicks,
    monthSlider: termClicks,
    monthResult: monthClicks
}];

sum.addEventListener('click', ()=> {
    sumClicks +=1;
    for(var i=0; i < data.length; i++){
        data[i].sumSlider = sumClicks;
    }
    saveData(data);
})
fiatResult.addEventListener('click', ()=> {
    fiatClicks +=1;
    for(var i=0; i < data.length; i++){
        data[i].sumResult = fiatClicks;
    }
    saveData(data);
})
term.addEventListener('click', ()=> {
    termClicks +=1;
    for(var i=0; i < data.length; i++){
        data[i].monthSlider = termClicks;
    }
    saveData(data);
})
monthResult.addEventListener('click', ()=> {
    monthClicks +=1;
    for(var i=0; i < data.length; i++){
        data[i].monthResult = monthClicks;
    }
    saveData(data);
})
