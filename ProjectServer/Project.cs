

using YamlDotNet.Core.Events;
using YamlDotNet.Serialization;

public class Project 
{
    public string? Id {get; set;}

    public string? Name {get; set;}

    public string? Title {get; set;}

    public string? Directory {get; set;}

    public string? ThumbnailPath() => Path.Join(this.Directory, "thumbnail.png");
    public string? PreviewPath() => Path.Join(this.Directory, "preview.jpg");
    public string? HeaderPath() => Path.Join(this.Directory, "header.jpg");

    public List<ProjectSection> Sections {get; set;} = new List<ProjectSection>();

    public List<string> Categories {get; set;} = new List<string>();
}