module.exports = function(config) {
    var API_KEY = 'vQmaYtGEeeyPgZxb9kWZl1tnuCzEK6Go';  // (kthibault)
    //var API_KEY = 'OY8iWA099JpCQr028dGVGqRQnxUTIKWP'; // (atimbro)
    //var API_KEY = 'vuPkssVEsUZMWeFQSAOIogMZylQnRd1H'; // (pcaron)

    var http = require('http');
    var express = require('express');
    var router = express.Router();

    /* GET API result from Flight Search */
    router.get('/getBestFlight', function(req, res) {
        // Build request
        var requestURL = "http://terminal2.expedia.com/x/mflights/search";
        requestURL += "?apikey=" + API_KEY;
        requestURL += "&maxOfferCount=1";
        requestURL += "&departureAirport=" + req.query.departureAirport;
        requestURL += "&arrivalAirport=" + req.query.arrivalAirport;
        requestURL += "&departureDate=" + req.query.departureDate;
        requestURL += "&numberOfAdultTravelers=" + req.query.numberOfAdultTravelers;

        console.log("Calling remote API: " + requestURL);

        http.get(requestURL, function(httpResponse) {
            var apiResponse = "";
            httpResponse.on('data', function (chunk) {
                apiResponse += chunk;
            });
            httpResponse.on('end', function () {
                try {
                    // Parse returned data
                    console.log("APIRESPONSE: " + apiResponse);
                    var apiData = JSON.parse(apiResponse);

                    // Send result data structure
                    res.send({
                        "airlineName": apiData.legs[0].segments[0].airlineName,
                        "airlineLogo": apiData.legs[0].segments[0].airlineName.replace(/\s/g,''),
                        "destination": {
                            "startPoint": apiData.searchCities[0].city,
                            "endPoint": apiData.searchCities[1].city
                        },
                        "segments": apiData.legs[0].segments,
                        "totalPrice": parseFloat(apiData.offers[0].totalFare)
                    });
                } catch (exception) {
                    //console.log(exception)
                    res.send({ "error": exception.message });
                }
            });
        }).on('error', function(error) {
            console.log(error);
            res.send({ "error": error });
        });
    });

    /* GET list of airport / city / country */
    router.get('/getCities', function (req, res) {
        /*
         * If a city has multiple cities, as well as a code to represent all its airports,
         * that code has been used instead of the individual ones.
         */
        res.send([{
            "codes": ["YXX"],
            "city": "Abbotsford, BC",
            "country": "Canada"
        }, {
            "codes": ["ABR"],
            "city": "Aberdeen, SD",
            "country": "USA",
            "position": {
                "lat": 45.44916667,
                "lng": -98.42194444
            }
        }, {
            "codes": ["ABI"],
            "city": "Abilene, TX",
            "country": "USA",
            "position": {
                "lat": 32.41138889,
                "lng": -99.68194444
            }
        }, {
            "codes": ["CAK"],
            "city": "Akron, OH",
            "country": "USA",
            "position": {
                "lat": 40.91611111,
                "lng": -81.44222222
            }
        }, {
            "codes": ["ALS"],
            "city": "Alamosa, CO",
            "country": "USA",
            "position": {
                "lat": 37.435,
                "lng": -105.8666667
            }
        }, {
            "codes": ["ABY"],
            "city": "Albany, GA",
            "country": "USA",
            "position": {
                "lat": 31.53555556,
                "lng": -84.19444444
            }
        }, {
            "codes": ["ALB"],
            "city": "Albany, NY",
            "country": "USA",
            "position": {
                "lat": 42.74916667,
                "lng": -73.80194444
            }
        }, {
            "codes": ["ABQ"],
            "city": "Albuquerque, NM",
            "country": "USA",
            "position": {
                "lat": 35.04027778,
                "lng": -106.6091667
            }
        }, {
            "codes": ["AEX"],
            "city": "Alexandria, LA",
            "country": "USA",
            "position": {
                "lat": 31.3275,
                "lng": -92.54861111
            }
        }, {
            "codes": ["ABE"],
            "city": "Allentown, PA",
            "country": "USA",
            "position": {
                "lat": 40.65222222,
                "lng": -75.44027778
            }
        }, {
            "codes": ["AIA"],
            "city": "Alliance, NE",
            "country": "USA",
            "position": {
                "lat": 42.05333333,
                "lng": -102.8038889
            }
        }, {
            "codes": ["APN"],
            "city": "Alpena, MI",
            "country": "USA",
            "position": {
                "lat": 45.07805556,
                "lng": -83.56027778
            }
        }, {
            "codes": ["AOO"],
            "city": "Altoona, PA",
            "country": "USA",
            "position": {
                "lat": 40.29638889,
                "lng": -78.32
            }
        }, {
            "codes": ["AMA"],
            "city": "Amarillo, TX",
            "country": "USA",
            "position": {
                "lat": 35.21944444,
                "lng": -101.7058333
            }
        }, {
            "codes": ["YAA"],
            "city": "Anahim Lake, BC",
            "country": "Canada"
        }, {
            "codes": ["ANC"],
            "city": "Anchorage, AK",
            "country": "USA",
            "position": {
                "lat": 61.17444444,
                "lng": -149.9963889
            }
        }, {
            "codes": ["ATW"],
            "city": "Appleton, WI",
            "country": "USA",
            "position": {
                "lat": 44.25805556,
                "lng": -88.51916667
            }
        }, {
            "codes": ["YEK"],
            "city": "Arviat, NWT",
            "country": "Canada"
        }, {
            "codes": ["AVL"],
            "city": "Asheville, NC",
            "country": "USA",
            "position": {
                "lat": 35.43611111,
                "lng": -82.54166667
            }
        }, {
            "codes": ["ASE"],
            "city": "Aspen, CO",
            "country": "USA",
            "position": {
                "lat": 39.22305556,
                "lng": -106.8688889
            }
        }, {
            "codes": ["AHN"],
            "city": "Athens, GA",
            "country": "USA",
            "position": {
                "lat": 33.94861111,
                "lng": -83.32638889
            }
        }, {
            "codes": ["ATL"],
            "city": "Atlanta, GA",
            "country": "USA",
            "position": {
                "lat": 33.63666667,
                "lng": -84.42805556
            }
        }, {
            "codes": ["ACY"],
            "city": "Atlantic City, NJ",
            "country": "USA",
            "position": {
                "lat": 39.4575,
                "lng": -74.57722222
            }
        }, {
            "codes": ["AGS"],
            "city": "Augusta, GA",
            "country": "USA",
            "position": {
                "lat": 33.37,
                "lng": -81.96444444
            }
        }, {
            "codes": ["AUG"],
            "city": "Augusta, ME",
            "country": "USA",
            "position": {
                "lat": 44.32055556,
                "lng": -69.79722222
            }
        }, {
            "codes": ["AUS"],
            "city": "Austin, TX",
            "country": "USA",
            "position": {
                "lat": 30.19444444,
                "lng": -97.67
            }
        }, {
            "codes": ["YBG"],
            "city": "Bagotville, QC",
            "country": "Canada"
        }, {
            "codes": ["BFL"],
            "city": "Bakersfield, CA",
            "country": "USA",
            "position": {
                "lat": 35.43388889,
                "lng": -119.0577778
            }
        }, {
            "codes": ["BWI"],
            "city": "Baltimore, MD",
            "country": "USA",
            "position": {
                "lat": 39.17527778,
                "lng": -76.66833333
            }
        }, {
            "codes": ["BGR"],
            "city": "Bangor, ME",
            "country": "USA",
            "position": {
                "lat": 44.8075,
                "lng": -68.82805556
            }
        }, {
            "codes": ["BHB"],
            "city": "Bar Harbor, ME",
            "country": "USA",
            "position": {
                "lat": 44.44972222,
                "lng": -68.36166667
            }
        }, {
            "codes": ["BRW"],
            "city": "Barrow, AK",
            "country": "USA",
            "position": {
                "lat": 71.28555556,
                "lng": -156.7661111
            }
        }, {
            "codes": ["BTR"],
            "city": "Baton Rouge, LA",
            "country": "USA",
            "position": {
                "lat": 30.53277778,
                "lng": -91.15
            }
        }, {
            "codes": ["BPT"],
            "city": "Beaumont, TX",
            "country": "USA",
            "position": {
                "lat": 29.95083333,
                "lng": -94.02055556
            }
        }, {
            "codes": ["BKW"],
            "city": "Beckley, WV",
            "country": "USA",
            "position": {
                "lat": 37.78722222,
                "lng": -81.12416667
            }
        }, {
            "codes": ["BED"],
            "city": "Bedford, MA",
            "country": "USA",
            "position": {
                "lat": 42.47,
                "lng": -71.28916667
            }
        }, {
            "codes": ["BLI"],
            "city": "Bellingham, WA",
            "country": "USA",
            "position": {
                "lat": 48.79277778,
                "lng": -122.5375
            }
        }, {
            "codes": ["BJI"],
            "city": "Bemidji, MN",
            "country": "USA",
            "position": {
                "lat": 47.51083333,
                "lng": -94.93472222
            }
        }, {
            "codes": ["BET"],
            "city": "Bethel, AK",
            "country": "USA",
            "position": {
                "lat": 60.77972222,
                "lng": -161.8380556
            }
        }, {
            "codes": ["BTT"],
            "city": "Bettles, AK",
            "country": "USA",
            "position": {
                "lat": 66.91388889,
                "lng": -151.5291667
            }
        }, {
            "codes": ["BIL"],
            "city": "Billings, MT",
            "country": "USA",
            "position": {
                "lat": 45.80777778,
                "lng": -108.5427778
            }
        }, {
            "codes": ["BGM"],
            "city": "Binghamton, NY",
            "country": "USA",
            "position": {
                "lat": 42.20861111,
                "lng": -75.97972222
            }
        }, {
            "codes": ["BHM"],
            "city": "Birmingham, AL",
            "country": "USA",
            "position": {
                "lat": 33.56388889,
                "lng": -86.75222222
            }
        }, {
            "codes": ["BIS"],
            "city": "Bismarck, ND",
            "country": "USA",
            "position": {
                "lat": 46.77277778,
                "lng": -100.7458333
            }
        }, {
            "codes": ["BMI"],
            "city": "Bloomington, IL",
            "country": "USA",
            "position": {
                "lat": 40.47722222,
                "lng": -88.91583333
            }
        }, {
            "codes": ["BMG"],
            "city": "Bloomington, IN",
            "country": "USA",
            "position": {
                "lat": 39.14611111,
                "lng": -86.61666667
            }
        }, {
            "codes": ["BLF"],
            "city": "Bluefield, WV",
            "country": "USA",
            "position": {
                "lat": 37.29583333,
                "lng": -81.20777778
            }
        }, {
            "codes": ["BOI"],
            "city": "Boise, ID",
            "country": "USA",
            "position": {
                "lat": 43.56444444,
                "lng": -116.2227778
            }
        }, {
            "codes": ["BOS"],
            "city": "Boston, MA",
            "country": "USA",
            "position": {
                "lat": 42.36305556,
                "lng": -71.00638889
            }
        }, {
            "codes": ["BZN"],
            "city": "Bozeman, MT",
            "country": "USA",
            "position": {
                "lat": 45.7775,
                "lng": -111.1519444
            }
        }, {
            "codes": ["BKX"],
            "city": "Brookings, SD",
            "country": "USA",
            "position": {
                "lat": 44.30472222,
                "lng": -96.81694444
            }
        }, {
            "codes": ["BRO"],
            "city": "Brownsville, TX",
            "country": "USA",
            "position": {
                "lat": 25.90683333,
                "lng": -97.42583333
            }
        }, {
            "codes": ["BQK"],
            "city": "Brunswick, GA",
            "country": "USA",
            "position": {
                "lat": 31.25916667,
                "lng": -81.46638889
            }
        }, {
            "codes": ["BUF"],
            "city": "Buffalo, NY",
            "country": "USA",
            "position": {
                "lat": 42.94055556,
                "lng": -78.73222222
            }
        }, {
            "codes": ["BUR"],
            "city": "Burbank, CA",
            "country": "USA",
            "position": {
                "lat": 34.20055556,
                "lng": -118.3586111
            }
        }, {
            "codes": ["BRL"],
            "city": "Burlington, IA",
            "country": "USA",
            "position": {
                "lat": 40.78333333,
                "lng": -91.12555556
            }
        }, {
            "codes": ["BBF"],
            "city": "Burlington, MA",
            "country": "USA"
        }, {
            "codes": ["BTV"],
            "city": "Burlington, VT",
            "country": "USA",
            "position": {
                "lat": 44.47194444,
                "lng": -73.15333333
            }
        }, {
            "codes": ["BTM"],
            "city": "Butte, MT",
            "country": "USA",
            "position": {
                "lat": 45.95472222,
                "lng": -112.4975
            }
        }, {
            "codes": ["YYC"],
            "city": "Calgary, AB",
            "country": "Canada",
            "position": {
                "lat": 51.044270,
                "lng": -114.062019
            }
        }, {
            "codes": ["YBL"],
            "city": "Campbell River, BC",
            "country": "Canada"
        }, {
            "codes": ["YGR"],
            "city": "Cap-aux-Meules, Magdalens Islands, QC",
            "country": "Canada"
        }, {
            "codes": ["CGI"],
            "city": "Cape Girardeau, MO",
            "country": "USA",
            "position": {
                "lat": 37.22527778,
                "lng": -89.57083333
            }
        }, {
            "codes": ["CLD"],
            "city": "Carlsbad, CA",
            "country": "USA"
        }, {
            "codes": ["CNM"],
            "city": "Carlsbad, NM",
            "country": "USA",
            "position": {
                "lat": 32.123169,
                "lng": -104.587450
            }
        }, {
            "codes": ["CPR"],
            "city": "Casper, WY",
            "country": "USA",
            "position": {
                "lat": 42.90805556,
                "lng": -106.4644444
            }
        }, {
            "codes": ["YCG"],
            "city": "Castlegar, BC",
            "country": "Canada"
        }, {
            "codes": ["CID"],
            "city": "Cedar Rapids, IA",
            "country": "USA",
            "position": {
                "lat": 41.88472222,
                "lng": -91.71083333
            }
        }, {
            "codes": ["CMI"],
            "city": "Champaign, IL",
            "country": "USA",
            "position": {
                "lat": 40.03888889,
                "lng": -88.27777778
            }
        }, {
            "codes": ["CHS"],
            "city": "Charleston, SC",
            "country": "USA",
            "position": {
                "lat": 32.89861111,
                "lng": -80.04055556
            }
        }, {
            "codes": ["CRW"],
            "city": "Charleston, WV",
            "country": "USA",
            "position": {
                "lat": 38.37305556,
                "lng": -81.59333333
            }
        }, {
            "codes": ["CLT"],
            "city": "Charlotte, NC",
            "country": "USA",
            "position": {
                "lat": 35.21388889,
                "lng": -80.94305556
            }
        }, {
            "codes": ["CHO"],
            "city": "Charlottesville, VA",
            "country": "USA",
            "position": {
                "lat": 38.13861111,
                "lng": -78.45277778
            }
        }, {
            "codes": ["YYG"],
            "city": "Charlottetown, PEI",
            "country": "Canada",
            "position": {
                "lat": 46.23,
                "lng": -63.12
            }
        }, {
            "codes": ["CHA"],
            "city": "Chattanooga, TN",
            "country": "USA",
            "position": {
                "lat": 35.03527778,
                "lng": -85.20361111
            }
        }, {
            "codes": ["CYS"],
            "city": "Cheyenne, WY",
            "country": "USA",
            "position": {
                "lat": 41.15555556,
                "lng": -104.8105556
            }
        }, {
            "codes": ["YMT"],
            "city": "Chibougamau, QC",
            "country": "Canada"
        }, {
            "codes": ["CHI"],
            "city": "Chicago, IL",
            "country": "USA",
            "position": {
                "lat": 41.881832,
                "lng": -87.623177
            }
        }, {
            "codes": ["CIC"],
            "city": "Chico, CA",
            "country": "USA",
            "position": {
                "lat": 39.79527778,
                "lng": -121.8583333
            }
        }, {
            "codes": ["YYQ"],
            "city": "Churchill, MB",
            "country": "Canada"
        }, {
            "codes": ["CVG"],
            "city": "Cincinnati, OH",
            "country": "USA",
            "position": {
                "lat": 39.04888889,
                "lng": -84.66777778
            }
        }, {
            "codes": ["CKB"],
            "city": "Clarksburg, WV",
            "country": "USA",
            "position": {
                "lat": 39.29666667,
                "lng": -80.22805556
            }
        }, {
            "codes": ["CLE"],
            "city": "Cleveland, OH",
            "country": "USA",
            "position": {
                "lat": 41.40944444,
                "lng": -81.855
            }
        }, {
            "codes": ["CVN"],
            "city": "Clovis, NM",
            "country": "USA",
            "position": {
                "lat": 34.425,
                "lng": -103.0791667
            }
        }, {
            "codes": ["COD"],
            "city": "Cody, WY",
            "country": "USA",
            "position": {
                "lat": 44.52027778,
                "lng": -109.0238889
            }
        }, {
            "codes": ["CLL"],
            "city": "College Station, TX",
            "country": "USA",
            "position": {
                "lat": 30.58861111,
                "lng": -96.36388889
            }
        }, {
            "codes": ["COS"],
            "city": "Colorado Springs, CO",
            "country": "USA",
            "position": {
                "lat": 38.80583333,
                "lng": -104.7008333
            }
        }, {
            "codes": ["COU"],
            "city": "Columbia, MO",
            "country": "USA",
            "position": {
                "lat": 38.81805556,
                "lng": -92.21972222
            }
        }, {
            "codes": ["CAE"],
            "city": "Columbia, SC",
            "country": "USA",
            "position": {
                "lat": 33.93888889,
                "lng": -81.11944444
            }
        }, {
            "codes": ["CSG"],
            "city": "Columbus, GA",
            "country": "USA",
            "position": {
                "lat": 32.51638889,
                "lng": -84.93888889
            }
        }, {
            "codes": ["CLU"],
            "city": "Columbus, IN",
            "country": "USA",
            "position": {
                "lat": 39.9611111,
                "lng": -82.9988889
            }
        }, {
            "codes": ["GTR"],
            "city": "Columbus, MS",
            "country": "USA",
            "position": {
                "lat": 33.45027778,
                "lng": -88.59138889
            }
        }, {
            "codes": ["OLU"],
            "city": "Columbus, NE",
            "country": "USA",
            "position": {
                "lat": 41.44805556,
                "lng": -97.34277778
            }
        }, {
            "codes": ["CMH"],
            "city": "Columbus, OH",
            "country": "USA",
            "position": {
                "lat": 39.99805556,
                "lng": -82.89194444
            }
        }, {
            "codes": ["CDV"],
            "city": "Cordova, AK",
            "country": "USA",
            "position": {
                "lat": 60.49166667,
                "lng": -145.4775
            }
        }, {
            "codes": ["CRP"],
            "city": "Corpus Christi, TX",
            "country": "USA",
            "position": {
                "lat": 27.77036111,
                "lng": -97.50111111
            }
        }, {
            "codes": ["YXC"],
            "city": "Cranbrook, BC",
            "country": "Canada"
        }, {
            "codes": ["DFW", "DAL"],
            "city": "Dallas, TX",
            "country": "USA",
            "position": {
                "lat": 32.89694444,
                "lng": -97.03805556
            }
        }, {
            "codes": ["DAY"],
            "city": "Dayton, OH",
            "country": "USA",
            "position": {
                "lat": 39.9025,
                "lng": -84.21944444
            }
        }, {
            "codes": ["DAB"],
            "city": "Daytona Beach, FL",
            "country": "USA",
            "position": {
                "lat": 29.18,
                "lng": -81.05805556
            }
        }, {
            "codes": ["DEC"],
            "city": "Decatur, IL",
            "country": "USA",
            "position": {
                "lat": 39.83444444,
                "lng": -88.86555556
            }
        }, {
            "codes": ["YDF"],
            "city": "Deer Lake, NF",
            "country": "Canada"
        }, {
            "codes": ["DEN"],
            "city": "Denver, CO",
            "country": "USA",
            "position": {
                "lat": 39.86166667,
                "lng": -104.6730556
            }
        }, {
            "codes": ["DSM"],
            "city": "Des Moines, IA",
            "country": "USA",
            "position": {
                "lat": 41.53388889,
                "lng": -93.66305556
            }
        }, {
            "codes": ["DTT"],
            "city": "Detroit, MI",
            "country": "USA",
            "position": {
                "lat": 42.3313889,
                "lng": -83.0458333
            }
        }, {
            "codes": ["DVL"],
            "city": "Devils Lake, ND",
            "country": "USA",
            "position": {
                "lat": 48.11444444,
                "lng": -98.90861111
            }
        }, {
            "codes": ["DIK"],
            "city": "Dickinson, ND",
            "country": "USA",
            "position": {
                "lat": 46.7975,
                "lng": -102.8019444
            }
        }, {
            "codes": ["DLG"],
            "city": "Dillingham, AK",
            "country": "USA",
            "position": {
                "lat": 59.04472222,
                "lng": -158.5055556
            }
        }, {
            "codes": ["DDC"],
            "city": "Dodge City, KS",
            "country": "USA",
            "position": {
                "lat": 37.76305556,
                "lng": -99.96555556
            }
        }, {
            "codes": ["DHN"],
            "city": "Dothan, AL",
            "country": "USA",
            "position": {
                "lat": 31.32138889,
                "lng": -85.44972222
            }
        }, {
            "codes": ["YHD"],
            "city": "Dryden, ON",
            "country": "Canada"
        }, {
            "codes": ["DUJ"],
            "city": "Du Bois, PA",
            "country": "USA",
            "position": {
                "lat": 41.17833333,
                "lng": -78.89861111
            }
        }, {
            "codes": ["DBQ"],
            "city": "Dubuque, IA",
            "country": "USA",
            "position": {
                "lat": 42.40194444,
                "lng": -90.70944444
            }
        }, {
            "codes": ["DLH"],
            "city": "Duluth, MN",
            "country": "USA",
            "position": {
                "lat": 46.84222222,
                "lng": -92.19361111
            }
        }, {
            "codes": ["DRO"],
            "city": "Durango, CO",
            "country": "USA",
            "position": {
                "lat": 37.15138889,
                "lng": -107.7538889
            }
        }, {
            "codes": ["DUT"],
            "city": "Dutch Harbor, Un Island, AK",
            "country": "USA",
            "position": {
                "lat": 53.9,
                "lng": -166.5436111
            }
        }, {
            "codes": ["EAU"],
            "city": "Eau Claire, WI",
            "country": "USA",
            "position": {
                "lat": 44.86583333,
                "lng": -91.48416667
            }
        }, {
            "codes": ["YEG"],
            "city": "Edmonton, AB",
            "country": "Canada"
        }, {
            "codes": ["EEK"],
            "city": "Eek, AK",
            "country": "USA",
            "position": {
                "lat": 60.21361111,
                "lng": -162.0438889
            }
        }, {
            "codes": ["IPL"],
            "city": "El Centro, CA",
            "country": "USA",
            "position": {
                "lat": 32.83416667,
                "lng": -115.5786111
            }
        }, {
            "codes": ["ELD"],
            "city": "El Dorado, AR",
            "country": "USA",
            "position": {
                "lat": 33.22111111,
                "lng": -92.81333333
            }
        }, {
            "codes": ["ELP"],
            "city": "El Paso, TX",
            "country": "USA",
            "position": {
                "lat": 31.80722222,
                "lng": -106.3775
            }
        }, {
            "codes": ["EKO"],
            "city": "Elko, NV",
            "country": "USA",
            "position": {
                "lat": 40.825,
                "lng": -115.7916667
            }
        }, {
            "codes": ["ELM"],
            "city": "Elmira, NY",
            "country": "USA",
            "position": {
                "lat": 42.16,
                "lng": -76.89166667
            }
        }, {
            "codes": ["WDG"],
            "city": "Enid, OK",
            "country": "USA",
            "position": {
                "lat": 36.37833333,
                "lng": -97.78888889
            }
        }, {
            "codes": ["ERI"],
            "city": "Erie, PA",
            "country": "USA",
            "position": {
                "lat": 42.08194444,
                "lng": -80.17611111
            }
        }, {
            "codes": ["ESC"],
            "city": "Escanaba, MI",
            "country": "USA",
            "position": {
                "lat": 45.72277778,
                "lng": -87.09361111
            }
        }, {
            "codes": ["EUG"],
            "city": "Eugene, OR",
            "country": "USA",
            "position": {
                "lat": 44.12444444,
                "lng": -123.2119444
            }
        }, {
            "codes": ["ACV"],
            "city": "Eureka, CA",
            "country": "USA",
            "position": {
                "lat": 40.97805556,
                "lng": -124.1086111
            }
        }, {
            "codes": ["EVV"],
            "city": "Evansville, IN",
            "country": "USA",
            "position": {
                "lat": 38.03694444,
                "lng": -87.53222222
            }
        }, {
            "codes": ["FAI"],
            "city": "Fairbanks, AK",
            "country": "USA",
            "position": {
                "lat": 64.81555556,
                "lng": -147.8586111
            }
        }, {
            "codes": ["FAR"],
            "city": "Fargo, ND",
            "country": "USA",
            "position": {
                "lat": 46.92055556,
                "lng": -96.81583333
            }
        }, {
            "codes": ["FMN"],
            "city": "Farmington, NM",
            "country": "USA",
            "position": {
                "lat": 36.74111111,
                "lng": -108.23
            }
        }, {
            "codes": ["XNA"],
            "city": "Fayetteville, AR",
            "country": "USA",
            "position": {
                "lat": 36.28194444,
                "lng": -94.30694444
            }
        }, {
            "codes": ["FAY"],
            "city": "Fayetteville, NC",
            "country": "USA",
            "position": {
                "lat": 34.99111111,
                "lng": -78.88027778
            }
        }, {
            "codes": ["FLG"],
            "city": "Flagstaff, AZ",
            "country": "USA",
            "position": {
                "lat": 35.14027778,
                "lng": -111.6691667
            }
        }, {
            "codes": ["FNT"],
            "city": "Flint, MI",
            "country": "USA",
            "position": {
                "lat": 42.96555556,
                "lng": -83.74361111
            }
        }, {
            "codes": ["FLO"],
            "city": "Florence, SC",
            "country": "USA",
            "position": {
                "lat": 34.18527778,
                "lng": -79.72388889
            }
        }, {
            "codes": ["FOD"],
            "city": "Fort Dodge, IA",
            "country": "USA",
            "position": {
                "lat": 42.55111111,
                "lng": -94.19194444
            }
        }, {
            "codes": ["FLL"],
            "city": "Fort Lauderdale, FL",
            "country": "USA",
            "position": {
                "lat": 26.07258333,
                "lng": -80.15277778
            }
        }, {
            "codes": ["TBN"],
            "city": "Fort Leonard Wood, MO",
            "country": "USA",
            "position": {
                "lat": 37.74166667,
                "lng": -92.14083333
            }
        }, {
            "codes": ["YMM"],
            "city": "Fort McMurray, AB",
            "country": "Canada"
        }, {
            "codes": ["RSW"],
            "city": "Fort Myers, FL",
            "country": "USA",
            "position": {
                "lat": 26.53616667,
                "lng": -81.75527778
            }
        }, {
            "codes": ["YYE"],
            "city": "Fort Nelson, BC",
            "country": "Canada",
            "position": {
                "lat": 58.8050174 ,
                "lng": -122.69723599999998
            }
        }, {
            "codes": ["YXJ"],
            "city": "Fort Saint John, BC",
            "country": "Canada"
        }, {
            "codes": ["FSM"],
            "city": "Fort Smith, AR",
            "country": "USA",
            "position": {
                "lat": 35.33666667,
                "lng": -94.3675
            }
        }, {
            "codes": ["YSM"],
            "city": "Fort Smith, NWT",
            "country": "Canada"
        }, {
            "codes": ["VPS"],
            "city": "Fort Walton Beach, FL",
            "country": "USA",
            "position": {
                "lat": 30.48333333,
                "lng": -86.52527778
            }
        }, {
            "codes": ["FWA"],
            "city": "Fort Wayne, IN",
            "country": "USA",
            "position": {
                "lat": 40.97833333,
                "lng": -85.19527778
            }
        }, {
            "codes": ["FYU"],
            "city": "Fort Yukon, AK",
            "country": "USA",
            "position": {
                "lat": 66.57138889,
                "lng": -145.2505556
            }
        }, {
            "codes": ["YFC"],
            "city": "Fredericton, NB",
            "country": "Canada",
            "position": {
                "lat": 45.9635895,
                "lng": -66.6431151
            }
        }, {
            "codes": ["FAT"],
            "city": "Fresno, CA",
            "country": "USA",
            "position": {
                "lat": 36.77611111,
                "lng": -119.7180556
            }
        }, {
            "codes": ["GNV"],
            "city": "Gainesville, FL",
            "country": "USA",
            "position": {
                "lat": 29.69,
                "lng": -82.27166667
            }
        }, {
            "codes": ["YQX"],
            "city": "Gander, NF",
            "country": "Canada"
        }, {
            "codes": ["GCK"],
            "city": "Garden City, KS",
            "country": "USA",
            "position": {
                "lat": 37.9275,
                "lng": -100.7244444
            }
        }, {
            "codes": ["YGP"],
            "city": "Gaspe, QC",
            "country": "Canada"
        }, {
            "codes": ["GCC"],
            "city": "Gillette, WY",
            "country": "USA",
            "position": {
                "lat": 44.34888889,
                "lng": -105.5394444
            }
        }, {
            "codes": ["GDV"],
            "city": "Glendive, MT",
            "country": "USA",
            "position": {
                "lat": 47.13861111,
                "lng": -104.8072222
            }
        }, {
            "codes": ["GFK"],
            "city": "Grand Forks, ND",
            "country": "USA",
            "position": {
                "lat": 47.94916667,
                "lng": -97.17611111
            }
        }, {
            "codes": ["GRI"],
            "city": "Grand Island, NE",
            "country": "USA",
            "position": {
                "lat": 40.9675,
                "lng": -98.30972222
            }
        }, {
            "codes": ["GJT"],
            "city": "Grand Junction, CO",
            "country": "USA",
            "position": {
                "lat": 39.1225,
                "lng": -108.5266667
            }
        }, {
            "codes": ["GRR"],
            "city": "Grand Rapids, MI",
            "country": "USA",
            "position": {
                "lat": 42.88083333,
                "lng": -85.52277778
            }
        }, {
            "codes": ["YQU"],
            "city": "Grande Prairie, AB",
            "country": "Canada"
        }, {
            "codes": ["GBD"],
            "city": "Great Bend, KS",
            "country": "USA",
            "position": {
                "lat": 38.34416667,
                "lng": -98.85916667
            }
        }, {
            "codes": ["GTF"],
            "city": "Great Falls, MT",
            "country": "USA",
            "position": {
                "lat": 47.48277778,
                "lng": -111.3705556
            }
        }, {
            "codes": ["GRB"],
            "city": "Green Bay, WI",
            "country": "USA",
            "position": {
                "lat": 44.48472222,
                "lng": -88.12972222
            }
        }, {
            "codes": ["LWB"],
            "city": "Greenbrier, WV",
            "country": "USA",
            "position": {
                "lat": 37.85833333,
                "lng": -80.39944444
            }
        }, {
            "codes": ["GSO"],
            "city": "Greensboro, NC",
            "country": "USA",
            "position": {
                "lat": 36.09777778,
                "lng": -79.93722222
            }
        }, {
            "codes": ["GLH"],
            "city": "Greenville, MS",
            "country": "USA",
            "position": {
                "lat": 33.48277778,
                "lng": -90.98555556
            }
        }, {
            "codes": ["PGV"],
            "city": "Greenville, NC",
            "country": "USA",
            "position": {
                "lat": 35.63527778,
                "lng": -77.38527778
            }
        }, {
            "codes": ["GSP"],
            "city": "Greenville, SC",
            "country": "USA",
            "position": {
                "lat": 34.89555556,
                "lng": -82.21888889
            }
        }, {
            "codes": ["GPT"],
            "city": "Gulfport, MS",
            "country": "USA",
            "position": {
                "lat": 30.40722222,
                "lng": -89.07
            }
        }, {
            "codes": ["GUC"],
            "city": "Gunnison, CO",
            "country": "USA",
            "position": {
                "lat": 38.53388889,
                "lng": -106.9330556
            }
        }, {
            "codes": ["HGR"],
            "city": "Hagerstown, MD",
            "country": "USA",
            "position": {
                "lat": 39.70861111,
                "lng": -77.72638889
            }
        }, {
            "codes": ["YHZ"],
            "city": "Halifax, NS",
            "country": "Canada",
            "position": {
                "lat": 44.648881,
                "lng": -63.575312
            }
        }, {
            "codes": ["YHM"],
            "city": "Hamilton, ON",
            "country": "Canada"
        }, {
            "codes": ["HNM"],
            "city": "Hana, Maui, HI",
            "country": "USA",
            "position": {
                "lat": 20.79563889,
                "lng": -156.0144444
            }
        }, {
            "codes": ["CMX"],
            "city": "Hancock, MI",
            "country": "USA",
            "position": {
                "lat": 47.16833333,
                "lng": -88.48916667
            }
        }, {
            "codes": ["HRL"],
            "city": "Harlingen, TX",
            "country": "USA",
            "position": {
                "lat": 26.2285,
                "lng": -97.65444444
            }
        }, {
            "codes": ["MDT"],
            "city": "Harrisburg, PA",
            "country": "USA",
            "position": {
                "lat": 40.19361111,
                "lng": -76.76333333
            }
        }, {
            "codes": ["HRO"],
            "city": "Harrison, AR",
            "country": "USA",
            "position": {
                "lat": 36.26138889,
                "lng": -93.15472222
            }
        }, {
            "codes": ["BDL"],
            "city": "Hartford, CT",
            "country": "USA",
            "position": {
                "lat": 41.93888889,
                "lng": -72.68333333
            }
        }, {
            "codes": ["HVR"],
            "city": "Havre, MT",
            "country": "USA",
            "position": {
                "lat": 48.54305556,
                "lng": -109.7622222
            }
        }, {
            "codes": ["HYS"],
            "city": "Hays, KS",
            "country": "USA",
            "position": {
                "lat": 38.84222222,
                "lng": -99.27305556
            }
        }, {
            "codes": ["HLN"],
            "city": "Helena, MT",
            "country": "USA",
            "position": {
                "lat": 46.60666667,
                "lng": -111.9827778
            }
        }, {
            "codes": ["HIB"],
            "city": "Hibbing, MN",
            "country": "USA",
            "position": {
                "lat": 47.38666667,
                "lng": -92.83888889
            }
        }, {
            "codes": ["HLL"],
            "city": "Hillside",
            "country": "Australia"
        }, {
            "codes": ["Big"],
            "city": "Hilo, Hawaii",
            "country": "USA"
        }, {
            "codes": ["HHH"],
            "city": "Hilton Head Island, SC",
            "country": "USA"
        }, {
            "codes": ["HOB"],
            "city": "Hobbs, NM",
            "country": "USA",
            "position": {
                "lat": 32.6875,
                "lng": -103.2169444
            }
        }, {
            "codes": ["HOM"],
            "city": "Homer, AK",
            "country": "USA",
            "position": {
                "lat": 59.64555556,
                "lng": -151.4766667
            }
        }, {
            "codes": ["HNL"],
            "city": "Honolulu, Oahu, HI",
            "country": "USA",
            "position": {
                "lat": 21.31866667,
                "lng": -157.9225
            }
        }, {
            "codes": ["MKK"],
            "city": "Hoolehua, Molokai, HI",
            "country": "USA",
            "position": {
                "lat": 21.15288889,
                "lng": -157.0961111
            }
        }, {
            "codes": ["HOU"],
            "city": "Houston, TX",
            "country": "USA",
            "position": {
                "lat": 29.64555556,
                "lng": -95.27888889
            }
        }, {
            "codes": ["HTS"],
            "city": "Huntington, WV",
            "country": "USA",
            "position": {
                "lat": 38.36666667,
                "lng": -82.55805556
            }
        }, {
            "codes": ["HSV"],
            "city": "Huntsville, AL",
            "country": "USA",
            "position": {
                "lat": 34.63722222,
                "lng": -86.775
            }
        }, {
            "codes": ["HON"],
            "city": "Huron, SD",
            "country": "USA",
            "position": {
                "lat": 44.38527778,
                "lng": -98.22861111
            }
        }, {
            "codes": ["HYA"],
            "city": "Hyannis, MA",
            "country": "USA",
            "position": {
                "lat": 41.66944444,
                "lng": -70.28027778
            }
        }, {
            "codes": ["IDA"],
            "city": "Idaho Falls, ID",
            "country": "USA",
            "position": {
                "lat": 43.51361111,
                "lng": -112.0708333
            }
        }, {
            "codes": ["IND"],
            "city": "Indianapolis, IN",
            "country": "USA",
            "position": {
                "lat": 39.71722222,
                "lng": -86.29472222
            }
        }, {
            "codes": ["INL"],
            "city": "International Falls, MN",
            "country": "USA",
            "position": {
                "lat": 48.56555556,
                "lng": -93.40222222
            }
        }, {
            "codes": ["IYK"],
            "city": "Inyokern, CA",
            "country": "USA",
            "position": {
                "lat": 35.65861111,
                "lng": -117.8294444
            }
        }, {
            "codes": ["YFB"],
            "city": "Iqaluit, Nunavut",
            "country": "Canada"
        }, {
            "codes": ["IMT"],
            "city": "Iron Mountain, MI",
            "country": "USA",
            "position": {
                "lat": 45.81833333,
                "lng": -88.11444444
            }
        }, {
            "codes": ["IWD"],
            "city": "Ironwood, MI",
            "country": "USA",
            "position": {
                "lat": 46.5275,
                "lng": -90.13138889
            }
        }, {
            "codes": ["ISP"],
            "city": "Islip, NY",
            "country": "USA",
            "position": {
                "lat": 40.79527778,
                "lng": -73.10027778
            }
        }, {
            "codes": ["ITH"],
            "city": "Ithaca, NY",
            "country": "USA",
            "position": {
                "lat": 42.49138889,
                "lng": -76.45888889
            }
        }, {
            "codes": ["JAC"],
            "city": "Jackson Hole, WY",
            "country": "USA",
            "position": {
                "lat": 43.60722222,
                "lng": -110.7377778
            }
        }, {
            "codes": ["JAN"],
            "city": "Jackson, MS",
            "country": "USA",
            "position": {
                "lat": 32.31111111,
                "lng": -90.07583333
            }
        }, {
            "codes": ["MKL"],
            "city": "Jackson, TN",
            "country": "USA",
            "position": {
                "lat": 35.6,
                "lng": -88.91555556
            }
        }, {
            "codes": ["JAX"],
            "city": "Jacksonville, FL",
            "country": "USA",
            "position": {
                "lat": 30.49416667,
                "lng": -81.68777778
            }
        }, {
            "codes": ["OAJ"],
            "city": "Jacksonville, NC",
            "country": "USA",
            "position": {
                "lat": 34.82916667,
                "lng": -77.61222222
            }
        }, {
            "codes": ["JMS"],
            "city": "Jamestown, ND",
            "country": "USA",
            "position": {
                "lat": 46.92972222,
                "lng": -98.67833333
            }
        }, {
            "codes": ["JHW"],
            "city": "Jamestown, NY",
            "country": "USA",
            "position": {
                "lat": 42.15333333,
                "lng": -79.25805556
            }
        }, {
            "codes": ["JST"],
            "city": "Johnstown, PA",
            "country": "USA",
            "position": {
                "lat": 40.31611111,
                "lng": -78.83388889
            }
        }, {
            "codes": ["JLN"],
            "city": "Joplin, MO",
            "country": "USA",
            "position": {
                "lat": 37.15194444,
                "lng": -94.49833333
            }
        }, {
            "codes": ["JNU"],
            "city": "Juneau, AK",
            "country": "USA",
            "position": {
                "lat": 58.355,
                "lng": -134.5763889
            }
        }, {
            "codes": ["OGG"],
            "city": "Kahului, Maui, HI",
            "country": "USA",
            "position": {
                "lat": 20.89863889,
                "lng": -156.4305556
            }
        }, {
            "codes": ["Big"],
            "city": "Kailua-Kona, Hawaii",
            "country": "USA"
        }, {
            "codes": ["AZO"],
            "city": "Kalamazoo, MI",
            "country": "USA",
            "position": {
                "lat": 42.23444444,
                "lng": -85.55166667
            }
        }, {
            "codes": ["LUP"],
            "city": "Kalaupapa, Molokai, HI",
            "country": "USA",
            "position": {
                "lat": 21.21102778,
                "lng": -156.9736111
            }
        }, {
            "codes": ["FCA"],
            "city": "Kalispell, MT",
            "country": "USA"
        }, {
            "codes": ["YKA"],
            "city": "Kamloops, BC",
            "country": "Canada"
        }, {
            "codes": ["Big"],
            "city": "Kamuela, Hawaii",
            "country": "USA"
        }, {
            "codes": ["MCI"],
            "city": "Kansas City, MO",
            "country": "USA",
            "position": {
                "lat": 39.2975,
                "lng": -94.71388889
            }
        }, {
            "codes": ["JHM"],
            "city": "Kapalua, Maui, HI",
            "country": "USA",
            "position": {
                "lat": 20.96294444,
                "lng": -156.6730556
            }
        }, {
            "codes": ["EAR"],
            "city": "Kearney, NE",
            "country": "USA",
            "position": {
                "lat": 40.72694444,
                "lng": -99.00666667
            }
        }, {
            "codes": ["YLW"],
            "city": "Kelowna, BC",
            "country": "Canada"
        }, {
            "codes": ["ENA"],
            "city": "Kenai, AK",
            "country": "USA",
            "position": {
                "lat": 60.57333333,
                "lng": -151.2447222
            }
        }, {
            "codes": ["YQK"],
            "city": "Kenora, ON",
            "country": "Canada"
        }, {
            "codes": ["EYW"],
            "city": "Key West, FL",
            "country": "USA",
            "position": {
                "lat": 24.55611111,
                "lng": -81.75944444
            }
        }, {
            "codes": ["GRK"],
            "city": "Killeen, TX",
            "country": "USA",
            "position": {
                "lat": 31.06722222,
                "lng": -97.82888889
            }
        }, {
            "codes": ["AKN"],
            "city": "King Salmon, AK",
            "country": "USA",
            "position": {
                "lat": 58.67638889,
                "lng": -156.6486111
            }
        }, {
            "codes": ["IGM"],
            "city": "Kingman, AZ",
            "country": "USA",
            "position": {
                "lat": 35.25944444,
                "lng": -113.9380556
            }
        }, {
            "codes": ["YGK"],
            "city": "Kingston, ON",
            "country": "Canada"
        }, {
            "codes": ["IRK"],
            "city": "Kirksville, MO",
            "country": "USA",
            "position": {
                "lat": 40.09361111,
                "lng": -92.545
            }
        }, {
            "codes": ["LMT"],
            "city": "Klamath Falls, OR",
            "country": "USA",
            "position": {
                "lat": 42.15611111,
                "lng": -121.7333333
            }
        }, {
            "codes": ["TYS"],
            "city": "Knoxville, TN",
            "country": "USA",
            "position": {
                "lat": 35.81111111,
                "lng": -83.99388889
            }
        }, {
            "codes": ["ADQ"],
            "city": "Kodiak, AK",
            "country": "USA",
            "position": {
                "lat": 57.75,
                "lng": -152.4938889
            }
        }, {
            "codes": ["LSE"],
            "city": "La Crosse, WI",
            "country": "USA",
            "position": {
                "lat": 43.87916667,
                "lng": -91.25666667
            }
        }, {
            "codes": ["LAB"],
            "city": "Lablab",
            "country": "Papua New Guinea"
        }, {
            "codes": ["LFT"],
            "city": "Lafayette, LA",
            "country": "USA",
            "position": {
                "lat": 30.20527778,
                "lng": -91.9875
            }
        }, {
            "codes": ["LCH"],
            "city": "Lake Charles, LA",
            "country": "USA",
            "position": {
                "lat": 30.12611111,
                "lng": -93.22333333
            }
        }, {
            "codes": ["LNY"],
            "city": "Lanai City, Lanai, HI",
            "country": "USA",
            "position": {
                "lat": 20.78561111,
                "lng": -156.9513889
            }
        }, {
            "codes": ["LNS"],
            "city": "Lancaster, PA",
            "country": "USA",
            "position": {
                "lat": 40.12166667,
                "lng": -76.29611111
            }
        }, {
            "codes": ["LAN"],
            "city": "Lansing, MI",
            "country": "USA",
            "position": {
                "lat": 42.77861111,
                "lng": -84.58666667
            }
        }, {
            "codes": ["LAR"],
            "city": "Laramie, WY",
            "country": "USA",
            "position": {
                "lat": 41.31194444,
                "lng": -105.675
            }
        }, {
            "codes": ["LRD"],
            "city": "Laredo, TX",
            "country": "USA",
            "position": {
                "lat": 27.54380556,
                "lng": -99.46166667
            }
        }, {
            "codes": ["LRU"],
            "city": "Las Cruces, NM",
            "country": "USA",
            "position": {
                "lat": 32.28944444,
                "lng": -106.9219444
            }
        }, {
            "codes": ["LAS"],
            "city": "Las Vegas, NV",
            "country": "USA",
            "position": {
                "lat": 36.08,
                "lng": -115.1522222
            }
        }, {
            "codes": ["LBE"],
            "city": "Latrobe, PA",
            "country": "USA",
            "position": {
                "lat": 40.27472222,
                "lng": -79.40666667
            }
        }, {
            "codes": ["PIB"],
            "city": "Laurel, MS",
            "country": "USA",
            "position": {
                "lat": 31.46722222,
                "lng": -89.33694444
            }
        }, {
            "codes": ["LAW"],
            "city": "Lawton, OK",
            "country": "USA",
            "position": {
                "lat": 34.56777778,
                "lng": -98.41666667
            }
        }, {
            "codes": ["YQL"],
            "city": "Lethbridge, AB",
            "country": "Canada"
        }, {
            "codes": ["LWS"],
            "city": "Lewiston, ID",
            "country": "USA",
            "position": {
                "lat": 46.37444444,
                "lng": -117.0152778
            }
        }, {
            "codes": ["LEW"],
            "city": "Lewiston, ME",
            "country": "USA",
            "position": {
                "lat": 44.04833333,
                "lng": -70.28361111
            }
        }, {
            "codes": ["LWT"],
            "city": "Lewistown, MT",
            "country": "USA",
            "position": {
                "lat": 47.04916667,
                "lng": -109.4666667
            }
        }, {
            "codes": ["LEX"],
            "city": "Lexington, KY",
            "country": "USA",
            "position": {
                "lat": 38.03638889,
                "lng": -84.60583333
            }
        }, {
            "codes": ["LBL"],
            "city": "Liberal, KS",
            "country": "USA",
            "position": {
                "lat": 37.04416667,
                "lng": -100.96
            }
        }, {
            "codes": ["LIH"],
            "city": "Lihue, Kauai, HI",
            "country": "USA",
            "position": {
                "lat": 21.97597222,
                "lng": -159.3388889
            }
        }, {
            "codes": ["LNK"],
            "city": "Lincoln, NE",
            "country": "USA",
            "position": {
                "lat": 40.85111111,
                "lng": -96.75916667
            }
        }, {
            "codes": ["LIT"],
            "city": "Little Rock, AR",
            "country": "USA",
            "position": {
                "lat": 34.72944444,
                "lng": -92.22444444
            }
        }, {
            "codes": ["YXU"],
            "city": "London, ON",
            "country": "Canada"
        }, {
            "codes": ["LGB"],
            "city": "Long Beach, CA",
            "country": "USA",
            "position": {
                "lat": 33.81777778,
                "lng": -118.1516667
            }
        }, {
            "codes": ["GGG"],
            "city": "Longview, TX",
            "country": "USA",
            "position": {
                "lat": 32.38388889,
                "lng": -94.71138889
            }
        }, {
            "codes": ["QLA"],
            "city": "Los Angeles, CA",
            "country": "USA",
            "position": {
                "lat": 	34.052235,
                "lng": -118.243683
        }
        }, {
            "codes": ["SDF"],
            "city": "Louisville, KY, USA",
            "country": "USA",
            "position": {
                "lat": 38.17416667,
                "lng": -85.73638889
            }
        }, {
            "codes": ["LBB"],
            "city": "Lubbock, TX",
            "country": "USA",
            "position": {
                "lat": 33.66361111,
                "lng": -101.8227778
            }
        }, {
            "codes": ["LYH"],
            "city": "Lynchburg, VA",
            "country": "USA",
            "position": {
                "lat": 37.32527778,
                "lng": -79.20055556
            }
        }, {
            "codes": ["MCN"],
            "city": "Macon, GA",
            "country": "USA",
            "position": {
                "lat": 32.69277778,
                "lng": -83.64916667
            }
        }, {
            "codes": ["MSN"],
            "city": "Madison, WI",
            "country": "USA",
            "position": {
                "lat": 43.13972222,
                "lng": -89.3375
            }
        }, {
            "codes": ["MHT"],
            "city": "Manchester, NH",
            "country": "USA",
            "position": {
                "lat": 42.93277778,
                "lng": -71.43583333
            }
        }, {
            "codes": ["MHK"],
            "city": "Manhattan, KS",
            "country": "USA",
            "position": {
                "lat": 39.14111111,
                "lng": -96.67083333
            }
        }, {
            "codes": ["MBL"],
            "city": "Manistee, MI",
            "country": "USA",
            "position": {
                "lat": 44.2725,
                "lng": -86.24694444
            }
        }, {
            "codes": ["MWA"],
            "city": "Marion, IL",
            "country": "USA",
            "position": {
                "lat": 37.755,
                "lng": -89.01111111
            }
        }, {
            "codes": ["MQT"],
            "city": "Marquette, MI",
            "country": "USA"
        }, {
            "codes": ["MVY"],
            "city": "Martha's Vineyard, MA",
            "country": "USA",
            "position": {
                "lat": 41.39305556,
                "lng": -70.61444444
            }
        }, {
            "codes": ["MCW"],
            "city": "Mason City, IA",
            "country": "USA",
            "position": {
                "lat": 43.15777778,
                "lng": -93.33138889
            }
        }, {
            "codes": ["MSS"],
            "city": "Massena, NY",
            "country": "USA",
            "position": {
                "lat": 44.93583333,
                "lng": -74.84555556
            }
        }, {
            "codes": ["MFE"],
            "city": "McAllen, TX",
            "country": "USA",
            "position": {
                "lat": 26.17583333,
                "lng": -98.23861111
            }
        }, {
            "codes": ["MCK"],
            "city": "McCook, NE",
            "country": "USA",
            "position": {
                "lat": 40.20638889,
                "lng": -100.5922222
            }
        }, {
            "codes": ["MFR"],
            "city": "Medford, OR",
            "country": "USA",
            "position": {
                "lat": 42.37416667,
                "lng": -122.8736111
            }
        }, {
            "codes": ["YXH"],
            "city": "Medicine Hat, AB",
            "country": "Canada"
        }, {
            "codes": ["MLB"],
            "city": "Melbourne, FL",
            "country": "USA",
            "position": {
                "lat": 28.10277778,
                "lng": -80.64527778
            }
        }, {
            "codes": ["MEM"],
            "city": "Memphis, TN",
            "country": "USA",
            "position": {
                "lat": 35.0425,
                "lng": -89.97666667
            }
        }, {
            "codes": ["MEI"],
            "city": "Meridian, MS",
            "country": "USA",
            "position": {
                "lat": 32.3325,
                "lng": -88.75194444
            }
        }, {
            "codes": ["MIA"],
            "city": "Miami, FL",
            "country": "USA",
            "position": {
                "lat": 25.79325,
                "lng": -80.29055556
            }
        }, {
            "codes": ["MAF"],
            "city": "Midland, TX",
            "country": "USA",
            "position": {
                "lat": 31.9425,
                "lng": -102.2019444
            }
        }, {
            "codes": ["MLS"],
            "city": "Miles City, MT",
            "country": "USA",
            "position": {
                "lat": 46.42805556,
                "lng": -105.8861111
            }
        }, {
            "codes": ["MKE"],
            "city": "Milwaukee, WI",
            "country": "USA",
            "position": {
                "lat": 42.94722222,
                "lng": -87.89666667
            }
        }, {
            "codes": ["MSP"],
            "city": "Minneapolis, MN",
            "country": "USA",
            "position": {
                "lat": 44.88194444,
                "lng": -93.22166667
            }
        }, {
            "codes": ["MOT"],
            "city": "Minot, ND",
            "country": "USA",
            "position": {
                "lat": 48.25777778,
                "lng": -101.2780556
            }
        }, {
            "codes": ["MSO"],
            "city": "Missoula, MT",
            "country": "USA",
            "position": {
                "lat": 46.91638889,
                "lng": -114.0905556
            }
        }, {
            "codes": ["MOB"],
            "city": "Mobile, AL",
            "country": "USA",
            "position": {
                "lat": 30.69138889,
                "lng": -88.24277778
            }
        }, {
            "codes": ["MOD"],
            "city": "Modesto, CA",
            "country": "USA",
            "position": {
                "lat": 37.62583333,
                "lng": -120.9544444
            }
        }, {
            "codes": ["MLI"],
            "city": "Moline, IL",
            "country": "USA",
            "position": {
                "lat": 41.44861111,
                "lng": -90.50722222
            }
        }, {
            "codes": ["YQM"],
            "city": "Moncton, NB",
            "country": "Canada"
        }, {
            "codes": ["MLU"],
            "city": "Monroe, LA",
            "country": "USA",
            "position": {
                "lat": 32.51083333,
                "lng": -92.03777778
            }
        }, {
            "codes": ["YYY"],
            "city": "Mont-Joli, QC",
            "country": "Canada"
        }, {
            "codes": ["MRY"],
            "city": "Monterey, CA",
            "country": "USA",
            "position": {
                "lat": 36.58694444,
                "lng": -121.8430556
            }
        }, {
            "codes": ["MGM"],
            "city": "Montgomery, AL",
            "country": "USA",
            "position": {
                "lat": 32.30055556,
                "lng": -86.39388889
            }
        }, {
            "codes": ["YUL"],
            "city": "Montreal, QC",
            "country": "Canada",
            "position": {
                "lat": 45.5086699,
                "lng": -73.5539925
            }
        }, {
            "codes": ["MTJ"],
            "city": "Montrose, CO",
            "country": "USA",
            "position": {
                "lat": 38.50972222,
                "lng": -107.8941667
            }
        }, {
            "codes": ["MGW"],
            "city": "Morgantown, WV",
            "country": "USA",
            "position": {
                "lat": 39.64277778,
                "lng": -79.91638889
            }
        }, {
            "codes": ["MWH"],
            "city": "Moses Lake, WA",
            "country": "USA",
            "position": {
                "lat": 47.20861111,
                "lng": -119.3191667
            }
        }, {
            "codes": ["MSL"],
            "city": "Muscle Shoals, AL",
            "country": "USA",
            "position": {
                "lat": 34.74527778,
                "lng": -87.61027778
            }
        }, {
            "codes": ["MKG"],
            "city": "Muskegon, MI",
            "country": "USA",
            "position": {
                "lat": 43.16777778,
                "lng": -86.23555556
            }
        }, {
            "codes": ["YCD"],
            "city": "Nanaimo, BC",
            "country": "Canada"
        }, {
            "codes": ["ACK"],
            "city": "Nantucket, MA",
            "country": "USA",
            "position": {
                "lat": 41.25305556,
                "lng": -70.06027778
            }
        }, {
            "codes": ["BNA"],
            "city": "Nashville, TN",
            "country": "USA",
            "position": {
                "lat": 36.12444444,
                "lng": -86.67833333
            }
        }, {
            "codes": ["EWN"],
            "city": "New Bern, NC",
            "country": "USA",
            "position": {
                "lat": 35.07305556,
                "lng": -77.04305556
            }
        }, {
            "codes": ["HVN"],
            "city": "New Haven, CT",
            "country": "USA",
            "position": {
                "lat": 41.26388889,
                "lng": -72.88666667
            }
        }, {
            "codes": ["MSY"],
            "city": "New Orleans, LA",
            "country": "USA",
            "position": {
                "lat": 29.99333333,
                "lng": -90.25805556
            }
        }, {
            "codes": ["NYC"],
            "city": "New York, NY",
            "country": "USA",
            "position": {
                "lat": 40.748817,
                "lng": -73.985428
            }
        }, {
            "codes": ["EWR"],
            "city": "Newark, NJ",
            "country": "USA",
            "position": {
                "lat": 40.6925,
                "lng": -74.16861111
            }
        }, {
            "codes": ["SWF"],
            "city": "Newburgh, NY",
            "country": "USA",
            "position": {
                "lat": 41.50416667,
                "lng": -74.10472222
            }
        }, {
            "codes": ["PHF"],
            "city": "Newport News, VA",
            "country": "USA",
            "position": {
                "lat": 37.13194444,
                "lng": -76.49305556
            }
        }, {
            "codes": ["OME"],
            "city": "Nome, AK",
            "country": "USA",
            "position": {
                "lat": 64.51222222,
                "lng": -165.4452778
            }
        }, {
            "codes": ["ORF"],
            "city": "Norfolk, VA",
            "country": "USA",
            "position": {
                "lat": 36.89472222,
                "lng": -76.20111111
            }
        }, {
            "codes": ["YYB"],
            "city": "North Bay, ON",
            "country": "Canada"
        }, {
            "codes": ["OTH"],
            "city": "North Bend, OR",
            "country": "USA",
            "position": {
                "lat": 43.41694444,
                "lng": -124.2469444
            }
        }, {
            "codes": ["LBF"],
            "city": "North Platte, NE",
            "country": "USA",
            "position": {
                "lat": 41.12611111,
                "lng": -100.6836111
            }
        }, {
            "codes": ["OAK"],
            "city": "Oakland, CA",
            "country": "USA",
            "position": {
                "lat": 37.72138889,
                "lng": -122.2208333
            }
        }, {
            "codes": ["OGS"],
            "city": "Ogdensburg, NY",
            "country": "USA",
            "position": {
                "lat": 44.68194444,
                "lng": -75.46555556
            }
        }, {
            "codes": ["OKC"],
            "city": "Oklahoma City, OK",
            "country": "USA",
            "position": {
                "lat": 35.39305556,
                "lng": -97.60083333
            }
        }, {
            "codes": ["OMA"],
            "city": "Omaha, NE",
            "country": "USA",
            "position": {
                "lat": 41.30305556,
                "lng": -95.89416667
            }
        }, {
            "codes": ["ONT"],
            "city": "Ontario, CA",
            "country": "USA",
            "position": {
                "lat": 34.05611111,
                "lng": -117.6011111
            }
        }, {
            "codes": ["SNA"],
            "city": "Orange County, CA",
            "country": "USA",
            "position": {
                "lat": 33.67555556,
                "lng": -117.8683333
            }
        }, {
            "codes": ["MCO"],
            "city": "Orlando, FL",
            "country": "USA",
            "position": {
                "lat": 28.42944444,
                "lng": -81.30888889
            }
        }, {
            "codes": ["OSH"],
            "city": "Oshkosh, WI",
            "country": "USA",
            "position": {
                "lat": 43.98444444,
                "lng": -88.55694444
            }
        }, {
            "codes": ["YOW"],
            "city": "Ottawa, ON",
            "country": "Canada",
            "position": {
                "lat": 45.425533,
                "lng": -75.692482
            }
        }, {
            "codes": ["OWB"],
            "city": "Owensboro, KY",
            "country": "USA",
            "position": {
                "lat": 37.73888889,
                "lng": -87.16694444
            }
        }, {
            "codes": ["OXR"],
            "city": "Oxnard, CA",
            "country": "USA",
            "position": {
                "lat": 34.20083333,
                "lng": -119.2072222
            }
        }, {
            "codes": ["PAH"],
            "city": "Paducah, KY",
            "country": "USA",
            "position": {
                "lat": 37.06027778,
                "lng": -88.77305556
            }
        }, {
            "codes": ["PGA"],
            "city": "Page, AZ",
            "country": "USA",
            "position": {
                "lat": 36.92611111,
                "lng": -111.4483333
            }
        }, {
            "codes": ["PSP"],
            "city": "Palm Springs, CA",
            "country": "USA",
            "position": {
                "lat": 33.82972222,
                "lng": -116.5066667
            }
        }, {
            "codes": ["PFN"],
            "city": "Panama City, FL",
            "country": "USA",
            "position": {
                "lat": 30.21222222,
                "lng": -85.68277778
            }
        }, {
            "codes": ["PKB"],
            "city": "Parkersburg, WV",
            "country": "USA",
            "position": {
                "lat": 39.345,
                "lng": -81.43916667
            }
        }, {
            "codes": ["PSC"],
            "city": "Pasco, WA",
            "country": "USA",
            "position": {
                "lat": 46.26472222,
                "lng": -119.1188889
            }
        }, {
            "codes": ["PLN"],
            "city": "Pellston, MI",
            "country": "USA",
            "position": {
                "lat": 45.57083333,
                "lng": -84.79666667
            }
        }, {
            "codes": ["PDT"],
            "city": "Pendleton, OR",
            "country": "USA",
            "position": {
                "lat": 45.695,
                "lng": -118.8413889
            }
        }, {
            "codes": ["PNS"],
            "city": "Pensacola, FL",
            "country": "USA",
            "position": {
                "lat": 30.47333333,
                "lng": -87.18666667
            }
        }, {
            "codes": ["YYF"],
            "city": "Penticton, BC",
            "country": "Canada"
        }, {
            "codes": ["PIA"],
            "city": "Peoria, IL",
            "country": "USA",
            "position": {
                "lat": 40.66416667,
                "lng": -89.69333333
            }
        }, {
            "codes": ["PHL"],
            "city": "Philadelphia, PA",
            "country": "USA",
            "position": {
                "lat": 39.87222222,
                "lng": -75.24083333
            }
        }, {
            "codes": ["PHX"],
            "city": "Phoenix, AZ",
            "country": "USA",
            "position": {
                "lat": 33.43416667,
                "lng": -112.0116667
            }
        }, {
            "codes": ["PIR"],
            "city": "Pierre, SD",
            "country": "USA",
            "position": {
                "lat": 44.38277778,
                "lng": -100.2861111
            }
        }, {
            "codes": ["SOP"],
            "city": "Pinehurst, NC",
            "country": "USA",
            "position": {
                "lat": 35.2375,
                "lng": -79.38888889
            }
        }, {
            "codes": ["PIT"],
            "city": "Pittsburgh, PA",
            "country": "USA",
            "position": {
                "lat": 40.49138889,
                "lng": -80.23277778
            }
        }, {
            "codes": ["PIH"],
            "city": "Pocatello, ID",
            "country": "USA",
            "position": {
                "lat": 42.90972222,
                "lng": -112.5958333
            }
        }, {
            "codes": ["PNC"],
            "city": "Ponca City, OK",
            "country": "USA",
            "position": {
                "lat": 36.73194444,
                "lng": -97.09972222
            }
        }, {
            "codes": ["YZT"],
            "city": "Port Hardy, BC",
            "country": "Canada"
        }, {
            "codes": ["PWM"],
            "city": "Portland, ME",
            "country": "USA",
            "position": {
                "lat": 43.64611111,
                "lng": -70.30916667
            }
        }, {
            "codes": ["PDX"],
            "city": "Portland, OR",
            "country": "USA",
            "position": {
                "lat": 45.58833333,
                "lng": -122.5975
            }
        }, {
            "codes": ["PSM"],
            "city": "Portsmouth, NH",
            "country": "USA",
            "position": {
                "lat": 43.07805556,
                "lng": -70.82333333
            }
        }, {
            "codes": ["YPW"],
            "city": "Powell River, BC",
            "country": "Canada"
        }, {
            "codes": ["PRC"],
            "city": "Prescott, AZ",
            "country": "USA",
            "position": {
                "lat": 34.65444444,
                "lng": -112.4197222
            }
        }, {
            "codes": ["PQI"],
            "city": "Presque Isle, ME",
            "country": "USA",
            "position": {
                "lat": 46.68888889,
                "lng": -68.04472222
            }
        }, {
            "codes": ["YPR"],
            "city": "Prince Rupert, BC",
            "country": "Canada"
        }, {
            "codes": ["PVD"],
            "city": "Providence, RI",
            "country": "USA",
            "position": {
                "lat": 41.72388889,
                "lng": -71.42833333
            }
        }, {
            "codes": ["PVC"],
            "city": "Provincetown, MA",
            "country": "USA",
            "position": {
                "lat": 42.07194444,
                "lng": -70.22138889
            }
        }, {
            "codes": ["PUB"],
            "city": "Pueblo, CO",
            "country": "USA",
            "position": {
                "lat": 38.28916667,
                "lng": -104.4963889
            }
        }, {
            "codes": ["PUW"],
            "city": "Pullman, WA",
            "country": "USA",
            "position": {
                "lat": 46.74388889,
                "lng": -117.1094444
            }
        }, {
            "codes": ["YQB"],
            "city": "Quebec, QC",
            "country": "Canada"
        }, {
            "codes": ["YQZ"],
            "city": "Quesnel, BC",
            "country": "Canada"
        }, {
            "codes": ["UIN"],
            "city": "Quincy, IL",
            "country": "USA",
            "position": {
                "lat": 39.94305556,
                "lng": -91.19444444
            }
        }, {
            "codes": ["RDU"],
            "city": "Raleigh, NC",
            "country": "USA",
            "position": {
                "lat": 35.87777778,
                "lng": -78.7875
            }
        }, {
            "codes": ["YRT"],
            "city": "Rankin Inlet, NWT",
            "country": "Canada"
        }, {
            "codes": ["RAP"],
            "city": "Rapid City, SD",
            "country": "USA",
            "position": {
                "lat": 44.04527778,
                "lng": -103.0572222
            }
        }, {
            "codes": ["YRL"],
            "city": "Red Lake, ON",
            "country": "Canada"
        }, {
            "codes": ["RDD"],
            "city": "Redding, CA",
            "country": "USA",
            "position": {
                "lat": 40.50888889,
                "lng": -122.2933333
            }
        }, {
            "codes": ["RDM"],
            "city": "Redmond, OR",
            "country": "USA",
            "position": {
                "lat": 44.25416667,
                "lng": -121.15
            }
        }, {
            "codes": ["YQR"],
            "city": "Regina, SK",
            "country": "Canada"
        }, {
            "codes": ["RNO"],
            "city": "Reno, NV",
            "country": "USA",
            "position": {
                "lat": 39.49916667,
                "lng": -119.7680556
            }
        }, {
            "codes": ["RHI"],
            "city": "Rhinelander, WI",
            "country": "USA",
            "position": {
                "lat": 45.63111111,
                "lng": -89.4675
            }
        }, {
            "codes": ["RIC"],
            "city": "Richmond, VA",
            "country": "USA",
            "position": {
                "lat": 37.50527778,
                "lng": -77.31972222
            }
        }, {
            "codes": ["RIW"],
            "city": "Riverton, WY",
            "country": "USA",
            "position": {
                "lat": 43.06416667,
                "lng": -108.4597222
            }
        }, {
            "codes": ["ROA"],
            "city": "Roanoke, VA",
            "country": "USA",
            "position": {
                "lat": 37.32555556,
                "lng": -79.97555556
            }
        }, {
            "codes": ["YRJ"],
            "city": "Roberval, QC",
            "country": "Canada"
        }, {
            "codes": ["RST"],
            "city": "Rochester, MN",
            "country": "USA",
            "position": {
                "lat": 43.90833333,
                "lng": -92.5
            }
        }, {
            "codes": ["ROC"],
            "city": "Rochester, NY",
            "country": "USA",
            "position": {
                "lat": 43.11888889,
                "lng": -77.6725
            }
        }, {
            "codes": ["RKS"],
            "city": "Rock Springs, WY",
            "country": "USA",
            "position": {
                "lat": 41.59416667,
                "lng": -109.0652778
            }
        }, {
            "codes": ["RFD"],
            "city": "Rockford, IL",
            "country": "USA",
            "position": {
                "lat": 42.19527778,
                "lng": -89.09722222
            }
        }, {
            "codes": ["RKD"],
            "city": "Rockland, ME",
            "country": "USA",
            "position": {
                "lat": 44.06,
                "lng": -69.09916667
            }
        }, {
            "codes": ["ROW"],
            "city": "Roswell, NM",
            "country": "USA",
            "position": {
                "lat": 33.30166667,
                "lng": -104.5305556
            }
        }, {
            "codes": ["YUY"],
            "city": "Rouyn-Noranda, QC",
            "country": "Canada"
        }, {
            "codes": ["RUT"],
            "city": "Rutland, VT",
            "country": "USA",
            "position": {
                "lat": 43.53,
                "lng": -72.94972222
            }
        }, {
            "codes": ["SPY"],
            "city": "Saba",
            "country": "Sint Eustatius and Saba"
        }, {
            "codes": ["SMF"],
            "city": "Sacramento, CA",
            "country": "USA",
            "position": {
                "lat": 38.69555556,
                "lng": -121.5908333
            }
        }, {
            "codes": ["MBS"],
            "city": "Saginaw, MI",
            "country": "USA",
            "position": {
                "lat": 43.53277778,
                "lng": -84.07972222
            }
        }, {
            "codes": ["YSJ"],
            "city": "Saint John, NB",
            "country": "Canada"
        }, {
            "codes": ["SLN"],
            "city": "Salina, KS",
            "country": "USA",
            "position": {
                "lat": 38.79083333,
                "lng": -97.65222222
            }
        }, {
            "codes": ["SLC"],
            "city": "Salt Lake City, UT",
            "country": "USA",
            "position": {
                "lat": 40.78833333,
                "lng": -111.9777778
            }
        }, {
            "codes": ["SJT"],
            "city": "San Angelo, TX",
            "country": "USA",
            "position": {
                "lat": 31.35777778,
                "lng": -100.4963889
            }
        }, {
            "codes": ["SAT"],
            "city": "San Antonio, TX",
            "country": "USA",
            "position": {
                "lat": 29.53361111,
                "lng": -98.46972222
            }
        }, {
            "codes": ["SAN"],
            "city": "San Diego, CA",
            "country": "USA",
            "position": {
                "lat": 32.73361111,
                "lng": -117.1897222
            }
        }, {
            "codes": ["QSF"],
            "city": "San Francisco, CA",
            "country": "USA",
            "position": {
                "lat": 37.773972,
                "lng": -122.431297
            }
        }, {
            "codes": ["SJC"],
            "city": "San Jose, CA",
            "country": "USA",
            "position": {
                "lat": 37.36277778,
                "lng": -121.9291667
            }
        }, {
            "codes": ["SBP"],
            "city": "San Luis Obispo, CA",
            "country": "USA",
            "position": {
                "lat": 35.23722222,
                "lng": -120.6425
            }
        }, {
            "codes": ["SDP"],
            "city": "Sand Point, AK",
            "country": "USA",
            "position": {
                "lat": 55.31361111,
                "lng": -160.5213889
            }
        }, {
            "codes": ["YZP"],
            "city": "Sandspit, Queen Charlotte Islands, BC",
            "country": "Canada"
        }, {
            "codes": ["SBA"],
            "city": "Santa Barbara, CA",
            "country": "USA",
            "position": {
                "lat": 34.42611111,
                "lng": -119.8413889
            }
        }, {
            "codes": ["SAF"],
            "city": "Santa Fe, NM",
            "country": "USA",
            "position": {
                "lat": 35.61722222,
                "lng": -106.0894444
            }
        }, {
            "codes": ["SMX"],
            "city": "Santa Maria, CA",
            "country": "USA",
            "position": {
                "lat": 34.89888889,
                "lng": -120.4575
            }
        }, {
            "codes": ["STS"],
            "city": "Santa Rosa, CA",
            "country": "USA",
            "position": {
                "lat": 38.50888889,
                "lng": -122.8127778
            }
        }, {
            "codes": ["SLK"],
            "city": "Saranac Lake, NY",
            "country": "USA",
            "position": {
                "lat": 44.38527778,
                "lng": -74.20611111
            }
        }, {
            "codes": ["SRQ"],
            "city": "Sarasota, FL",
            "country": "USA",
            "position": {
                "lat": 27.39544444,
                "lng": -82.55444444
            }
        }, {
            "codes": ["YZR"],
            "city": "Sarnia, ON",
            "country": "Canada"
        }, {
            "codes": ["YXE"],
            "city": "Saskatoon, SK",
            "country": "Canada"
        }, {
            "codes": ["CIU"],
            "city": "Sault Ste. Marie, MI",
            "country": "USA",
            "position": {
                "lat": 46.25083333,
                "lng": -84.4725
            }
        }, {
            "codes": ["YAM"],
            "city": "Sault Ste. Marie, ON",
            "country": "Canada"
        }, {
            "codes": ["SAV"],
            "city": "Savannah, GA",
            "country": "USA",
            "position": {
                "lat": 32.1275,
                "lng": -81.20222222
            }
        }, {
            "codes": ["BFF"],
            "city": "Scottsbluff, NE",
            "country": "USA",
            "position": {
                "lat": 41.87388889,
                "lng": -103.5955556
            }
        }, {
            "codes": ["SEA"],
            "city": "Seattle, WA",
            "country": "USA",
            "position": {
                "lat": 47.45,
                "lng": -122.3116667
            }
        }, {
            "codes": ["YZV"],
            "city": "Sept-Iles, QC",
            "country": "Canada"
        }, {
            "codes": ["SHD"],
            "city": "Shenandoah Valley Airport, VA",
            "country": "USA",
            "position": {
                "lat": 38.26388889,
                "lng": -78.89638889
            }
        }, {
            "codes": ["SHR"],
            "city": "Sheridan, WY",
            "country": "USA",
            "position": {
                "lat": 44.76916667,
                "lng": -106.9802778
            }
        }, {
            "codes": ["SHV"],
            "city": "Shreveport, LA",
            "country": "USA",
            "position": {
                "lat": 32.44666667,
                "lng": -93.82555556
            }
        }, {
            "codes": ["SDY"],
            "city": "Sidney, MT",
            "country": "USA",
            "position": {
                "lat": 47.70694444,
                "lng": -104.1925
            }
        }, {
            "codes": ["SVC"],
            "city": "Silver City, NM",
            "country": "USA",
            "position": {
                "lat": 32.63666667,
                "lng": -108.1563889
            }
        }, {
            "codes": ["SUX"],
            "city": "Sioux City, IA",
            "country": "USA",
            "position": {
                "lat": 42.4025,
                "lng": -96.38444444
            }
        }, {
            "codes": ["FSD"],
            "city": "Sioux Falls, SD",
            "country": "USA",
            "position": {
                "lat": 43.58194444,
                "lng": -96.74194444
            }
        }, {
            "codes": ["YXL"],
            "city": "Sioux Lookout, ON",
            "country": "Canada"
        }, {
            "codes": ["SIT"],
            "city": "Sitka, AK",
            "country": "USA",
            "position": {
                "lat": 57.04722222,
                "lng": -135.3616667
            }
        }, {
            "codes": ["SGY"],
            "city": "Skagway, AK",
            "country": "USA",
            "position": {
                "lat": 59.46,
                "lng": -135.3155556
            }
        }, {
            "codes": ["YYD"],
            "city": "Smithers, BC",
            "country": "Canada"
        }, {
            "codes": ["SRY"],
            "city": "Soria",
            "country": "Spain"
        }, {
            "codes": ["SBN"],
            "city": "South Bend, IN",
            "country": "USA",
            "position": {
                "lat": 41.70833333,
                "lng": -86.31722222
            }
        }, {
            "codes": ["GEG"],
            "city": "Spokane, WA",
            "country": "USA",
            "position": {
                "lat": 47.62,
                "lng": -117.5338889
            }
        }, {
            "codes": ["SPI"],
            "city": "Springfield, IL",
            "country": "USA",
            "position": {
                "lat": 39.84416667,
                "lng": -89.67805556
            }
        }, {
            "codes": ["CEF"],
            "city": "Springfield, MA",
            "country": "USA",
            "position": {
                "lat": 42.19388889,
                "lng": -72.53472222
            }
        }, {
            "codes": ["SGF"],
            "city": "Springfield, MO",
            "country": "USA",
            "position": {
                "lat": 37.24555556,
                "lng": -93.38861111
            }
        }, {
            "codes": ["VSF"],
            "city": "Springfield, VT",
            "country": "USA",
            "position": {
                "lat": 43.34361111,
                "lng": -72.51722222
            }
        }, {
            "codes": ["STC"],
            "city": "St. Cloud, MN",
            "country": "USA",
            "position": {
                "lat": 45.54666667,
                "lng": -94.06
            }
        }, {
            "codes": ["SGU"],
            "city": "St. George, UT",
            "country": "USA",
            "position": {
                "lat": 37.09055556,
                "lng": -113.5930556
            }
        }, {
            "codes": ["YYT"],
            "city": "St. John's, NF",
            "country": "Canada"
        }, {
            "codes": ["STL"],
            "city": "St. Louis, MO",
            "country": "USA",
            "position": {
                "lat": 38.74861111,
                "lng": -90.37
            }
        }, {
            "codes": ["PIE"],
            "city": "St. Petersburg, FL",
            "country": "USA",
            "position": {
                "lat": 27.91,
                "lng": -82.6875
            }
        }, {
            "codes": ["SCE"],
            "city": "State College, PA",
            "country": "USA"
        }, {
            "codes": ["SBS"],
            "city": "Steamboat Springs, CO",
            "country": "USA",
            "position": {
                "lat": 40.51611111,
                "lng": -106.8663889
            }
        }, {
            "codes": ["YSB"],
            "city": "Sudbury, ON",
            "country": "Canada"
        }, {
            "codes": ["SUN"],
            "city": "Sun Valley, ID",
            "country": "USA",
            "position": {
                "lat": 43.50388889,
                "lng": -114.2955556
            }
        }, {
            "codes": ["YQY"],
            "city": "Sydney, Cape Breton Island, NS",
            "country": "Canada"
        }, {
            "codes": ["TLH"],
            "city": "Tallahassee, FL",
            "country": "USA",
            "position": {
                "lat": 30.39666667,
                "lng": -84.35027778
            }
        }, {
            "codes": ["TPA"],
            "city": "Tampa, FL",
            "country": "USA",
            "position": {
                "lat": 27.97555556,
                "lng": -82.53333333
            }
        }, {
            "codes": ["YXT"],
            "city": "Terrace, BC",
            "country": "Canada"
        }, {
            "codes": ["TXK"],
            "city": "Texarkana, AR",
            "country": "USA",
            "position": {
                "lat": 33.45361111,
                "lng": -93.99111111
            }
        }, {
            "codes": ["TVF"],
            "city": "Thief River Falls, MN",
            "country": "USA",
            "position": {
                "lat": 48.06555556,
                "lng": -96.185
            }
        }, {
            "codes": ["YTH"],
            "city": "Thompson, MB",
            "country": "Canada"
        }, {
            "codes": ["YQT"],
            "city": "Thunder Bay, ON",
            "country": "Canada"
        }, {
            "codes": ["YTS"],
            "city": "Timmins, ON",
            "country": "Canada"
        }, {
            "codes": ["OOK"],
            "city": "Toksook Bay, AK",
            "country": "USA",
            "position": {
                "lat": 60.54138889,
                "lng": -165.0872222
            }
        }, {
            "codes": ["TAX"],
            "city": "Tokyo",
            "country": "Japan"
        }, {
            "codes": ["TOL"],
            "city": "Toledo, OH",
            "country": "USA",
            "position": {
                "lat": 41.58666667,
                "lng": -83.80777778
            }
        }, {
            "codes": ["TOP"],
            "city": "Topeka, KS",
            "country": "USA",
            "position": {
                "lat": 39.06861111,
                "lng": -95.6225
            }
        }, {
            "codes": ["YYZ", "YTZ"],
            "city": "Toronto, ON",
            "country": "Canada"
        }, {
            "codes": ["TVC"],
            "city": "Traverse City, MI",
            "country": "USA",
            "position": {
                "lat": 44.74166667,
                "lng": -85.58222222
            }
        }, {
            "codes": ["TTN"],
            "city": "Trenton, NJ",
            "country": "USA",
            "position": {
                "lat": 40.27666667,
                "lng": -74.81333333
            }
        }, {
            "codes": ["TUS"],
            "city": "Tucson, AZ",
            "country": "USA",
            "position": {
                "lat": 32.11611111,
                "lng": -110.9411111
            }
        }, {
            "codes": ["TUL"],
            "city": "Tulsa, OK",
            "country": "USA",
            "position": {
                "lat": 36.19833333,
                "lng": -95.88805556
            }
        }, {
            "codes": ["TUP"],
            "city": "Tupelo, MS",
            "country": "USA",
            "position": {
                "lat": 34.26805556,
                "lng": -88.77
            }
        }, {
            "codes": ["TWF"],
            "city": "Twin Falls, ID",
            "country": "USA",
            "position": {
                "lat": 42.48166667,
                "lng": -114.4877778
            }
        }, {
            "codes": ["TYR"],
            "city": "Tyler, TX",
            "country": "USA",
            "position": {
                "lat": 32.35416667,
                "lng": -95.4025
            }
        }, {
            "codes": ["UNK"],
            "city": "Unalakleet, AK",
            "country": "USA",
            "position": {
                "lat": 63.88833333,
                "lng": -160.7988889
            }
        }, {
            "codes": ["EGE"],
            "city": "Vail, CO",
            "country": "USA",
            "position": {
                "lat": 39.64138889,
                "lng": -106.9175
            }
        }, {
            "codes": ["YVO"],
            "city": "Val-d'Or, QC",
            "country": "Canada"
        }, {
            "codes": ["VDZ"],
            "city": "Valdez, AK",
            "country": "USA",
            "position": {
                "lat": 61.13388889,
                "lng": -146.2483333
            }
        }, {
            "codes": ["VLD"],
            "city": "Valdosta, GA",
            "country": "USA",
            "position": {
                "lat": 30.78138889,
                "lng": -83.27611111
            }
        }, {
            "codes": ["YVR"],
            "city": "Vancouver, BC",
            "country": "Canada"
        }, {
            "codes": ["YYJ"],
            "city": "Victoria, BC",
            "country": "Canada"
        }, {
            "codes": ["VCT"],
            "city": "Victoria, TX",
            "country": "USA",
            "position": {
                "lat": 28.8525,
                "lng": -96.91861111
            }
        }, {
            "codes": ["VIS"],
            "city": "Visalia, CA",
            "country": "USA",
            "position": {
                "lat": 36.31861111,
                "lng": -119.3927778
            }
        }, {
            "codes": ["YWK"],
            "city": "Wabush, Labrador, NF",
            "country": "Canada"
        }, {
            "codes": ["ACT"],
            "city": "Waco, TX",
            "country": "USA",
            "position": {
                "lat": 31.61138889,
                "lng": -97.23055556
            }
        }, {
            "codes": ["ALW"],
            "city": "Walla Walla, WA",
            "country": "USA",
            "position": {
                "lat": 46.09472222,
                "lng": -118.2888889
            }
        }, {
            "codes": ["WAS"],
            "city": "Washington, DC",
            "country": "United States"
        }, {
            "codes": ["ALO"],
            "city": "Waterloo, IA",
            "country": "USA",
            "position": {
                "lat": 42.55722222,
                "lng": -92.40027778
            }
        }, {
            "codes": ["ART"],
            "city": "Watertown, NY",
            "country": "USA",
            "position": {
                "lat": 43.99194444,
                "lng": -76.02166667
            }
        }, {
            "codes": ["ATY"],
            "city": "Watertown, SD",
            "country": "USA",
            "position": {
                "lat": 44.91388889,
                "lng": -97.15472222
            }
        }, {
            "codes": ["CWA"],
            "city": "Wausau, WI",
            "country": "USA",
            "position": {
                "lat": 44.7775,
                "lng": -89.66666667
            }
        }, {
            "codes": ["EAT"],
            "city": "Wenatchee, WA",
            "country": "USA",
            "position": {
                "lat": 47.39805556,
                "lng": -120.2058333
            }
        }, {
            "codes": ["PBI"],
            "city": "West Palm Beach, FL",
            "country": "USA",
            "position": {
                "lat": 26.68316667,
                "lng": -80.09555556
            }
        }, {
            "codes": ["WYS"],
            "city": "West Yellowstone, MT",
            "country": "USA",
            "position": {
                "lat": 44.68833333,
                "lng": -111.1177778
            }
        }, {
            "codes": ["HPN"],
            "city": "White Plains, NY",
            "country": "USA",
            "position": {
                "lat": 41.06694444,
                "lng": -73.7075
            }
        }, {
            "codes": ["YXY"],
            "city": "Whitehorse, YT",
            "country": "Canada"
        }, {
            "codes": ["SPS"],
            "city": "Wichita Falls, TX",
            "country": "USA",
            "position": {
                "lat": 33.98888889,
                "lng": -98.49194444
            }
        }, {
            "codes": ["ICT"],
            "city": "Wichita, KS",
            "country": "USA",
            "position": {
                "lat": 37.65,
                "lng": -97.43305556
            }
        }, {
            "codes": ["AVP"],
            "city": "Wilkes-Barre, PA",
            "country": "USA",
            "position": {
                "lat": 41.33833333,
                "lng": -75.72333333
            }
        }, {
            "codes": ["YWL"],
            "city": "Williams Lake, BC",
            "country": "Canada"
        }, {
            "codes": ["IPT"],
            "city": "Williamsport, PA",
            "country": "USA",
            "position": {
                "lat": 41.24194444,
                "lng": -76.92111111
            }
        }, {
            "codes": ["ISN"],
            "city": "Williston, ND",
            "country": "USA",
            "position": {
                "lat": 48.17805556,
                "lng": -103.6422222
            }
        }, {
            "codes": ["ILG"],
            "city": "Wilmington, DE",
            "country": "USA",
            "position": {
                "lat": 39.67861111,
                "lng": -75.60666667
            }
        }, {
            "codes": ["ILM"],
            "city": "Wilmington, NC",
            "country": "USA",
            "position": {
                "lat": 34.27055556,
                "lng": -77.9025
            }
        }, {
            "codes": ["YQG"],
            "city": "Windsor, ON",
            "country": "Canada"
        }, {
            "codes": ["YWG"],
            "city": "Winnipeg, MB",
            "country": "Canada"
        }, {
            "codes": ["OLF"],
            "city": "Wolf Point, MT",
            "country": "USA",
            "position": {
                "lat": 48.09444444,
                "lng": -105.575
            }
        }, {
            "codes": ["WRL"],
            "city": "Worland, WY",
            "country": "USA",
            "position": {
                "lat": 43.96583333,
                "lng": -107.9508333
            }
        }, {
            "codes": ["WRG"],
            "city": "Wrangell, AK",
            "country": "USA",
            "position": {
                "lat": 56.48444444,
                "lng": -132.3697222
            }
        }, {
            "codes": ["YKM"],
            "city": "Yakima, WA",
            "country": "USA",
            "position": {
                "lat": 46.56805556,
                "lng": -120.5441667
            }
        }, {
            "codes": ["YAK"],
            "city": "Yakutat, AK",
            "country": "USA",
            "position": {
                "lat": 59.50333333,
                "lng": -139.6602778
            }
        }, {
            "codes": ["YZF"],
            "city": "Yellowknife, NWT",
            "country": "Canada"
        }, {
            "codes": ["YEO"],
            "city": "Yeosu",
            "country": "South Korea"
        }, {
            "codes": ["YUM"],
            "city": "Yuma, AZ",
            "country": "USA"
        }]);
    });

    return router;
};
