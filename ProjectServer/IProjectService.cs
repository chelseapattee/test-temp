namespace ProjectServer;

public interface IProjectService
{
    public List<Project> Projects();
    public List<Project> ProjectById(string id);
}
