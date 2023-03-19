using Microsoft.AspNetCore.SignalR;

namespace sinalr_nextjs_chat
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
