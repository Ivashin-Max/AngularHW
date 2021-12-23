import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name: "capitalizeWord"
})
export class CapitalizeWordPipe implements PipeTransform {
  transform(value: string): string {
    const capitalLetter = value[0].toLocaleUpperCase();
    const otherLetters = value.slice(1);
    const capitalizedWord = capitalLetter + otherLetters.toLocaleLowerCase();
    return capitalizedWord;
}
}

@Pipe({
  name: "mrMrs"
})
export class MrMrsPipe implements PipeTransform {
  transform(value: string): string {
    if (value.endsWith("а") || value.endsWith("А")) {
      return "Mrs. " + value;
    }
    return "Mr. " + value;
  }
}
