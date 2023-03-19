using Microsoft.AspNetCore.SignalR;

namespace simple_rsa_chat_room
{
  public class ChatHub : Hub
  {
    public async Task SendMessage(string user, string message)
    {
      Console.WriteLine(message);
      await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
  }
}
