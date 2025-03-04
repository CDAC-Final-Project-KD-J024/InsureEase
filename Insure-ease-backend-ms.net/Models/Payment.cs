namespace Insure_ease_backend_ms.net.Models
{
    public class Payment
    {
        public int Id { get; set; }
        public int CartId { get; set; }
        public double Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public string PaymentMethod { get; set; } // E.g., 'Credit Card', 'PayPal'
        public string Status { get; set; } // E.g., 'Successful', 'Failed'

        public virtual Cart Cart { get; set; }
    }
}
