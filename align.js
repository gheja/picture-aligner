"use strict";

function checkValue(id)
{
	const re = /^[0-9]+$/;
	
	if (document.getElementById(id).value === undefined || !document.getElementById(id).value.match(re))
	{
		return false;
	}
	
	return true;
}

function getValue(id)
{
	return parseInt(document.getElementById(id).value);
}

function toDegrees(x)
{
	return x * (180 / Math.PI);
}

function getAngle(p1x, p1y, p2x, p2y)
{
	let result;
	
	if (p1y != p2y)
	{
		result = Math.atan2((p2y - p1y), (p2x - p1x));
	}
	else
	{
		result = 0;
	}
	
	return toDegrees(result);
}

function plusMinus(x, stringMinus, stringPlus)
{
	if (x < 0)
	{
		return (x * -1) + stringMinus;
	}
	
	return x + stringPlus;
}

function round1(x)
{
	return Math.round(x);
}

function round2(x)
{
	return Math.round(x * 100) / 100;
}

function match(p1p1x, p1p1y, p1p2x, p1p2y, p2p1x, p2p1y, p2p2x, p2p2y)
{
	let d1, d2, scale, a1, a2, rotate, mx ,my, result;
	
	result = "";
	
	if ((p1p1x == p2p1x) && (p1p1y == p2p1y) && (p1p2x == p2p2x) && (p1p2y == p2p2y))
	{
		result = "You're already done.<br/>";
	}
	else if (((p1p1x == p1p2x) && (p1p1y == p1p2y)) || ((p2p1x == p2p2x) && (p2p1y == p2p2y)))
	{
		result = "The points must be at different locations.<br/>";
	}
	else
	{
		d1 = Math.sqrt(Math.pow(p1p1x - p1p2x, 2) + Math.pow(p1p1y - p1p2y, 2));
		d2 = Math.sqrt(Math.pow(p2p1x - p2p2x, 2) + Math.pow(p2p1y - p2p2y, 2));
		
		scale = d2 / d1;
		
		if (scale <= 0.99 || scale >= 1.01)
		{
			result += "Scale the first picture by <b>" + round2(scale * 100) + "%</b>.<br/>";
		}
		
		
		a1 = -getAngle(p1p1x, p1p1y, p1p2x, p1p2y);
		a2 = -getAngle(p2p1x, p2p1y, p2p2x, p2p2y);
		
		rotate = a1 - a2;
		
		if (rotate > 180)
		{
			rotate -= 360;
		}
		else if (rotate < -180)
		{
			rotate += 360;
		}
		
		if (Math.abs(rotate) >= 0.01)
		{
			result += "Rotate the first picture by <b>" + plusMinus(round2(rotate), "&deg; left", "&deg; right") + "</b>.<br/>";
		}
		
		
		mx = round1(p2p1x - (p1p1x * scale));
		my = round1(p2p1y - (p1p1y * scale));
		
		result += "Copy the first picture onto the second";
		
		if (mx == 0 && my == 0)
		{
			result += ".";
		}
		else if (mx != 0 && my != 0)
		{
			result += ", then move it by <b>" + plusMinus(mx, " pixels left", " pixels right") + "</b> and <b>" + plusMinus(my, " pixels up", " pixels down") + "</b>.";
		}
		else if (my == 0)
		{
			result += ", then move it by <b>" + plusMinus(mx, " pixels left", " pixels right") + "</b>.";
		}
		else // if (mx == 0)
		{
			result += ", then move it by <b/>" + plusMinus(my, " pixels up", " pixels down") + "</b>.";
		}
		
		result += "<br/>";
	}
	
	return result;
}

function run()
{
	let result;
	
	if (!checkValue("p1p1x") || !checkValue("p1p1y") || !checkValue("p1p2x") || !checkValue("p1p2y") || !checkValue("p2p1x") || !checkValue("p2p1y") || !checkValue("p2p2x") || !checkValue("p2p2y"))
	{
		result = "Please check your inputs. All values must be integers.";
	}
	else
	{
		result = match(getValue("p1p1x"), getValue("p1p1y"), getValue("p1p2x"), getValue("p1p2y"), getValue("p2p1x"), getValue("p2p1y"), getValue("p2p2x"), getValue("p2p2y"));
	}
	
	document.getElementById("result").innerHTML = result;
}

function swapPictures()
{
	function swap(a, b)
	{
		let x;
		
		x = document.getElementById(a).value;
		document.getElementById(a).value = document.getElementById(b).value;
		document.getElementById(b).value = x;
	}
	
	swap("p1p1x", "p2p1x");
	swap("p1p1y", "p2p1y");
	swap("p1p2x", "p2p2x");
	swap("p1p2y", "p2p2y");
}
