import { createReadStream, ReadStream } from 'node:fs';
import { IFileReader } from './interfaces/file-reader.interface.js';
import EventEmitter from 'node:events';
import { FileReaderEventType } from './enums/file-reader-event-type.enum.js';

const CHUNK_SIZE = 16384; // 16KB

export class TSVFileReader extends EventEmitter implements IFileReader {
  constructor(private readonly _fileName: string) {
    super();
  }

  public async read(): Promise<void> {
    const readStream: ReadStream = createReadStream(this._fileName, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8'
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        this.emit(FileReaderEventType.Line, completeRow);
      }
    }

    this.emit(FileReaderEventType.End, importedRowCount);
  }
}
