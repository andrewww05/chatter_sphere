export class CommonUtils {
    public static isProduction(): boolean {
        return process.env.NODE_ENV === 'production';
    }
}