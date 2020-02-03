import { PipeTransform, Pipe } from '@angular/core';

// This pipe will return `-` if string or object is resolved to
// null or false like in case of empty string

@Pipe({
    name: 'hyphen'
})
export class HyphenPipe implements PipeTransform {

    transform(value: string) {
        return value || '-';
    }
}
