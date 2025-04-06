using YamlDotNet.Core;
using YamlDotNet.Core.Events;
using YamlDotNet.Serialization;

namespace ProjectServer;

public class ProjectYamlTypeConverter : IYamlTypeConverter
{
    public bool Accepts(Type type)
    {
        return type == typeof(Project);
    }

    public object? ReadYaml(IParser parser, Type type)
    {

        if (!parser.TryConsume<MappingStart>(out var _)) // You could also use parser.Accept<MappingStart>()
        {
            throw new InvalidDataException("Invalid YAML content.");
        }

        var result = new Project();
        do
        {
            string value;

            value = this.GetScalarValue(parser);
            parser.MoveNext(); // skip the scalar property name

            switch (value)
            {
                case nameof(Project.Id):
                    result.Name = this.GetScalarValue(parser);
                    break;
                case nameof(Project.Name):
                    result.Name = this.GetScalarValue(parser);
                    break;
                case nameof(Project.Title):
                    result.Title = this.GetScalarValue(parser);
                    break;
                case nameof(Project.Sections):
                    this.ReadSections(parser, result.Sections);
                    break;
                case nameof(Project.Categories):
                    this.ReadCategories(parser, result.Categories);
                    break;
            }
            parser.MoveNext();
        } while (parser.Current?.GetType() != typeof(MappingEnd));

        parser.MoveNext();

        return result;
    }

    private ProjectSection ReadSection(IParser parser)
    {
        if (!parser.TryConsume<MappingStart>(out var _)) // You could also use parser.Accept<MappingStart>()
        {
            throw new InvalidDataException("Invalid YAML content.");
        }

        var result = new ProjectSection();
        do
        {
            string value;

            value = this.GetScalarValue(parser);
            parser.MoveNext(); // skip the scalar property name

            switch (value)
            {
                case nameof(ProjectSection.Type):
                    result.Type = this.GetScalarValue(parser);
                    break;
                default: 
                    result.Attributes[value] = this.GetScalarValue(parser);
                    break;
            }
            parser.MoveNext();

        } while (parser.Current?.GetType() != typeof(MappingEnd));

        return result;
    }

    private void ReadCategories(IParser parser, List<String> categories)
    {
        if (!parser.TryConsume<SequenceStart>(out var _))
        {
            throw new InvalidDataException("Invalid YAML content.");
        }
        do
        {
            categories.Add(this.GetScalarValue(parser));
            parser.MoveNext();
        } while (parser.Current?.GetType() != typeof(SequenceEnd));
    }

    private void ReadSections(IParser parser, List<ProjectSection> sections)
    {
        if (!parser.TryConsume<SequenceStart>(out var _))
        {
            throw new InvalidDataException("Invalid YAML content.");
        }
        do
        {
            sections.Add(this.ReadSection(parser));
            parser.MoveNext();
        } while (parser.Current?.GetType() != typeof(SequenceEnd));
    }

    private string GetScalarValue(IParser parser)
    {
        Scalar scalar;

        scalar = parser.Current as Scalar;

        if (scalar == null)
        {
            throw new InvalidDataException("Failed to retrieve scalar value.");
        }

        // You could replace the above null check with parser.Expect<Scalar> which will throw its own exception
        return scalar.Value.Substring(0, 1).ToUpper() + scalar.Value.Substring(1).ToLower();
    }

    public void WriteYaml(IEmitter emitter, object? value, Type type)
    {
        var project = (Project)value!;
        emitter.Emit(new MappingStart(AnchorName.Empty, TagName.Empty, isImplicit: true, MappingStyle.Block));
        emitter.Emit(new Scalar(AnchorName.Empty, TagName.Empty, "id", ScalarStyle.Any, true, false));
        emitter.Emit(new Scalar(AnchorName.Empty, TagName.Empty, project.Id!, ScalarStyle.Any, true, false));
        emitter.Emit(new MappingEnd());
    }
}