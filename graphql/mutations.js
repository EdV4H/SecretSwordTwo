/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMonsterDna = /* GraphQL */ `
  mutation CreateMonsterDna(
    $input: CreateMonsterDnaInput!
    $condition: ModelMonsterDnaConditionInput
  ) {
    createMonsterDna(input: $input, condition: $condition) {
      id
      dna
      name
      description
      imageUrl
      timestamp
      skills {
        items {
          monsterId
          skillId
          owner
          name
          description
          elements
          power
          hitrate
          timestamp
        }
        nextToken
      }
      owner
    }
  }
`;
export const updateMonsterDna = /* GraphQL */ `
  mutation UpdateMonsterDna(
    $input: UpdateMonsterDnaInput!
    $condition: ModelMonsterDnaConditionInput
  ) {
    updateMonsterDna(input: $input, condition: $condition) {
      id
      dna
      name
      description
      imageUrl
      timestamp
      skills {
        items {
          monsterId
          skillId
          owner
          name
          description
          elements
          power
          hitrate
          timestamp
        }
        nextToken
      }
      owner
    }
  }
`;
export const deleteMonsterDna = /* GraphQL */ `
  mutation DeleteMonsterDna(
    $input: DeleteMonsterDnaInput!
    $condition: ModelMonsterDnaConditionInput
  ) {
    deleteMonsterDna(input: $input, condition: $condition) {
      id
      dna
      name
      description
      imageUrl
      timestamp
      skills {
        items {
          monsterId
          skillId
          owner
          name
          description
          elements
          power
          hitrate
          timestamp
        }
        nextToken
      }
      owner
    }
  }
`;
export const createSkill = /* GraphQL */ `
  mutation CreateSkill(
    $input: CreateSkillInput!
    $condition: ModelSkillConditionInput
  ) {
    createSkill(input: $input, condition: $condition) {
      monsterId
      skillId
      owner
      name
      description
      elements
      power
      hitrate
      timestamp
    }
  }
`;
export const updateSkill = /* GraphQL */ `
  mutation UpdateSkill(
    $input: UpdateSkillInput!
    $condition: ModelSkillConditionInput
  ) {
    updateSkill(input: $input, condition: $condition) {
      monsterId
      skillId
      owner
      name
      description
      elements
      power
      hitrate
      timestamp
    }
  }
`;
export const deleteSkill = /* GraphQL */ `
  mutation DeleteSkill(
    $input: DeleteSkillInput!
    $condition: ModelSkillConditionInput
  ) {
    deleteSkill(input: $input, condition: $condition) {
      monsterId
      skillId
      owner
      name
      description
      elements
      power
      hitrate
      timestamp
    }
  }
`;
