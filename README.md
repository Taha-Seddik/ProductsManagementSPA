# Intro 
This project is Products management system built using ASP.NET Core app / React template with Docker support.
Database is filled with data after application start.

I did configure database container in docker-compose.yml 

![image](https://github.com/Taha-Seddik/ProductsManagementSPA/assets/16271638/a3637fc7-f64a-4708-85da-55e21d9c6dd2)

# Design Patterns
- CQRS design pattern
- Mediator design pattern
- Repository design pattern
- Dependency Injection pattern

# Prerequisites
- Docker Desktop

# Environment 
- .NET 8
- Entityframework Core
- Automapper
- FluentValidation
- Swagger

# How to run
1- Server API:
After starting Docker desktop we could run the Server API in debugg mode
![image](https://github.com/Taha-Seddik/ProductsManagementSPA/assets/16271638/c6d49822-4aa4-4e98-bb77-b6f2f96b4597)

2- Frontend:
The frontend project can be run separately 
> cd ProductManagementSystem\productmanagementsystem.client
> 
> npm install
> 
> npm run dev

# Solution projects 
- ProductManagementSystem.Domain: Contains domain models
- ProductManagementSystem.Application: Contains Interfaces and Commands/Queries along with handlers and validators
- ProductManagementSystem.Infrastructure: Contains database related logic with data seeding
- ProductManagementSystem.Server: Contains API Controllers
- productmanagementsystem.client: Contains ReactJS application

# Screenshots 

1- Dashboard: chart for each category along with the count of related products

![image](https://github.com/Taha-Seddik/ProductsManagementSPA/assets/16271638/2969a918-ac36-4bc4-9df3-15aeb7309162)

2- Products Page: Filter by category and do search 

![image](https://github.com/Taha-Seddik/ProductsManagementSPA/assets/16271638/75b30c2e-6b9d-4584-9720-0efcbf229d14)

3- Create Product page

![image](https://github.com/Taha-Seddik/ProductsManagementSPA/assets/16271638/2f0785d0-794e-4a41-99eb-d780946042cf)
