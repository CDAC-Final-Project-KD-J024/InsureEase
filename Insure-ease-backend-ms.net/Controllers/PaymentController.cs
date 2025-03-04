using Insure_ease_backend_ms.Models;
using Insure_ease_backend_ms.net.Models;
using Microsoft.AspNetCore.Mvc;

namespace Insure_ease_backend_ms.net.Controllers
{
   [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PaymentController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult ProcessPayment([FromBody] Payment payment)
        {
            if (payment == null)
                return BadRequest("Invalid payment details.");

            // Add payment to the database
            _context.Payments.Add(payment);
            _context.SaveChanges();

            return Ok(payment); // Return the saved payment record
        }
    }
}
