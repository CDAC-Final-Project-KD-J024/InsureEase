using Insure_ease_backend_ms.net.Models;

namespace Insure_ease_backend_ms.net.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public double Amount { get; set; }
        public string Status { get; set; } // 'Completed', 'Pending', 'Failed'
        public DateTime Date { get; set; }
        public string TransactionId { get; set; } // Unique Transaction ID

        public virtual Cart Cart { get; set; }
    }
}
