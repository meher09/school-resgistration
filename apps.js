document.addEventListener("DOMContentLoaded", function () {
    const spouseCheckbox = document.getElementById("spouse_check");
    const childCheckbox = document.getElementById("child_checkbox");
    const numberOfChildrenInput = document.getElementById("numberOfChildren");
    const totalMemberInput = document.getElementById("total_member");
    const totalAmountInput = document.getElementById("total_amount");
    const paymentMethodSelect = document.getElementById("payment_method");
    const serviceChargeInput = document.getElementById("service_charge");
    const handCashToDiv = document.getElementById("hand_cash_to_div"); // Ensure the correct ID from your HTML
    const totalPayableInput = document.getElementById("total_payable"); // New field for total payable amount

    // Add event listeners to the checkboxes and input fields
    spouseCheckbox.addEventListener("change", calculateTotal);
    childCheckbox.addEventListener("change", toggleNumberOfChildrenInput);
    numberOfChildrenInput.addEventListener("input", calculateTotal);

    // Add event listener to the payment method select
    paymentMethodSelect.addEventListener("change", function () {
        calculateServiceCharge();
        calculateTotalPayable(); // Call the function to calculate total payable
        toggleHandCashToField();
    });

    function toggleNumberOfChildrenInput() {
        const numberOfChildrenDiv = document.getElementById("numberOfChildrenDiv");
        if (childCheckbox.checked) {
            numberOfChildrenDiv.style.display = "block";
        } else {
            numberOfChildrenDiv.style.display = "none";
            numberOfChildrenInput.value = "";
            calculateTotal();
        }
    }

    function calculateTotal() {
        calculateTotalMemberAndAmount();
        calculateServiceCharge();
        calculateTotalPayable();
    }

    function calculateTotalMemberAndAmount() {
        let totalMember = 1;
        if (spouseCheckbox.checked) {
            totalMember++;
        }
        if (childCheckbox.checked && numberOfChildrenInput.value > 0) {
            const numberOfChildren = parseInt(numberOfChildrenInput.value, 10);
            totalMember += numberOfChildren;
        }
        totalMemberInput.value = totalMember;

        const baseFee = 2000;
        const spouseFee = 2000;
        const childFee = 1000;
        let totalAmount = baseFee;
        if (spouseCheckbox.checked) {
            totalAmount += spouseFee;
        }
        if (childCheckbox.checked) {
            const numberOfChildren = parseInt(numberOfChildrenInput.value, 10);
            totalAmount += numberOfChildren * childFee;
        }
        totalAmountInput.value = totalAmount;
    }

    function calculateServiceCharge() {
        const selectedPaymentMethod = paymentMethodSelect.value;
        const totalAmount = parseFloat(totalAmountInput.value);
        let serviceCharge = 0;

        if (selectedPaymentMethod === "bkash") {
            serviceCharge = totalAmount * 0.02;
        } else if (selectedPaymentMethod === "nagad") {
            serviceCharge = totalAmount * 0.012;
        } else if (selectedPaymentMethod === "handcash") {
            serviceCharge = 0; // Assuming no service charge for hand cash
        }

        serviceChargeInput.value = serviceCharge.toFixed(2);
    }

    function calculateTotalPayable() {
        const totalAmount = parseFloat(totalAmountInput.value);
        const serviceCharge = parseFloat(serviceChargeInput.value);
        const totalPayable = totalAmount + serviceCharge;
        totalPayableInput.value = totalPayable.toFixed(2);
    }

    // Function to toggle the "Hand Cash To" field
    function toggleHandCashToField() {
        if (paymentMethodSelect.value === "handcash") {
            handCashToDiv.style.display = "block";
        } else {
            handCashToDiv.style.display = "none";
            // Clear the input value when hidden
            document.getElementById("hand_cash_to").value = "";
        }
    }

    // Initial calculation when the page loads
    calculateTotal();
});
