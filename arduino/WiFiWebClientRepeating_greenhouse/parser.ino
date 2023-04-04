#include <string.h>

int getSSIDAndPass(char *client_msg, int client_msg_len, char **ssid, char **pass)
{
  char temp_ssid[client_msg_len];
  char temp_pass[client_msg_len];
  char client_msg_cpy[client_msg_len];


  // make copy of client_msg
  strcpy(client_msg_cpy, client_msg);

  for (int i=0; i<client_msg_len; i++)
  {

  }
}