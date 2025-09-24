import { GraphQLResolveInfo } from 'graphql';
import graphqlFields from 'graphql-fields';

export class CommonHelper {
    public static getGraphQlFields(
        info: GraphQLResolveInfo,
        addFields: string[] = [],
    ) {
        return [
            ...new Set([...Object.keys(graphqlFields(info)), ...addFields]),
        ];
    }

    public static isProduction(): boolean {
        return process.env.NODE_ENV === 'production';
    }
}
