/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getIotThing = /* GraphQL */ `
  query GetIotThing($id: ID!) {
    getIotThing(id: $id) {
      id
      devEUI
      AppEUI
      AppKey
      Model
      Type
      description
      Holder
      createdAt
      updatedAt
    }
  }
`;
export const listIotThings = /* GraphQL */ `
  query ListIotThings(
    $filter: ModelIotThingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIotThings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        devEUI
        AppEUI
        AppKey
        Model
        Type
        description
        Holder
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getThingModel = /* GraphQL */ `
  query GetThingModel($id: ID!) {
    getThingModel(id: $id) {
      id
      Model
      Type
      createdAt
      updatedAt
    }
  }
`;
export const listThingModels = /* GraphQL */ `
  query ListThingModels(
    $filter: ModelThingModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listThingModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Model
        Type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
