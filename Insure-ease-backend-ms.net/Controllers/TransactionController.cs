using Insure_ease_backend_ms.Models;
using Insure_ease_backend_ms.net.Models;
using Microsoft.AspNetCore.Mvc;

namespace Insure_ease_backend_ms.net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TransactionController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult CreateTransaction([FromBody] Transaction transaction)
        {
            if (transaction == null)
                return BadRequest("Invalid transaction details.");

            // Add the transaction to the database
            _context.Transactions.Add(transaction);
            _context.SaveChanges();

            return Ok(transaction); // Return the saved transaction record
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetTransactionsByUser(int userId)
        {
            var transactions = _context.Transactions.Where(t => t.UserId == userId).ToList();
            if (transactions.Count == 0)
                return NotFound("No transactions found for this user.");

            return Ok(transactions);
        }
    }
}
