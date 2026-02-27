import { inject, injectable } from 'inversify';
import { IOfferService } from '../interfaces/offer-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CreateOfferDto } from '../dto/create-offer.dto.js';
import { OfferEntity } from '../offer.entity.js';
import { Component } from '../../../types/index.js';
import { ILogger } from '../../../libs/logger/index.js';

@injectable()
export class DefaultOfferService implements IOfferService {
  constructor(
    @inject(Component.Logger) private readonly _logger: ILogger,
    @inject(Component.OfferModel) private readonly _offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this._offerModel.create(dto);
    this._logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this._offerModel.findById(offerId).exec();
  }
}
