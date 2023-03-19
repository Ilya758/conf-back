import {
  IsMilitaryTime,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export default class UpdateMeetupDto {
  @IsMilitaryTime()
  @IsOptional()
  start_time: string;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  description: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  location: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  tagIds?: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  participantIds?: number[];

  constructor(
    start_time: string,
    title: string,
    description: string,
    location: string,
    tagIds: number[],
    participantIds: number[]
  ) {
    this.start_time = start_time;
    this.title = title;
    this.description = description;
    this.location = location;
    this.tagIds = tagIds;
    this.participantIds = participantIds;
  }
}
