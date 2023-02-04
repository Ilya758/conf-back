import { IsString, Length } from 'class-validator';

export default class UserDto {
  @IsString({
    message: 'Username must be string',
  })
  public username: string;

  @IsString({
    message: 'Password must be string',
  })
  @Length(8, 20, {
    message: 'Password length must be in range (8, 20) symbols',
  })
  public password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
