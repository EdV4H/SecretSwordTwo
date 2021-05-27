/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMonsterDna = /* GraphQL */ `
  query GetMonsterDna($id: ID!) {
    getMonsterDna(id: $id) {
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
export const listMonsterDnas = /* GraphQL */ `
  query ListMonsterDnas(
    $id: ID
    $filter: ModelMonsterDnaFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMonsterDnas(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        dna
        name
        description
        imageUrl
        timestamp
        skills {
          nextToken
        }
        owner
      }
      nextToken
    }
  }
`;
export const getSkill = /* GraphQL */ `
  query GetSkill($monsterId: ID!, $skillId: ID!) {
    getSkill(monsterId: $monsterId, skillId: $skillId) {
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
export const listSkills = /* GraphQL */ `
  query ListSkills(
    $monsterId: ID
    $skillId: ModelIDKeyConditionInput
    $filter: ModelSkillFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSkills(
      monsterId: $monsterId
      skillId: $skillId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
      total
    }
  }
`;
