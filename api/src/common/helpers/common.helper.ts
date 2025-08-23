import { GraphQLResolveInfo } from "graphql";
import graphqlFields from 'graphql-fields';

export class CommonHelper {
    public static getGraphQlFields(info: GraphQLResolveInfo) {
        return Object.keys(graphqlFields(info));
    }
}