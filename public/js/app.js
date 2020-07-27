$(document).ready(function(){
    
    const input = $('.form-calculator-js input');

    const disabled_input =  function(){
        //document.oncontextmenu = new Function("return false");
        input.attr('disabled',true);
        input.focus(function(){
                input.attr('disabled',true);
        }); 
    }
    disabled_input();

    const add_number = function(){
        const buttonStr = '.calculator-body-js .number-item-js button';
        const operator = '.calculator-body-js .operator-item-js button.operator-js';
        const result = '.calculator-body-js .operator-item-js button.result-js';
        let calcul = {
            firstNumber : 0,
            secondNumber: 0,
            operator: ''
        };

        function number_in_field(){
            let number = $(this).text();
            let input_value = input.val();

            if(input_value.indexOf('.') != -1 && number == '.')
            {
                input_value = input.val();
            } else {
                if(input_value.indexOf('.') == -1 && input_value.length == 0 && number == '.')
                {
                    number = '0.';
                }
                input_value += number;
            }

            input.val(input_value);

            if( calcul.operator != '')
            {
                calcul.secondNumber = input_value;
            }
        }
        function select_operator(){
            const operator = $(this).text();
            let input_value = input.val();

            if(input_value == "")
            {
                input_value = 0;
            }
            if(operator == '%')
            {
                input_value = input_value / 100;
                input.val(input_value);
                if(calcul.operator != '')
                {
                    calcul.secondNumber = input_value;
                }
            } else {
                if(operator == '-' && input_value == 0)
                {
                    input_value = '-';
                    input.val(input_value);
                } else {
                    calcul.firstNumber = input_value;
                    calcul.operator = operator;
                    input.val('');
                }
            }
        }
        function result_calcul()
        {
            const firstNumber = parseFloat(calcul.firstNumber == '-' ? -1 : calcul.firstNumber);
            const secondNumber = parseFloat(calcul.secondNumber == '-' ? -1 : calcul.secondNumber);
            const operator = calcul.operator;

            calcul.firstNumber = 0;
            calcul.secondNumber = 0;
            calcul.operator = '';

            switch(operator){
                case '+':
                    input.val( (firstNumber*10+secondNumber*10) / 10 );
                    break;
                case '-':
                    input.val( (firstNumber*10-secondNumber*10) / 10 );
                    break;
                case '*':
                    input.val(firstNumber*secondNumber);
                    break;
                case '/':
                    if(secondNumber == 0)
                    {
                        alert("Calcul impossible");
                        input.val('');
                    } else {
                        input.val(firstNumber / secondNumber);
                    }
                    break;
            }
        }

        $(document).on('click', buttonStr, number_in_field);
        $(document).on('click', operator, select_operator);
        $(document).on('click', result, result_calcul);
    }
    add_number();
});