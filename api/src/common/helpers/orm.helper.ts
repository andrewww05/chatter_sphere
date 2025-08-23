export class OrmHelper {
    public static getSafeFields<T extends object>(fields: string[], instance: T): (keyof T)[] {
        const allowedFields: string[] = Object.keys(instance);
        
        return fields
            .filter((f) => allowedFields.includes(f))
            .map((f) => f as keyof T);
    }
}
