import { IsNotEmpty } from 'class-validator';
// Dto as object for address and it has multiple values
export class CreateAddressDto {
  @IsNotEmpty()
  line1: string;

  line2?: string;

  @IsNotEmpty()
  zip: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;
}
