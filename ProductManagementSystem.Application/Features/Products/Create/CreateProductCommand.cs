using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using ProductManagementSystem.Application.Common.Interfaces;
using ProductManagementSystem.Domain.Entities;

namespace ProductManagementSystem.Application.Features.Products.Create;

public class CreateProductCommand : IRequest<int>
{
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Password { get; set; }
    public string JobTitle { get; set; }
    public DateTimeOffset JoiningDate { get; set; }
}

public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, int>
{
    private readonly IMapper _mapper;
    private readonly IProductsRepository _productsRepo;
    private readonly UserManager<ApplicationUser> _userManager;

    public CreateProductCommandHandler(IProductsRepository productsRepo, IMapper mapper, UserManager<ApplicationUser> userManager)
    {
        _productsRepo = productsRepo;
        _mapper = mapper;
        _userManager = userManager;
    }

    public async Task<int> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        throw new Exception("Not implemented");
        // add user infos
        /*var newUser = new ApplicationUser
        {
            UserName = request.Email,
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName
        };
        var result = await _userManager.CreateAsync(newUser, request.Password);
        if (!result.Succeeded)
        {
            var msg = string.Join(", ", result.Errors.Select(x => x.Description));
            throw new InvalidOperationException(msg);
        }
        await _userManager.AddToRoleAsync(newUser, "User");

        // create product
        var newProduct = _mapper.Map<Product>(request);
        newProduct.UserId = newUser.Id; // setup userId
        newProduct = await _productsRepo.AddAsync(newProduct, cancellationToken);

        return newProduct.Id;*/
    }
}

