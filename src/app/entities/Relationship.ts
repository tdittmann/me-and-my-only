export class Relationship {

  name1: string;
  name2: string;

  image: string;

  anniversary: number;
  engaged: number | undefined;
  married: number | undefined;

  children: { name: string, birthday: number, gender: 'male' | 'female' }[] = [];

}
