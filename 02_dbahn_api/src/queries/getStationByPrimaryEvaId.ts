import {gql} from "apollo-boost";

export const GET_STATION_BY_PRIMARY_EVA_ID = gql`
  query($primaryEvaId: Int!) {
    stationWithEvaId(
      evaId: $primaryEvaId
    ){
      location {
        latitude
        longitude
      }
      timetable {
        nextArrivals {
          type
          trainNumber
          platform
          time
          stops
        }
        nextDepatures {
          type
          trainNumber
          platform
          time
          stops
        }
      }
    }
  }`;