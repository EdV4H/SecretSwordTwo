/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMonster = /* GraphQL */ `
  query GetMonster($id: ID!) {
    getMonster(id: $id) {
      id
      owner
      name
      description
      hp
      atk
      def
      spd
      skillId1
      skillId2
      skillId3
      skillId4
      timestamp
    }
  }
`;
export const listMonsters = /* GraphQL */ `
  query ListMonsters(
    $id: ID
    $filter: ModelMonsterFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMonsters(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        owner
        name
        description
        hp
        atk
        def
        spd
        skillId1
        skillId2
        skillId3
        skillId4
        timestamp
      }
      nextToken
    }
  }
`;
export const getSkill = /* GraphQL */ `
  query GetSkill($id: ID!) {
    getSkill(id: $id) {
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
export const listSkills = /* GraphQL */ `
  query ListSkills(
    $id: ID
    $filter: ModelSkillFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSkills(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        owner
        name
        description
        power
        hitrate
        timestamp
      }
      nextToken
    }
  }
`;
