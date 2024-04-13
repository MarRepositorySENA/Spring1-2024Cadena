$(document).ready(function() {
    const amountInput = $('#amount');
    const priceInput = $('#payValue');
    const totalValueInput = $('#totalValue');

    // Evento input para la cantidad y precio
    amountInput.on('input', function() {
        const cantidad = parseInt($(this).val()); // Obtener la cantidad ingresada
        const precio = parseFloat(priceInput.val()); // Obtener el precio del input #payValue
        const totalValue = cantidad * precio; // Calcular el valor total
    
        // Actualizar el valor en la caja de texto #totalValue
        totalValueInput.val(totalValue.toFixed(2)); // Redondear a 2 decimales
    });

    priceInput.on('input', function() {
        const cantidad = parseInt(amountInput.val()); // Obtener la cantidad ingresada
        const precio = parseFloat($(this).val()); // Obtener el precio ingresado
        const totalValue = cantidad * precio; // Calcular el valor total
    
        // Actualizar el valor en la caja de texto #totalValue
        totalValueInput.val(totalValue.toFixed(2)); // Redondear a 2 decimales
    });
});
