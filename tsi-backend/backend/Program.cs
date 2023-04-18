using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using backend.Data;
using backend.Hubs;
using backend.Auth;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.Options;
using backend.Mongo;
using backend.ApiSport;

//CORS
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

//Secret
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

//Base de Datos
builder.Services.AddDbContext<BackendContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AZURE_SQL_CONNECTIONSTRING") ?? throw new InvalidOperationException("Connection string 'backendContext' not found.")));

//Mongo
builder.Services.Configure<PencanetaMongoSettings>(builder.Configuration.GetSection("PencanetaMongoDatabase"));
builder.Services.AddSingleton<PaypalMongoService>();

//AutoMapper
builder.Services.AddAutoMapper(typeof(Program));

// Add services to the container.
builder.Services.AddScoped<IAuthService, AuthService>();

//ApiSport
builder.Services.Configure<ApiSportSettings>(builder.Configuration.GetSection("ApiSport"));
builder.Services.AddSingleton<IApiSportService, ApiSportService>();


// Cliente http
builder.Services.AddHttpClient();

// Controladores
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Backend API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins(new string[] { "http://localhost:5000", "http://localhost:3000", "https://lapencaneta.live", "https://www.lapencaneta.live", "https://pagos.lapencaneta.live", "http://lapencaneta.live", "http://lapencaneta.s3-website-us-east-1.amazonaws.com", "https://lapencaneta.uru-buy.me" })
                                             .AllowAnyHeader()
                                             .AllowAnyMethod()
                                             .AllowCredentials();
                      });
});

builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        //options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        //options.RoutePrefix = string.Empty;
    });
}

//CORS
app.UseCors(MyAllowSpecificOrigins);

//app.UseAuthorization();

app.UseMiddleware<JWTMiddleware>();

app.MapControllers();

app.MapHub<ChatHub>("/chatHub");



app.Run();
