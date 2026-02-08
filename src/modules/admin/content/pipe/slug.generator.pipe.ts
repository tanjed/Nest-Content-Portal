import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { CreateContentDto } from "../dto/create-content.dto";

@Injectable()
export class SlugGeneratorPipe implements PipeTransform {
    transform(value: CreateContentDto, metadata: ArgumentMetadata) {
       if(value.title && !value.slug) {
            value.slug = value.title
                .toLowerCase()
                .replace(/[^a-z0-9 ]/g, '')
                .replace(/\s+/g, '-')  
                .trim();      
       }

       return value;
    }
    
}