/* File: <name> is based on an example (in the public domain) from:
 * https://github.com/arduino-libraries/WiFiNINA/blob/master/examples/WiFiWebClientRepeating/WiFiWebClientRepeating.ino
 * Sketch will connect to a webserver and makes a POST request using
 * a WiFi equipped Arduino board.
 * note: future iterations of client/server code may use reference:
 * https://docs.arduino.cc/tutorials/nano-rp2040-connect/rp2040-ap-web-server-rgb
 */
#include <SPI.h>
#include <WiFiNINA.h>

#include "arduino_secrets.h" 

// comment out the line below to turn off debug printouts
#define DEBUG 0

WiFiClient client;

// WiFi credentials should be saved in "arduino_secrets.h"
char ssid[] = SECRET_SSID; 
char pass[] = SECRET_PASS;  

//char server[] = "example.org";
IPAddress server(54,176,246,75); // update public IP from server when EC2 instance is reset

unsigned long lastConnectionTime = 0;            // last time you connected to the server, in milliseconds
const unsigned long postingInterval = 10L * 1000L; // delay between updates, in milliseconds

int status = WL_IDLE_STATUS;

void printSerialMsg(const char * msg) {
  #ifdef DEBUG
  if (Serial) {
    Serial.println(msg);
  }
  #endif
}

void setup() {
  #ifdef DEBUG
  Serial.begin(9600);
  while (!Serial);
  Serial.println("Started");
  #endif

  delay(2000);

  // check for the WiFi module:
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("Communication with WiFi module has failed! :(");
    // don't continue
    while(true);
  }

  String fv = WiFi.firmwareVersion();
  if (fv < WIFI_FIRMWARE_LATEST_VERSION) {
    Serial.println("Please upgrade the WiFi firmware. >:( (https://docs.arduino.cc/tutorials/nano-rp2040-connect/rp2040-upgrading-nina-firmware)");
  }

  // attempt connection to WiFi network
  while (status != WL_CONNECTED){
  Serial.print("Attempting to connect to SSID: "); Serial.println(ssid);
  status = WiFi.begin(ssid, pass);  // modify if connecting to WEP or open network
  delay(10000);   // wait 10s for connection
  }
  
  // connection is successful
  printWifiStatus();  // printing out the status

}

void loop() {
  // put your main code here, to run repeatedly:
  // print incoming server data to serial port
  #ifdef DEBUG
  while (client.available()){
    char c = client.read();
    Serial.write(c);
  }
  #endif  

  // check if 10s have passed since last connected
  // then connect again and send data:
  if (millis() - lastConnectionTime > postingInterval) {
    httpRequest();
  }
}

/* httpRequest makes an HTTP connection to the
 * server
 */
void httpRequest() {
  // close any connection before send a new request.
  // This will free the socket on the NINA module
  client.stop();

  // if there's a successful connection:
  if (client.connect(server, 3000)) {
    Serial.println("connecting...");
    // send the HTTP GET request:
    client.println("GET / HTTP/1.1"); // makes a get to the root of the server
    client.println("Host: 54.176.246.75");
    client.println("User-Agent: ArduinoWiFi/1.1");
    client.println("Connection: close");
    client.println();

    // note the time that the connection was made:
    lastConnectionTime = millis();
  } else {
    // if you couldn't make a connection:
    Serial.println("connection failed");
  }
}


void printWifiStatus() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your board's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}