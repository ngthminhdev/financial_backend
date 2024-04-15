import {IsEnum, IsNumberString, IsString} from "class-validator";
import {Sort} from "src/enums";

export class GetListDto {
  @IsNumberString()
  skip?: number;
  
  @IsNumberString()
  limit?: number;

  @IsString()
  sort_by?: string;

  @IsNumberString()
  @IsEnum([Sort.Asc, Sort.Desc])
  sort_type?: string;
}
