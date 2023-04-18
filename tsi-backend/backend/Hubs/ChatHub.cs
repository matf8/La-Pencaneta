using backend.Auth;
using backend.Data;
using backend.Entities;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace backend.Hubs
{

    public interface IChatClient
    {
        Task ReceiveMessage(string user, string message);
        Task RecibirNotificacion(string user, string message);
    }

    [Authorize]
    public class ChatHub : Hub<IChatClient>
    {
        private readonly BackendContext _context;

        public ChatHub(BackendContext context)
        {
            _context = context;
        }

        public override Task OnConnectedAsync()
        {
            var httpCtx = Context.GetHttpContext();
            
            var headers = httpCtx.Request.Headers;
            var test = Context.UserIdentifier;
            return base.OnConnectedAsync();
        }


        public async Task SendMessageToCaller(string user, string message)
        {
            await Clients.Caller.ReceiveMessage(user, message);
        }
        public async Task SendMessageToCallerAA(string user, string message)
        {
            await Clients.Users(user).ReceiveMessage(user, message);
        }

        public async Task EnviarStatusAUsuario(string user, string message)
        {
            var enviar = await _context.Mensaje.Where(x => x.Leido == false).CountAsync();

            await Clients.Caller.RecibirNotificacion(user, $"Tiene {enviar} mensajes");
        }

        public async Task EnviarMsjAUsuariosEmpresarial(string user, string message)
        {
            await Clients.Caller.RecibirNotificacion(user, message);
        }

        public async Task SendToAll(string user, string message)
        {
            await Clients.Caller.RecibirNotificacion(user, message);
        }



    }
}
