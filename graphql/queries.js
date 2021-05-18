/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMonster = /* GraphQL */ `
  query GetMonster($id: ID!) {
    getMonster(id: $id) {
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
export const searchSkills = /* GraphQL */ `
  query SearchSkills(
    $filter: SearchableSkillFilterInput
    $sort: SearchableSkillSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchSkills(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
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
      total
    }
  }
`;
