/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMonster = /* GraphQL */ `
  query GetMonster($id: ID!) {
    getMonster(id: $id) {
      id
      name
      description
      hp
      atk
      def
      spd
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
        name
        description
        hp
        atk
        def
        spd
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
      name
      description
      power
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
        name
        description
        power
      }
      nextToken
    }
  }
`;
