import {gql} from "apollo-boost";

export const FIND_LOCATIONS_BY_NAME = gql`
  query($searchString: String) {
    search(
      searchTerm: $searchString
    ){
      stations {
        name
        primaryEvaId
        picture {
          url
        }
      }
    }
  }`;