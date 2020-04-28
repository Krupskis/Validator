var acceptedCreditCards =
{
  visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  mastercard: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
  amex: /^3[47][0-9]{13}$/,
  discover: /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
  diners_club: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  jcb: /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/
};


function luhn()
{
    let number = document.querySelector('#number').value;
    let value = number.replace(/\D/g, '');
    let accepted = false;
    let type = "";

    Object.keys(acceptedCreditCards).forEach(function(key) {
        var regex = acceptedCreditCards[key];
        if (regex.test(value)) {
            accepted = true;
            type = key;
        }
    }
    );

    if(accepted === true)
    {
        if(checkSum(value))
        {
            document.getElementById("alert").className="";
            document.getElementById("alert").classList.add("alert-success", "alert");
            document.getElementById("alert-text").innerHTML = "Valid: your credit card is " + type.toUpperCase();
        }
        else
        {
            document.getElementById("alert").className="";
            document.getElementById("alert").classList.add("alert-danger", "alert");
            document.getElementById("alert-text").innerHTML = "Invalid: this credit card does not exist";
        }
    }
    else
    {
        document.getElementById("alert").className="";
        document.getElementById("alert").classList.add("alert-warning", "alert");
        document.getElementById("alert-text").innerHTML = "Wrong input: please try again";
    }



}

function checkSum(number)
{
    let sum = 0;
    let string = number.split("");

    for(let i = 0; i < string.length; i++)
    {
        digit = parseInt(string[string.length-i-1]);
        if(i % 2 != 0)
        {
            digit = digit * 2;
            if(digit > 9)
            {
                digit = digit - 9;
            }
        }
        sum = sum + digit;
    }

    return (sum) % 10 === 0;
}