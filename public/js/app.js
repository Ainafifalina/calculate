$(document).ready(function(){
    /**Declaration du champs de l'operation */    
    const input = $('.form-calculator-js input');

    /**Permettre de faire le disable du champs de l'operation */
    const disabled_input =  function(){
        //document.oncontextmenu = new Function("return false");
        input.attr('disabled',true);
        input.focus(function(){
                input.attr('disabled',true);
        }); 
    }
    disabled_input();

    /**Permettre de faire le calcul dans la calculatrice */
    const calculator = function(){
        /**
         * Permettre de declarer les buttons nombres, opérateur,le resultat et le stockage de calcul
         */
        const buttonStr = '.calculator-body-js .number-item-js button';
        const operator = '.calculator-body-js .operator-item-js button.operator-js';
        const result = '.calculator-body-js .operator-item-js button.result-js';
        let calcul = {
            firstNumber : 0,
            secondNumber: 0,
            operator: ''
        };

        /**Permettre d'afficher sur le champs le nombre cliqué 
         * S'il existe déjà une virgule , on obtiendra plus une virgule
         * Si on clique en premier le virgule, on obtiendra une 0.
         * Si on est déjà choisi une opérateur, on attribue la valeur sur le champ comme le second nombre sur l'opération
         * 
        */
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

        /**
         * On déclare l'opérateur et recuperer la valeur sur le champs
         * si on clique sur une opérateur la premiere fois et on ne donne pas la premiere chiffre, on attribue 0 la première chiffre
         * Si l'opérateur est % , on donne immédiatement le résultat sur le champs
         * Si l'opérateur est - et on n'a pas encore saisir une chiffre, le chiffre est négatif
         */
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

        /**
         * Permettre de faire le calcul entre le premier chiffre et le second chiffre
         */
        function result_calcul(e)
        {
            e.preventDefault();
            const firstNumber = parseFloat(calcul.firstNumber == '-' ? -1 : calcul.firstNumber);
            const secondNumber = parseFloat(calcul.secondNumber == '-' ? -1 : calcul.secondNumber);
            const operator = calcul.operator;

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

        /**Permettre de faire le cancel sur le champs */
        function cancel(){
            input.val('');
            reset_calcul();
        }
        
        /**Permettre de supprimer le chiffre sur le champs un par un */
        function delete_number(){
            let input_value = input.val();
            let input_length = input_value.length;
            if(input_length > 0)
            {
                input.val(input_value.slice(0,(input_length - 1)));
            } 
        }

        /** Permettre de faire le reset sur le calcul */
        function reset_calcul(){
            calcul.firstNumber = 0;
            calcul.secondNumber = 0;
            calcul.operator = '';
        }

        $(document).on('click', buttonStr, number_in_field);
        $(document).on('click', operator, select_operator);
        $(document).on('click', result, result_calcul);
        $(document).on('submit','.form-calculator-js',result_calcul);
        $(document).on('click','.delete-number-js',delete_number);
        $(document).on('click','.cancel-calculate-js',cancel);
    }
    calculator();
});