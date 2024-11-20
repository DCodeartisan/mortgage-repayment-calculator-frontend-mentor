document.getElementById('calculate').addEventListener('click', function () {
    const amount = parseFloat(document.getElementById('amount').value);
    const term = parseFloat(document.getElementById('term').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const type = document.querySelector('input[name="type"]:checked').value;
  
    if (isNaN(amount) || isNaN(term) || isNaN(rate)) {
      alert('Please fill in all fields with valid numbers.');
      return;
    }
  
    const monthlyRate = rate / 100 / 12;
    const totalMonths = term * 12;
  
    let monthlyPayment;
    let totalPayment;
  
    if (type === 'repayment') {
      const numerator = monthlyRate * Math.pow(1 + monthlyRate, totalMonths);
      const denominator = Math.pow(1 + monthlyRate, totalMonths) - 1;
      monthlyPayment = amount * (numerator / denominator);
    } else {
      monthlyPayment = amount * monthlyRate;
    }
  
    totalPayment = monthlyPayment * totalMonths;
  
    // Update Results
    document.getElementById('monthly-payment').textContent = `£${monthlyPayment.toFixed(2)}`;
    document.getElementById('total-payment').textContent = `£${totalPayment.toFixed(2)}`;
  
    document.getElementById('results-title').textContent = '';
    document.getElementById('results-description').style.display = 'none';
    document.getElementById('calculated-results').style.display = 'block';
  
    // Hide illustration when results are displayed
    document.querySelector('.illustration').style.display = 'none';
  });
  
  document.getElementById('clearAll').addEventListener('click', function () {
    document.getElementById('amount').value = '';
    document.getElementById('term').value = '';
    document.getElementById('rate').value = '';
    document.querySelector('input[name="type"][value="repayment"]').checked = true;
  
    document.getElementById('results-title').textContent = 'Results shown here';
    document.getElementById('results-description').style.display = 'block';
    document.getElementById('calculated-results').style.display = 'none';
  
    // Show illustration when results are cleared
    document.querySelector('.illustration').style.display = 'block';
  });