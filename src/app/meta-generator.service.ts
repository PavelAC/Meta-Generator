import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetaGeneratorService {
 protected formData = signal({
  title: '',
  description: '',
  keywords: '',
  charset: 'UTF-8',
  author: '',
  });

  protected socialLinks = signal<any[]>([]);

  getFormData = computed(()=> this.formData());
  getSocialLinks = computed(()=> this.socialLinks());

  updateFormData(field: string, value: string): void {
    this.formData.set({
      ...this.formData(),
      [field]: value
    });
  }

  updateSocialLinks(updatedLinks: any[]): void {
    this.socialLinks.set(updatedLinks);
  }

  generateMetaTags = computed(() => {
    const tags: string[] = [];
    const formData = this.formData();
    const socialLinks = this.socialLinks();
  
    const baseMetaTemplates = [
      { tag: 'title', value: `<title>${formData.title || ''}</title>` },
      { tag: 'viewport', value: `<meta name="viewport" content="width=device-width, initial-scale=1.0">` },
      { tag: 'charset', value: `<meta charset="${formData.charset || 'UTF-8'}">` },
      { tag: 'author', value: `<meta name="author" content="${formData.author || ''}">` },
      { tag: 'description', value: `<meta name="description" content="${formData.description || ''}">` },
      { tag: 'keywords', value: `<meta name="keywords" content="${formData.keywords || ''}">` },
    ];
  
    baseMetaTemplates.forEach(template => tags.push(template.value));
  
    const socialMetaTemplates: Record<string, { property: string; field: string; template: string }[]> = {
      Facebook: [
        { property: 'og:title', field: 'title', template: `<meta property="og:title" content="{value}">` },
        { property: 'og:description', field: 'description', template: `<meta property="og:description" content="{value}">` },
        { property: 'og:image', field: 'image', template: `<meta property="og:image" content="{value}">` },
      ],
      Twitter: [
        { property: 'twitter:title', field: 'title', template: `<meta name="twitter:title" content="{value}">` },
        { property: 'twitter:description', field: 'description', template: `<meta name="twitter:description" content="{value}">` },
        { property: 'twitter:image', field: 'image', template: `<meta name="twitter:image" content="{value}">` },
      ],
    };
  
    socialLinks.forEach(platform => {
      const templates = socialMetaTemplates[platform.name];
      if (templates) {
        templates.forEach(template => {
          const value = platform.fields[template.field];
          if (value) {
            tags.push(template.template.replace('{value}', value));
          }
        });
      }
    });
  
    return tags.join('\n'); 
  });
  

}
