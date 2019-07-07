function EventCallTab(tabs) {
//get the first tab object in the array
let tab = tabs.pop();
//get all cookies in the domain
var gettingAllCookies = browser.cookies.getAll({url: tab.url});
gettingAllCookies.then((cookies) => {
//set the header of the panel
var activeTabUrl = document.getElementById('header-title');
//
var time = 0;
//Api Point
let cmcInfoUrl = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BURST&tsyms=BTC,USD,EUR&api_key=YOUR API KEY";
let cmcInfo = JSON.parse(GetPrice(cmcInfoUrl));
let burstPriceUSD = cmcInfo.BURST.USD;
let burstPriceBTC = cmcInfo.BURST.BTC;
let burstPriceEUR = cmcInfo.BURST.EUR;
// Optional: Coloring String
var amountBTC = burstPriceBTC.toFixed(8);
var amountUSD = burstPriceUSD.toFixed(8);
var amountEUR = burstPriceEUR.toFixed(8);
//Api Point
let cmcInfoUrl2 = "https://min-api.cryptocompare.com/data/generateAvg?fsym=BURST&tsym=BTC&e=LiveCoin";
let cmcInfo2 = JSON.parse(GetPrice(cmcInfoUrl2));
let burst24hLow = (cmcInfo2.RAW.LOW24HOUR).toFixed(8);
let burst24hHigh = (cmcInfo2.RAW.HIGH24HOUR).toFixed(8);
let burst24hChange = (cmcInfo2.RAW.CHANGEPCT24HOUR).toFixed(2);
var letTradeVolume = (cmcInfo2.RAW.TOPTIERVOLUME24HOUR).toFixed(2);
var volumebtc = (cmcInfo2.DISPLAY.VOLUME24HOURTO);
var update = (cmcInfo2.DISPLAY.LASTUPDATE);
//Api Point
let cmcInfoUrl3 = "https://phoenix.burst-alliance.org:8125/burst?requestType=getBlock";
//get response
let cmcInfo4 = JSON.parse(GetPrice(cmcInfoUrl3));
//calculate network diff
var diff = (18325193796 / cmcInfo4.baseTarget).toFixed(2);
//block height
var height = cmcInfo4.height;
//block reward
var reward = cmcInfo4.blockReward;
//convert timestamp
var time = Date.UTC(2014, 7, 11, 2, 0, 0, 0) + cmcInfo4.timestamp * 1000;
time = new Date(time).toGMTString();
//placeholder for image
var img = document.createElement("img");
//Add Table Values
var td01 = document.getElementById('btc').innerHTML = `${amountBTC}`;
var td02 = document.getElementById('usd').innerHTML = `${amountUSD}`;
var td03 = document.getElementById('eur').innerHTML = `${amountEUR}`;
var td04 = document.getElementById('24h').innerHTML = `${burst24hLow}`;
var td05 = document.getElementById('24hh').innerHTML = `${burst24hHigh}`;
if(burst24hChange < 0) {
document.getElementById("change").style.background = '#c1494f';
var td06 = document.getElementById('change').innerHTML = `${burst24hChange}`;
} else {
document.getElementById("change").style.background = '#51c149';
var td06 = document.getElementById('change').innerHTML = `+ ${burst24hChange}`;
}
var td07 = document.getElementById('update').innerHTML = "Last Update: " + update;
//
var td09 = document.getElementById('height').innerHTML = "#" + height;
var td10 = document.getElementById('reward').innerHTML = reward + " Burst";
var td11 = document.getElementById('diff').innerHTML = diff + " Tb";
var td12 = document.getElementById('time').innerHTML = time;
//extra values :: not needed now
//var td08 = document.getElementById('volumebtc').innerHTML = volumebtc;
//document.getElementById("price").value = amountBTC;
});
}
//get active tab to run an callback function.
//it sends to our callback an array of tab objects
function getActiveTab() {
return browser.tabs.query({currentWindow: true, active: true});
}
function GetPrice(cmcUrl){
var Httpreq = new XMLHttpRequest();
Httpreq.open("GET", cmcUrl, false);
Httpreq.send(null);
return Httpreq.responseText;
}
document.addEventListener("change", function(){
var isSwapped;
if(document.getElementById('swapped').checked) {
isSwapped = true;
document.getElementById('thBtc').innerHTML = "BURST";
document.getElementById('thBurst').innerHTML = "BTC";
} else {
document.getElementById('thBtc').innerHTML = "BTC";
document.getElementById('thBurst').innerHTML = "BURST";
isSwapped = false;
}
let cmcInfoUrl = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BURST&tsyms=BTC,USD,EUR&api_key=YOUR API KEY";
let cmcInfo = JSON.parse(GetPrice(cmcInfoUrl));
let burstPriceBTC = cmcInfo.BURST.BTC;
//Right
if(!isSwapped) {
var btc = document.getElementById('price').value;
var burst = document.getElementById('lots').value = btc / burstPriceBTC ;
//Left
} else {
var btc = document.getElementById('price').value;
var burst = document.getElementById('lots').value = (btc * burstPriceBTC).toFixed(8);
}
});
getActiveTab().then(EventCallTab);
