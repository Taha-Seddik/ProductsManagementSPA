using MediatR;
using Microsoft.AspNetCore.Mvc;
using ProductManagementSystem.Application.Features.Categories.GetOneOrMany;
using ProductManagementSystem.Application.Features.Categories.Create;
using ProductManagementSystem.Application.Features.Categories.Update;
using ProductManagementSystem.Application.Features.Categories.Delete;

namespace CategoryManagementSystem.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly IMediator _mediator;

    public CategoriesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAsync()
    {
        var response = await _mediator.Send(new ListAllCategorysQuery());
        return Ok(response);
    }

    [HttpGet("{categoryId}")]
    public async Task<IActionResult> GetOneAsync([FromRoute] int categoryId)
    {
        var response = await _mediator.Send(new GetOneCategoryQuery() { CategoryId = categoryId });
        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCategory(CreateCategoryCommand payload)
    {
        var newlyCreatedCategoryId = await _mediator.Send(payload);
        return Ok(newlyCreatedCategoryId);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateCategory(UpdateCategoryCommand payload)
    {
        await _mediator.Send(payload);
        return Ok();
    }

    [HttpDelete("{categoryId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> DeleteCategory([FromRoute] int categoryId)
    {
        var payload = new DeleteCategoryCommand()
        {
            CategoryId = categoryId
        };
        await _mediator.Send(payload);
        return Ok();
    }
}