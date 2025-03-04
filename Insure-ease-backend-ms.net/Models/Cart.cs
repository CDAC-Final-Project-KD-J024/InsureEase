using Insure_ease_backend_ms.net.Models;

namespace Insure_ease_backend_ms.net.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string CartItems { get; set; } // Could be a JSON or a list of item IDs
        public double TotalAmount { get; set; }

        public virtual List<Payment> Payments { get; set; }
    }
}
