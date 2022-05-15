/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createIotThing = /* GraphQL */ `
  mutation CreateIotThing(
    $input: CreateIotThingInput!
    $condition: ModelIotThingConditionInput
  ) {
    createIotThing(input: $input, condition: $condition) {
      id
      devEUI
      AppEUI
      AppKey
      Model
      Type
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateIotThing = /* GraphQL */ `
  mutation UpdateIotThing(
    $input: UpdateIotThingInput!
    $condition: ModelIotThingConditionInput
  ) {
    updateIotThing(input: $input, condition: $condition) {
      id
      devEUI
      AppEUI
      AppKey
      Model
      Type
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteIotThing = /* GraphQL */ `
  mutation DeleteIotThing(
    $input: DeleteIotThingInput!
    $condition: ModelIotThingConditionInput
  ) {
    deleteIotThing(input: $input, condition: $condition) {
      id
      devEUI
      AppEUI
      AppKey
      Model
      Type
      description
      createdAt
      updatedAt
    }
  }
`;
export const createThingModel = /* GraphQL */ `
  mutation CreateThingModel(
    $input: CreateThingModelInput!
    $condition: ModelThingModelConditionInput
  ) {
    createThingModel(input: $input, condition: $condition) {
      id
      Model
      Type
      createdAt
      updatedAt
    }
  }
`;
export const updateThingModel = /* GraphQL */ `
  mutation UpdateThingModel(
    $input: UpdateThingModelInput!
    $condition: ModelThingModelConditionInput
  ) {
    updateThingModel(input: $input, condition: $condition) {
      id
      Model
      Type
      createdAt
      updatedAt
    }
  }
`;
export const deleteThingModel = /* GraphQL */ `
  mutation DeleteThingModel(
    $input: DeleteThingModelInput!
    $condition: ModelThingModelConditionInput
  ) {
    deleteThingModel(input: $input, condition: $condition) {
      id
      Model
      Type
      createdAt
      updatedAt
    }
  }
`;
