using System.Collections.Generic;
using System.Linq;
using System;
using thePencaneta.Models;

namespace thePencaneta.ViewModels {

    public class MessageViewModel {

        public readonly MessageService messageService;

        public string Id { get; set; }
        public string Message { get; set; }
        public string From { get; set; }
        public IEnumerable<Message> MessagesList;

        public MessageViewModel() {
           this.messageService = new MessageService();
           Init();
        }

        private async void Init() {
            MessagesList = new List<Message>();
            try {
              //  messageService.ReceiveMessage(GetMessage);
                await messageService.Connect();
            }
            catch (Exception) {
                throw;
            }
        }

        private void GetMessage(string userName, string message) {
            AddMessage(userName, message);
        }

        private void AddMessage(string userName, string message) {
            var tempList = MessagesList.ToList();
            tempList.Add(new Message { Description = message, From = userName });
            MessagesList = new List<Message>(tempList);
            Message = string.Empty;
        }

    }
}
