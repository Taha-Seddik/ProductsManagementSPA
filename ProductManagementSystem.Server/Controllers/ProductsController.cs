using MediatR;
using Microsoft.AspNetCore.Mvc;
using ProductManagementSystem.Application.Features.Products.GetOneOrMany;
using ProductManagementSystem.Application.Features.Products.Create;
using ProductManagementSystem.Application.Features.Products.Update;
using ProductManagementSystem.Application.Features.Products.Delete;

namespace ProductManagementSystem.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ProductsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAsync()
    {
        var response = await _mediator.Send(new ListAllProductsQuery());
        return Ok(response);
    }

    [HttpGet("{productId}")]
    public async Task<IActionResult> GetOneAsync([FromRoute] string productId)
    {
        var response = await _mediator.Send(new GetOneProductQuery() { ProductId = productId });
        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> CreateProduct(CreateProductCommand payload)
    {
        var newlyCreatedProductId = await _mediator.Send(payload);
        return Ok(newlyCreatedProductId);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProduct(UpdateProductCommand payload)
    {
        await _mediator.Send(payload);
        return Ok();
    }

    [HttpDelete("{productId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> DeleteProduct([FromRoute] string productId)
    {
        var payload = new DeleteProductCommand()
        {
            ProductId = productId
        };
        await _mediator.Send(payload);
        return Ok();
    }
}

