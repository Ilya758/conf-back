import {
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export default class CreateMeetupDto {
  @IsNumber()
  @IsNotEmpty()
  organizerId: number;

  @IsMilitaryTime()
  @IsNotEmpty()
  start_time: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  location: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  tagIds?: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  participantIds?: number[];

  constructor(
    organizerId: number,
    start_time: string,
    title: string,
    description: string,
    location: string,
    tagIds: number[],
    participantIds: number[]
  ) {
    this.organizerId = organizerId;
    this.start_time = start_time;
    this.title = title;
    this.description = description;
    this.location = location;
    this.tagIds = tagIds;
    this.participantIds = participantIds;
  }
}
