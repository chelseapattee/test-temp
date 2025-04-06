using System.Text.Json;
using System.Text.Json.Serialization;

namespace ProjectServer;

public class ProjectSectionJsonConverter : JsonConverter<ProjectSection>
{
    public override ProjectSection? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        throw new NotImplementedException();
    }

    public override void Write(Utf8JsonWriter writer, ProjectSection value, JsonSerializerOptions options)
    {
        writer.WriteStartObject();
        writer.WriteEndObject();
    }
}
