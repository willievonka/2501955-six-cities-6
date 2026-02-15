import { readFileSync } from 'node:fs';
import { IFileReader } from './interfaces/file-reader.interface.js';
import { AmenityType, Coordinates, HousingType, User, UserType, Offer } from '../../types/index.js';
import chalk from 'chalk';

export class TSVFileReader implements IFileReader {
  private _rawData = '';

  constructor(
    private readonly _fileName: string
  ) {}

  public read(): void {
    try {
      this._rawData = readFileSync(this._fileName, { encoding: 'utf-8' });
    } catch (err: unknown) {
      console.error(chalk.red(`Failed to read file: ${chalk.cyan.underline(this._fileName)}`));
      if (err instanceof Error) {
        console.error(chalk.red(err.message));
      }
    }
  }

  public toArray(): Offer[] {
    if (!this._rawData) {
      throw new Error('File was not read');
    }

    const parseBoolean = (value: string): boolean => value === 'true';
    const parseInt = (value: string): number => Number.parseInt(value, 10);
    const parseFloat = (value: string): number => Number.parseFloat(value);
    const parseArray = (value: string): string[] => value.split(';');
    const parseCoordinates = (value: string): Coordinates => {
      const [latitude, longitude] = value.split(';').map(Number);

      return { latitude, longitude };
    };

    return this._rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([
        title,
        description,
        publishDate,
        city,
        previewImage,
        housingImages,
        isPremium,
        isFavorite,
        rating,
        housingType,
        roomsCount,
        guestsCount,
        price,
        amenities,
        authorName,
        authorEmail,
        authorAvatar,
        authorPassword,
        authorType,
        commentsCount,
        coordinates,
      ]) => ({
        title,
        description,
        publishDate: new Date(publishDate),
        city,
        previewImage,
        housingImages: parseArray(housingImages),
        isPremium: parseBoolean(isPremium),
        isFavorite: parseBoolean(isFavorite),
        rating: parseFloat(rating),
        housingType: housingType as HousingType,
        roomsCount: parseInt(roomsCount),
        guestsCount: parseInt(guestsCount),
        price: parseInt(price),
        amenities: parseArray(amenities) as AmenityType[],
        author: {
          name: authorName,
          email: authorEmail,
          avatar: authorAvatar || undefined,
          password: authorPassword,
          type: authorType as UserType
        } satisfies User,
        commentsCount: parseInt(commentsCount),
        coordinates: parseCoordinates(coordinates)
      }) satisfies Offer);
  }
}
