void send_webpage(WiFiClient client)
{
  // HTTP headers always start with a response code (e.g. HTTP/1.1 200 OK)
  // and a content-type so the client knows what's coming, then a blank line:
  client.println("HTTP/1.1 200 OK");
  client.println("Content-type:text/html");
  client.println();
  client.print("<div class='container'>");
  client.print("<form>");
  client.print("<label for='ssid'>WiFi Name To Connect To</label><br>");
  client.print("<input type='text' id='ssid' name='ssid'><br>");
  client.print("<label for='pass'>WiFi Password</label><br>");
  client.print("<input type='text' id='pass' name='pass'><br>");
  client.print("<input type='submit'><br>");
  client.print("</form>");
  client.print("</div>");

  // The HTTP response ends with another blank line:
  client.println();
}

void send_exit_webpage(WiFiClient client)
{
  client.println("HTTP/1.1 200 OK");
  client.println("Content-type:text/html");
  client.println();
  client.print("<div class='container'>");
  client.print("Thank you. The Arduino will connect to the wifi shortly");
  client.print("</div>");
}
