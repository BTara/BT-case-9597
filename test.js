this.hello = function()
{
	
}

var keywords = ["funny","bunny","car","name","user","window"];
var parameters = ["jack","joe","bugs","alcatraz","ford","friend"];

this.commit = function(request,response,port,numberOfParams)
{
	var parametersQuerry = '';
	
	for(var i = 0;i<numberOfParams;i++)
	{
		var parametersQuerry = parametersQuerry + ''+(keywords[getRandomRange(keywords.length)] + '=' + parameters[getRandomRange(parameters.length)] + '&');
	}
	
	if(getRandomRange(100) < 50)
	{
		parametersQuerry = parametersQuerry + 'count=' + getRandomRange(50);
	}else
	{
		parametersQuerry = parametersQuerry.slice(0,-1);
	}

	response.redirect('http://'+request.hostname+':'+port+'/track?'+parametersQuerry);
  	response.end();
}

function getRandomRange(max)
{
	return Math.floor(Math.random()*max);
}

/// testing urls
//127.0.0.1:3000/test?n=5
//127.0.0.1:3000/test