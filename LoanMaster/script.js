document.addEventListener("DOMContentLoaded", () => {
    //! Select elements
    const calculateBtn = document.getElementById("calculateBtn");
    const amountInput = document.getElementById("amount");
    const interestInput = document.getElementById("interest");
    const yearsInput = document.getElementById("years");
    //! SUMMARY
    const monthlyPayment = document.getElementById("monthly");
    const totalPayment = document.getElementById("total");
    const totalInterestPayment = document.getElementById("totalInterest");

    let loanChart;  

    function calculateLoan() {
        const principle = parseFloat(amountInput.value);
        const interest = parseFloat(interestInput.value) / 100 / 12;
        const payments = parseFloat(yearsInput.value) * 12;

        if (isNaN(principle) || isNaN(interest) || isNaN(payments)) {
            alert("Please enter valid inputs");
            return;
        }
 
        const x = Math.pow(1 + interest, payments);
        const Monthly = (principle * x * interest) / (x - 1);

        if (isFinite(Monthly)) {
            const total = Monthly * payments;
            const totalInterest = total - principle; 
            animateValue(monthlyPayment, 0, Monthly, 1000, "₹");
            animateValue(totalPayment, 0, total, 1000, "₹");
            animateValue(totalInterestPayment, 0, totalInterest, 1000, "₹");
            updateChart(principle, totalInterest);
        } else {
            alert("Please check your numbers");
        }
    }
 
    function animateValue(element, start, end, duration, prefix = "") {
        const startTime = performance.now();
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = start + (end - start) * progress;
            element.textContent = prefix + current.toFixed(2);
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }
 
    function updateChart(principal, interest) {
        const ctx = document.getElementById("loanChart").getContext("2d");
        if (loanChart) loanChart.destroy();  

        loanChart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Principal", "Interest"],
                datasets: [{
                    data: [principal, interest],
                    backgroundColor: ["#2c3e50", "#00c6ff"],
                    borderWidth: 1
                }]
            },
             options: {
            responsive: true,               
            maintainAspectRatio: true,    
            plugins: {
                legend: { position: 'bottom' }
            }
        }
        });
    }

    calculateBtn.addEventListener("click", calculateLoan);
});
