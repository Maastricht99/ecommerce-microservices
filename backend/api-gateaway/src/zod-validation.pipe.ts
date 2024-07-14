import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {

    constructor(private readonly schema: z.Schema) {}

    transform(value: unknown, _: ArgumentMetadata) {
        return this.schema.parse(value);
    }
}