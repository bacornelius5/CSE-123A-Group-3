
/*
 * Function   setupWifi
 * --------------------
 * Setup the wifi server. Place this funciton in the setup
 *  section of the arduino main file. Make sure to place
 *  this function after serial initialization. 
 *
 * server: The arduino server instance. The arduino will broadcast 
            as an access point from the server
 * ssid:   The ssid of the arduino access point
 * pass:   The password of the arduino access point
 *
 * return: 0 on success, -1 on error
 */
int setupWifi(WiFiServer *server, char ssid[], char pass[])
{
  // check for the WiFi module 
  if (WiFi.status() == WL_NO_MODULE)
  {
    Serial.println("Communication with WiFi module failed!");
    return -1;
  }

  // Get firmware version 
  String fv = WiFi.firmwareVersion();
  if (fv < WIFI_FIRMWARE_LATEST_VERSION)
  {
    Serial.println((String)fv+"Outdated. Please upgrade the firmware to"+WIFI_FIRMWARE_LATEST_VERSION);
  }
  Serial.println((String)"SSID: "+ ssid);
  Serial.println((String)"PASS: "+ pass);

  // Create open network. Change this line if 
  // you want to create an WEP network 
  status = WiFi.beginAP(ssid, pass);
  if (status != WL_AP_LISTENING) {
    Serial.println("Creating access point failed");
    return -1;
  }

  // Wait 5 (for internal setup) seconds 
  // then broadcast wifi
  delay(10000);
  (*server).begin();
  printWiFiStatus();

  return 0;
}


/* Function    print_device_conn
 * -----------------------------
 * Given a status number, print the
 *  status of the connected or not
 *  connected device (aka client).
 *
 * status: A number indicating the status.
 *          the status changes behind the
 *          scenes.
 *
 * return: None
 */
void print_device_conn(int *status)
{
  if (*status != WiFi.status()) {
    *status = WiFi.status();
    if (*status == WL_AP_CONNECTED) {
      Serial.println("Device connected to AP");
    } else  {
      Serial.println("Device disconnected from AP");
    }
  }
}


/* Function    recv_client_msg
 * ---------------------------
 * Given a client to listen to, look
 *  for a HTTP response header that 
 *  contains the ssid and pass of the 
 *  target wifi network
 *
 * client
 */
void recv_client_msg(WiFiClient client, char *ssid, char *pass)
{
  String data = "";

  while (!client.connected());
  while (!client.available());
  Serial.println("Ready To Read From Client");
  delayMicroseconds(20);

  while (true) {
    char c = client.read();
    Serial.print(c);
    if (c == '\n') {
      // see if data contains ssid and pass
      if (data.indexOf("ssid=") > 0 && data.indexOf("pass") > 0) {
        Serial.println("Data Found");

        // make two copies of data so strtok() can be used
        char copy[data.length()+1];  // +1 for null terminator
        data.toCharArray(copy, data.length());

        // find ssid in data (needle in haystack)
        char *tok;

        strtok(copy, "=");  // target ssid=
        tok = strtok(NULL, "&");
        ssid = (char *) calloc(strlen(tok)+1, sizeof(char));
        strcpy(ssid, tok);

        strtok(NULL, "=");
        tok = strtok(NULL, " ");
        pass = (char *) calloc(strlen(tok)+1, sizeof(char));
        strcpy(pass, tok);

        Serial.println("Strings copied");
        Serial.println(ssid);
        Serial.println(pass);
        return;
      } else {
        data = "";  // erase data
      }
    } else {
      data += c;
    }
  }
}

/* Function    send_webpage_to_client
 * ----------------------------------
 * Given a client, send the webpage that
 *  requests the client to provide a wifi
 *  network ssid and pass
 *
 * client: A client to send the webpage to
 *
 * return: None
 */
void send_webpage_to_client(WiFiClient client)
{
  // wait for client to connect
  while (!client.connected());
  while (!client.available());
  Serial.println("Client Ready To Recieve Webpage");

  delayMicroseconds(10);  // this delay may not be needed
  send_webpage(client);

  return;
}


/* Function    connect_to_wifi
 * ---------------------------
 * Powerhouse of the wifi connection. Listens
 *  for clients, sends clients the webpage to 
 *  submit login info, then uses that login 
 *  info to connect to a wifi network. Note 
 *  that the ssid and pass strings will be 
 *  malloc'd and must be free'd later.
 *
 * status: The status of the on-board wifi module. 
 *          Depricated and not needed
 * ssid:   String pointer where ssid will be stored
 * pass:   String pointer where pass will be stored
 *
 * return: None
 */
void connect_to_wifi(int status, char *ssid, char *pass)
{
  /*  Values for a case switch aka "state"
   *  0 = sending webpage
   *  1 = recieving client webpage response
   *  2 = gather ssid and pass of client wifi
  */
  int state = 0;
  WiFiClient client;

  for (;;) {  // i do not believe this for loop is necessary but more testing will need to be done
    print_device_conn(&status);

    switch (state) {
      case 0: { // send webpage
          Serial.println("In state 0");
          while ( !(client = server.available()) ); // loop until valid client
          send_webpage_to_client(client);
          client.stop();

          Serial.println("Exiting state 0");
          state++;
        }
        break;
      case 1: { // recieve client response
          Serial.println("In state 1");
          while ( !(client = server.available()) ); // loop until valid client
          char *msg = NULL;
          recv_client_msg(client, ssid, pass);
          send_exit_webpage(client);
          client.stop();
          WiFi.end();

          Serial.println("Exiting state 1");
          state++;
        }
        break;
      case 2: { // connect to client wifi
          Serial.println("Entering state 2");
          while(true);  // stop here for now until finished coding

          if (WiFi.begin(ssid, pass) != WL_CONNECTED) {
            // go back to state one and ask clients for wifi info
            Serial.println("Error connecting to given ssid and pass");
            state = 0;
            break;
          }
          delayMicroseconds(10000); // wait 10 seconds for connection
          Serial.println("Exiting state 2. Connected to wifi. DONE.");
          return;
        }
        break;
    }

  }
}

/* Function    printWiFiStatus
 * ---------------------------
 * Print the status of the wifi. Mainly
 *  used to print the ip to go to. Will not need
 *  to be used in production.
 *
 * return: None
 */
void printWiFiStatus() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print where to go in a browser:
  Serial.print("To see this page in action, open a browser to http://");
  Serial.println(ip);
}

