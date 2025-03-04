using Insure_ease_backend_ms.Models;
using Insure_ease_backend_ms.net.Models;
using Microsoft.AspNetCore.Mvc;

namespace Insure_ease_backend_ms.net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult AddToCart([FromBody] Cart cart)
        {
            if (cart == null)
                return BadRequest("Invalid cart details.");

            // Add the cart to the database
            _context.Carts.Add(cart);
            _context.SaveChanges();

            return Ok(cart); // Return the added cart
        }

        [HttpDelete("{cartId}")]
        public IActionResult RemoveFromCart(int cartId)
        {
            var cart = _context.Carts.FirstOrDefault(c => c.Id == cartId);
            if (cart == null)
                return NotFound("Cart not found.");

            _context.Carts.Remove(cart);
            _context.SaveChanges();

            return Ok("Cart item removed.");
        }
    }
}
