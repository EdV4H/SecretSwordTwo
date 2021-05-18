/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMonster = /* GraphQL */ `
  mutation CreateMonster(
    $input: CreateMonsterInput!
    $condition: ModelMonsterConditionInput
  ) {
    createMonster(input: $input, condition: $condition) {
      id
      owner
      name
      description
      imageUrl
      hp
      atk
      def
      spd
      skillId1
      skillId2
      skillId3
      skillId4
      skill1 {
        id
        owner
        name
        description
        power
        hitrate
        timestamp
      }
      skill2 {
        id
        owner
        name
        description
        power
        hitrate
        timestamp
      }
      skill3 {
        id
        owner
        name
        description
        power
        hitrate
        timestamp
      }
      skill4 {
        id
        owner
        name
        description
        power
        hitrate
        timestamp
      }
      timestamp
    }
  }
`;
export const updateMonster = /* GraphQL */ `
  mutation UpdateMonster(
    $input: UpdateMonsterInput!
    $condition: ModelMonsterConditionInput
  ) {
    updateMonster(input: $input, condition: $condition) {
      id
      owner
      name
      description
      imageUrl
      hp
      atk
      def
      spd
      skillId1
      skillId2
      skillId3
      skillId4
      skill1 {
        id
        owner
        name
        description
        power
        hitrate
        timestamp
      }
      skill2 {
        id
        owner
        name
        description
        power
        hitrate
        timestamp
      }
      skill3 {
        id
        owner
        name
        description
        power
        hitrate
        timestamp
      }
      skill4 {
        id
        owner
        name
        description
        power
        hitrate
        timestamp
      }
      timestamp
    }
  }
`;
export const deleteMonster = /* GraphQL */ `
  mutation DeleteMonster(
    $input: DeleteMonsterInput!
    $condition: ModelMonsterConditionInput
  ) {
    deleteMonster(input: $input, condition: $condition) {
      id
      owner
      name
      description
      imageUrl
      hp
      atk
      def
      spd
      skillId1
      skillId2
      skillId3
      skillId4
      skill1 {
        id
        owner
        name
        description
        power
        hitrate
        timestamp
      }
      skill2 {
        id
        owner
        name
        description
        power
        hitrate
        timestamp
      }
      skill3 {
        id
        owner
        name
        description
        power
        hitrate
        timestamp
      }
      skill4 {
        id
        owner
        name
        description
        power
        hitrate
        timestamp
      }
      timestamp
    }
  }
`;
export const createSkill = /* GraphQL */ `
  mutation CreateSkill(
    $input: CreateSkillInput!
    $condition: ModelSkillConditionInput
  ) {
    createSkill(input: $input, condition: $condition) {
      id
      owner
      name
      description
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
      id
      owner
      name
      description
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
      id
      owner
      name
      description
      power
      hitrate
      timestamp
    }
  }
`;
