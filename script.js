document.getElementById('calculate').addEventListener('click', function () {
    // Clear previous error messages
    clearErrorMessages();
  
    const amount = parseFloat(document.getElementById('amount').value);
    const term = parseFloat(document.getElementById('term').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const type = document.querySelector('input[name="type"]:checked');
  
    let hasError = false;
  
    // Validate inputs and show error messages if necessary
    if (isNaN(amount) || amount <= 0) {
      document.getElementById('amount-error').textContent = 'This field is required';
      document.getElementById('amount-error').style.display = 'block';
      document.getElementById('amount').closest('.input-wrapper').classList.add('error-border');
      document.querySelector('.input-color').classList.add('error'); // Add error class for amount
      hasError = true;
    }
  
    if (isNaN(term) || term <= 0) {
      document.getElementById('term-error').textContent = 'This field is required';
      document.getElementById('term-error').style.display = 'block';
      document.getElementById('term').closest('.input-wrapper').classList.add('error-border');
      document.querySelector('.input-colors').classList.add('error'); // Add error class for term
      hasError = true;
    }
  
    if (isNaN(rate) || rate <= 0) {
      document.getElementById('rate-error').textContent = 'This field is required';
      document.getElementById('rate-error').style.display = 'block';
      document.getElementById('rate').closest('.input-wrapper').classList.add('error-border');
      document.querySelector('.input-coloring').classList.add('error'); // Add error class for rate
      hasError = true;
    }
  
    // Check if a mortgage type is selected
    if (!type) {
      document.getElementById('type-error').textContent = 'This field is required';
      document.getElementById('type-error').style.display = 'block';
      hasError = true;
    }
  
    if (hasError) {
      return; // Stop the calculation if there are errors
    }
  
    // Calculation logic
    const monthlyRate = rate / 100 / 12;
    const totalMonths = term * 12;
  
    let monthlyPayment;
    let totalPayment;
  
    if (type.value === 'repayment') {
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
  
    // Clear error messages
    clearErrorMessages();
  
    // Remove red border from all input fields
    document.querySelectorAll('.input-wrapper').forEach(inputWrapper => {
      inputWrapper.classList.remove('error-border');
    });
  
    document.getElementById('results-title').textContent = 'Results shown here';
    document.getElementById('results-description').style.display = 'block';
    document.getElementById('calculated-results').style.display = 'none';
  
    // Show illustration when results are cleared
    document.querySelector('.illustration').style.display = 'block';
  });
  
  function clearErrorMessages() {
    document.getElementById('amount-error').style.display = 'none';
    document.getElementById('term-error').style.display = 'none';
    document.getElementById('rate-error').style.display = 'none';
    document.getElementById('type-error').style.display = 'none'; // Clear the type error message
  
    // Remove the error background color
    document.querySelector('.input-color').classList.remove('error');
    document.querySelector('.input-colors').classList.remove('error');
    document.querySelector('.input-coloring').classList.remove('error');
  }
  