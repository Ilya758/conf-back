import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class TagDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}
