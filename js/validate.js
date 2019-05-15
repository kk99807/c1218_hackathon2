function validateDetailsForm() {
    const DATE_PATTERN = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
    const TIME_PATTERN = /^(2[0-3]|[01][0-9]):[0-5][0-9] [AP]M$/;

    // Get DOM elements
    let inputs = {
        startDate: $('#startDate')[0],
        endDate: $('#endDate')[0],
        startTime: $('#pickStartTime')[0],
        endTime: $('#pickEndTime')[0]
    };

    // Initialize all inputs to valid
    Object.values(inputs).forEach(input => {
        input.setCustomValidity("");
    });

    // Parse dates
    let startDate = Date.parse(inputs.startDate.value);
    let endDate = Date.parse(inputs.endDate.value);
    let now = new Date();
    let todayText = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate(); 
    let today =  new Date(todayText).getTime(); 

    // Enforce DATE & TIME formats for use with Materialize Pickers

    // Check Start Date
    if (inputs.startDate.value) {
        if (!DATE_PATTERN.test(inputs.startDate.value) || isNaN(startDate)) {
            inputs.startDate.setCustomValidity("Valid date in MM/DD/YYYY format required");
        } else if (startDate < today) {
            inputs.startDate.setCustomValidity("Cannot create a party in the past");
        }
    } 

    // Check End Date
    if (inputs.endDate.value) {
        if (!DATE_PATTERN.test(inputs.endDate.value) || isNaN(endDate)) {
            inputs.endDate.setCustomValidity("Valid date in MM/DD/YYYY format required");
        } else if (endDate < today) {
            inputs.endDate.setCustomValidity("Cannot create a party in the past");
        }
    }

    // Combined checks
    if (startDate && endDate) {
        if (inputs.startDate.checkValidity() && inputs.endDate.checkValidity() && endDate < startDate) {
            inputs.endDate.setCustomValidity("End date must be or or after start date");
        }

        if (inputs.startTime.value && inputs.endTime.value) {
            let startTime = Date.parse(inputs.startDate.value + ' ' + inputs.startTime.value);
            let endTime = Date.parse(inputs.endDate.value + ' ' + inputs.endTime.value);

            if (!TIME_PATTERN.test(inputs.startTime.value) || isNaN(startTime)) {
                inputs.startTime.setCustomValidity("Valid time in HH:MM PM format required");
            }

            if (!TIME_PATTERN.test(inputs.endTime.value) || isNaN(endTime)) {
                inputs.endTime.setCustomValidity("Valid time in HH:MM PM format required");
            }

            if (startTime && endTime && endTime <= startTime) {
                inputs.endTime.setCustomValidity("End time must be after start time");
            }
        }
    } 
}