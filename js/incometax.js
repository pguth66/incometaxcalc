function estateTaxOwed() {

	var limit = 5450000; // 2016 limit
	var x , text ;
	var tax = 0, adjustedEstateValue = 0 ;
	var effectiveRate = 0 ;

	accounting.settings.currency.precision=0 ; // no display of cents
	
	var estimatedAGI = document.getElementById("networth").value; // pull in user input
	
	// clear this in case someone entered a number below the threshold and now enters one over
	document.getElementById("demo").innerHTML="";
	// hide the note in case we're redrawing the table
	document.getElementById("footer").style.display = "none";
	
	try {
		if(isNaN(estimatedAGI)) throw "Please enter a number.";
		if(estimatedAGI < 0) throw "Can't have negative estate value.";
		if(estimatedAGI > 10000000000) throw "You can't have that much money!";

		if (adjustedEstateValue  < 0 ) {
			remainingEstate = estateValue ;
			adjustedEstateValue = 0 ;
			drawTable(estateValue, tax, effectiveRate, adjustedEstateValue, remainingEstate);
			document.getElementById("demo").innerHTML = "You will owe <strong>no</strong> estate tax. Your estate could grow by " + accounting.formatMoney(( limit - estateValue )) + " before being subject to any tax.";
			// make the note appear if no tax is owed
			document.getElementById("footer").style.display = "block";
		} else {
			tax = adjustedEstateValue * 0.4 ; // rate is 40%
			effectiveRate = (tax / estateValue)  * 100;
			remainingEstate = estateValue - tax ;
			drawTable(estateValue, tax, effectiveRate, adjustedEstateValue, remainingEstate);
		}
	}
	catch(err) {
		console.log(err);
		text = err ;
	}
}
