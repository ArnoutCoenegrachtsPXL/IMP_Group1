using System.Text.Json.Serialization;
using AutoMapper;
using backend_NET.Models;
using backend_NET.Models.MapperProfiles;
using Microsoft.Extensions.DependencyInjection;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowVueApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5203") // Your Vue app's address
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
    });
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddSingleton<IMeterReadingRepository, MeterReadingMockRepository>();
builder.Services.AddSingleton<IUserRepository, UserMockRepository>();

builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddProfile<MeterReadingProfile>();
});


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(options =>
{
    options.AddPolicy("DevPolicy", policy =>
    {
        policy.AllowAnyOrigin()  // This allows ANY port/origin
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


var app = builder.Build();



if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("DevPolicy");
app.UseAuthorization();
//app.UseCors("AllowSpecificOrigin");

app.MapControllers();

app.Run();
