using Microsoft.VisualBasic;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

namespace ProjectServer;

public class ProjectLoader
{
    private FileInfo BaseDirectory {get; set;} 
    private DateTime LastModified {get; set;} = DateTime.UnixEpoch;
    private IEnumerable<Project>? Projects {get; set;}
    private IDeserializer Deserializer {get; set;}
    private ReaderWriterLockSlim Lock {get; set;} = new ReaderWriterLockSlim();

    private Dictionary<string, ISet<string>> AssetMap {get; set;} = new Dictionary<string, ISet<string>>();

    public ProjectLoader(string path) {
        this.BaseDirectory = new FileInfo(path);
        this.Deserializer = new DeserializerBuilder()
            //.WithTypeConverter(new ProjectYamlTypeConverter())
            .WithNamingConvention(UnderscoredNamingConvention.Instance)
            .IgnoreUnmatchedProperties()
            .Build();
    }

    public IEnumerable<Project> GetProjects() {
        this.Lock.EnterReadLock();
        try
        {
            return this.Projects!;
        }
        finally
        {
            this.Lock.ExitReadLock();
        }
    } 

    public string? GetAsset(Project project, String asset) {
        if (this.AssetMap.TryGetValue(project.Id!, out var values) && values.Contains(asset)) {
            return Path.Combine(project.Directory!, "assets/", asset);
        } else {
            return null;
        }
    }

    private IEnumerable<FileInfo> GetAllFiles() => 
        Directory.EnumerateFiles(this.BaseDirectory.FullName, "project.yml", new EnumerationOptions()
        {
            RecurseSubdirectories = true
        }).Select(path => new FileInfo(path));

    private async Task<List<Project>> UpdateAsync(IEnumerable<FileInfo> files) {
        List<Project> projects = new List<Project>();

        foreach (FileInfo file in files)
        {
            var project = await this.ParseAsync(file);
            if (project != null) {
                projects.Add(project);
            }
        }

        return projects;
    }

    public async Task ScanAsync(CancellationToken cancellationToken)
    {
        var files = this.GetAllFiles();
        DateTime lastModified = this.GetLastModified(files);
        if (lastModified > this.LastModified)
        {
            Console.WriteLine("Updating Projects.");
            var projects = await this.UpdateAsync(files);
            try
            {
                this.Lock.EnterWriteLock();
                this.Projects = projects;
            }
            finally
            {
                this.Lock.ExitWriteLock();
            }
            this.LastModified = lastModified;
        }
        else 
        {
            Console.WriteLine("Not Updating Projects.");
        }
    }

    private async Task<Project> ParseAsync(FileInfo file) {
        var input = await File.ReadAllTextAsync(file.FullName);
        try
        {
            var project = this.Deserializer.Deserialize<Project>(input);
            project.Directory = file.Directory?.FullName;
            project.Id = file.Directory?.Name;

            this.ScanAssets(project);

            return project;
        }
        catch (Exception ec)
        {
            return null;
        }
    }

    private void ScanAssets(Project project) {
        var path = Path.Join(project.Directory, "assets");

        var assetDirectory = new DirectoryInfo(path);

        if (assetDirectory.Exists)
        {
            ISet<String> assets = Directory.EnumerateFiles(assetDirectory.FullName, "*", new EnumerationOptions()
            {
                RecurseSubdirectories = false
            }).Select(Path.GetFileName)
            .Where(x => x != null)
            .Select(x => x!)
            .ToHashSet();

            foreach (var asset in assets) {
                Console.WriteLine("[" + project.Id + "] Adding Asset: " + asset);
            }

            this.AssetMap[project.Id!] = assets;
        }

    }

    public DateTime GetLastModified(IEnumerable<FileInfo> files) {
        return files.Max(file => file.LastWriteTimeUtc);
    }
}
