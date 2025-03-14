"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditCardController = void 0;
const common_1 = require("@nestjs/common");
const credit_card_service_1 = require("./credit-card.service");
class ValidateCreditCardDto {
    cardNumber;
}
let CreditCardController = class CreditCardController {
    creditCardService;
    constructor(creditCardService) {
        this.creditCardService = creditCardService;
    }
    validateCard(validateCardDto) {
        return this.creditCardService.validateCreditCard(validateCardDto.cardNumber);
    }
};
exports.CreditCardController = CreditCardController;
__decorate([
    (0, common_1.Post)('validate'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ValidateCreditCardDto]),
    __metadata("design:returntype", void 0)
], CreditCardController.prototype, "validateCard", null);
exports.CreditCardController = CreditCardController = __decorate([
    (0, common_1.Controller)('credit-card'),
    __metadata("design:paramtypes", [credit_card_service_1.CreditCardService])
], CreditCardController);
//# sourceMappingURL=credit-card.controller.js.map