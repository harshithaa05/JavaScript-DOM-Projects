//!calc tip function 

function calculationTip(){
    const billAmount=parseFloat(document.getElementById("bill").value);
    const serviceQuality=parseFloat(document.getElementById("service").value);
    const NumberPeople=parseFloat(document.getElementById("people").value);

    if(isNaN(billAmount)||billAmount<1){
        alert("Please enter valid bill");
        return;
    }
    if(NumberPeople<1){
        alert("Please enter Atleast 1 number");
        return;
    }

    //calculate the values
    const tipAmount=billAmount*serviceQuality;
    const totalAmount=tipAmount+billAmount;
    const perPerson=totalAmount/NumberPeople;
    const tipPerPerson=tipAmount/NumberPeople;

    //display results with 2 decimal places
    document.getElementById("tipAmount").textContent=`$${tipAmount.toFixed(2)}`;
    document.getElementById("totalAmount").textContent=`$${totalAmount.toFixed(2)}`;
    document.getElementById("perPerson").textContent=`$${perPerson.toFixed(2)}`;
    document.getElementById("tipPerPerson").textContent=`$${tipPerPerson.toFixed(2)}`;
}

document.getElementById("calculateBtn").addEventListener("click",calculationTip);

document.querySelectorAll("input,select").forEach((element) => {
    element.addEventListener("input",calculationTip);
});
 
