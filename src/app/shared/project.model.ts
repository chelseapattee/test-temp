import { Section } from './section.model';

export class Project {

    constructor(public id: string,
                public categories: string[],
                public title: string,
                public sections: Section[],
                public attributes: any,
              ) {
    }

    public static assetURL(project: Project, asset: string): string {
        return 'http://' + window.location.hostname + ':5081/projects/' + project.id + '/assets/' + asset;
    }
  
    public static thumbnailURL(project: Project): string {
        return 'http://' + window.location.hostname + ':5081/projects/' + project.id + '/thumbnail';
    }
  
    public static previewURL(project: Project): string {
        return 'http://' + window.location.hostname + ':5081/projects/' + project.id + '/preview';
    }
  
    public static headerURL(project: Project): string {
        return 'http://' + window.location.hostname + ':5081/projects/' + project.id + '/header';
    }
}
  