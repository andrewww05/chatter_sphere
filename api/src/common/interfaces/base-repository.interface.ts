import { FindOptionsWhere } from 'typeorm';

export interface BaseRepository<T> {
    findAll<R = T>(
        page: number,
        perPage: number,
        fields?: string[],
        where?: FindOptionsWhere<T>,
    ): Promise<R[]>;

    findOne<R = T>(
        id: string,
        fields?: string[],
        where?: FindOptionsWhere<T>,
    ): Promise<R | null>;

    remove(id: string): Promise<void>
}
