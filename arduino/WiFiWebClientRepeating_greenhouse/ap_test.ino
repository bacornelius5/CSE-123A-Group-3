/* Includes */
#include <SPI.h>
#include <WiFiNINA.h>
#include <string.h>

/* Globals */
char ssid[] = "test_ap_arduino";
char pass[] = "12345678";
char *targetssid = NULL;
char *targetpass = NULL;

/* Wifi setup stuff */
int status = WL_IDLE_STATUS;
WiFiServer server(80);


void setup()
{
  // Initialize serial and wait for port to open
  Serial.begin(9600);
  while (!Serial);
  Serial.print("Access Point Online");

  // init wifi module and broadcast connection
  setupWifi(&server, ssid, pass);
}

void loop() {
  // handle client connection and get ssid and pass
  connect_to_wifi(status, targetssid, targetpass);


  // compare the previous status to the current status
  // if (status != WiFi.status()) {
  //   // it has changed update the variable
  //   status = WiFi.status();

  //   if (status == WL_AP_CONNECTED) {
  //     // a device has connected to the AP
  //     Serial.println("Device connected to AP");
  //   } else {
  //     // a device has disconnected from the AP, and we are back in listening mode
  //     Serial.println("Device disconnected from AP");
  //   }
  // }
  
  // WiFiClient client = server.available();   // listen for incoming clients

  // if (client) {                             // if you get a client,
  //   Serial.println("new client");           // print a message out the serial port
  //   String currentLine = "";                // make a String to hold incoming data from the client
  //   while (client.connected()) {            // loop while the client's connected
  //     delayMicroseconds(10);                // This is required for the Arduino Nano RP2040 Connect - otherwise it will loop so fast that SPI will never be served.
  //     if (client.available()) {             // if there's bytes to read from the client,
  //       char c = client.read();             // read a byte, then
  //       Serial.write(c);                    // print it out the serial monitor
  //       if (c == '\n') {                    // if the byte is a newline character

  //         // if the current line is blank, you got two newline characters in a row.
  //         // that's the end of the client HTTP request, so send a response:
  //         if (currentLine.length() == 0) {
  //           // HTTP headers always start with a response code (e.g. HTTP/1.1 200 OK)
  //           // and a content-type so the client knows what's coming, then a blank line:
  //           client.println("HTTP/1.1 200 OK");
  //           client.println("Content-type:text/html");
  //           client.println();

  //           // the content of the HTTP response follows the header:
  //             // client.println("HTTP/1.1 200 OK");
  //             // client.println("Content-type:text/html");
  //             // client.println();
  //             client.print("<div class='container'>");
  //             client.print("<form>");
  //             client.print("<label for='ssid'>WiFi Name To Connect To</label><br>");
  //             client.print("<input type='text' id='ssid' name='ssid'><br>");
  //             client.print("<label for='pass'>WiFi Password</label><br>");
  //             client.print("<input type='text' id='pass' name='pass'><br>");
  //             client.print("<input type='submit'><br>");
  //             client.print("</form>");
  //             client.print("</div>");

  //           // The HTTP response ends with another blank line:
  //           client.println();
  //           // break out of the while loop:
  //           break;
  //         }
  //         else {      // if you got a newline, then clear currentLine:
  //           currentLine = "";
  //         }
  //       }
  //       else if (c != '\r') {    // if you got anything else but a carriage return character,
  //         currentLine += c;      // add it to the end of the currentLine
  //       }

  //       // Check to see if the client request was "GET /H" or "GET /L":
  //       if (currentLine.endsWith("GET /H")) {
  //       }
  //       if (currentLine.endsWith("GET /L")) {
  //       }
  //     }
  //   }
  //   // close the connection:
  //   client.stop();
  //   Serial.println("client disconnected");
  // }
}
