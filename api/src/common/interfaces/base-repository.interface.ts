import { FindOptionsWhere } from 'typeorm';

export interface BaseRepository<T> {
    create(input: unknown): Promise<T>

    findAll<R>(
        page: number,
        perPage: number,
        fields?: string[],
        where?: FindOptionsWhere<T>,
    ): Promise<(R|T)[]>;

    findOne<R>(
        id: string,
        fields?: string[],
        where?: FindOptionsWhere<T>,
    ): Promise<(R|T) | null>;

    remove(id: string): Promise<void>
}
