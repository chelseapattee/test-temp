using System.Text.Json;
using ProjectServer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
    policy  =>
    {
        policy.WithOrigins("http://localhost:4200");
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyAllowSpecificOrigins);
app.UseHttpsRedirection();

var loader = new ProjectLoader("../Content");

var serializeOptions = new JsonSerializerOptions
{
    WriteIndented = true,
    Converters =
    {
        //new ProjectSectionJsonConverter()
    },
    PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower
};

var task = Task.Run(async () => await RepeatAsync(TimeSpan.FromSeconds(2), CancellationToken.None));

app.MapGet("/projects", () =>
{
    var projects = loader.GetProjects();
    var content = JsonSerializer.Serialize(projects, serializeOptions);
    return Results.Text(content, contentType: "application/json");
});

app.MapGet("/projects/{id}", (string id) =>
{
    var project = loader.GetProjects().SingleOrDefault(x => x.Id == id);

    if (project == null)
    {
        return Results.NotFound();
    }
    else
    {
        var content = JsonSerializer.Serialize(project, serializeOptions);
        return Results.Text(content, contentType: "application/json");
    }
});

app.MapGet("/projects/{id}/thumbnail", (string id) =>
{
    var project = loader.GetProjects().SingleOrDefault(x => x.Id == id);

    if (project == null)
    {
        return Results.NotFound();
    }
    else
    {
        return Results.File(project.ThumbnailPath()!, "image/jpeg");
    }
});

app.MapGet("/projects/{id}/preview", (string id) =>
{
    var project = loader.GetProjects().SingleOrDefault(x => x.Id == id);

    if (project == null)
    {
        return Results.NotFound();
    }
    else
    {
        return Results.File(project.PreviewPath()!, "image/jpeg");
    }
});

app.MapGet("/projects/{id}/assets/{name}", (string id, string name) =>
{
    var project = loader.GetProjects().SingleOrDefault(x => x.Id == id);

    if (project != null)
    {
        var asset = loader.GetAsset(project, name);
        if (asset != null) {
            return Results.File(asset, fileDownloadName: Path.GetFileName(asset));
        }
    }
    return Results.NotFound();
});

app.MapGet("/projects/{id}/header", (string id) =>
{
    var project = loader.GetProjects().SingleOrDefault(x => x.Id == id);

    if (project == null)
    {
        return Results.NotFound();
    }
    else
    {
        return Results.File(project.HeaderPath()!, "image/jpeg");
    }
});

app.Run();

async Task RepeatAsync(TimeSpan interval, CancellationToken cancellationToken)
{
    while (!cancellationToken.IsCancellationRequested)
    {
        await loader.ScanAsync(cancellationToken);
        await Task.Delay(interval, cancellationToken);
    }
}