import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { CreditCardService } from './credit-card.service';

// DTO for validation request
// TODO: What does DTO stand for?
class ValidateCreditCardDto {
  cardNumber: string;
}

@Controller('credit-card')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  @Post('validate')
  @UsePipes(new ValidationPipe())
  validateCard(@Body() validateCardDto: ValidateCreditCardDto) {
    return this.creditCardService.validateCreditCard(
      validateCardDto.cardNumber,
    );
  }
}
