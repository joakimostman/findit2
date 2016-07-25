var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {
        app.receivedEvent('deviceready');


    },
    // Note: This code is taken from the Cordova CLI template.
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {

    //NETWORKCHECK
    //navigator.splashscreen.show();
    
    
    var networkState = navigator.connection.type;
    navigator.geolocation.getCurrentPosition(onSuccess, onError);


    /*GLODABIZATION*/

    console.log(navigator.globalization);

    navigator.globalization.getPreferredLanguage(

    function (language) {


        if (language.value == 'sv-SE' && networkState !== Connection.NONE) {
            
            var targetUrl = "http://m.findit.fi/sv/"
            var bkpLink = document.getElementById("bkpLink");
            bkpLink.setAttribute("href", targetUrl);
            bkpLink.text = targetUrl;
            window.location.replace(targetUrl);
            
        }

        else if (language.value !== 'sv-SE' && networkState !== Connection.NONE) {
            
            var targetUrl = "http://m.findit.fi/fi/"
            var bkpLink = document.getElementById("bkpLink");
            bkpLink.setAttribute("href", targetUrl);
            bkpLink.text = targetUrl;
            window.location.replace(targetUrl);

            }

        else if (language.value == 'sv-SE' && networkState == Connection.NONE){
            
            alert("Granska internet anslutningen.");
            navigator.app.exitApp();
            }

        else {
            alert("Tarkistaa verkkoyhteyksesi");
            navigator.app.exitApp();
        }


        }

    )
};
// onSuccess Geolocation
//
function onSuccess(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
                        'Longitude: ' + position.coords.longitude + '<br />' +
                        'Altitude: ' + position.coords.altitude + '<br />' +
                        'Accuracy: ' + position.coords.accuracy + '<br />' +
                        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
                        'Heading: ' + position.coords.heading + '<br />' +
                        'Speed: ' + position.coords.speed + '<br />' +
                        'Timestamp: ' + new Date(position.timestamp) + '<br />';
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
}



app.initialize();