import { Test, TestingModule } from '@nestjs/testing';
import { CreditCardService } from './credit-card.service';

describe('CreditCardService', () => {
  let service: CreditCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreditCardService],
    }).compile();

    service = module.get<CreditCardService>(CreditCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate a valid Visa card', () => {
    const result = service.validateCreditCard('4111111111111111');
    expect(result.valid).toBe(true);
    expect(result.cardType).toBe('Visa');
    expect(result.error).toBeNull();
  });

  it('should invalidate an invalid Visa card', () => {
    const result = service.validateCreditCard('4111111111111112');
    expect(result.valid).toBe(false);
    expect(result.cardType).toBe('Visa');
    expect(result.error).toBe('Failed Luhn checksum');
  });

  it('should return error for non-digit characters', () => {
    const result = service.validateCreditCard('4111-1111-1111-1111');
    expect(result.valid).toBe(true);
    expect(result.cardType).toBe('Visa');
  });

  it('should return error for invalid card length', () => {
    const result = service.validateCreditCard('411111111111');
    expect(result.valid).toBe(false);
    expect(result.cardType).toBe('Visa');
    expect(result.error).toBe('Invalid card length');
  });
});
