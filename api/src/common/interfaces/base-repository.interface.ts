import { FindOptionsWhere } from 'typeorm';

export interface BaseRepository<T> {
    findAll<R>(
        page: number,
        perPage: number,
        fields?: string[],
        where?: FindOptionsWhere<T>,
    ): Promise<(R|T)[]>;

    findOne<R>(
        where?: FindOptionsWhere<T>,
        fields?: string[],
    ): Promise<(R|T) | null>;

    create(input: unknown): Promise<T|unknown>;

    update(id: string, input: unknown): Promise<T|unknown> 

    remove(id: string): Promise<T|unknown>
}
