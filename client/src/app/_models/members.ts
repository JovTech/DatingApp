import {Photo} from './photo'
  export interface Member {
    id: number;
    UserName: string;
    Gender: string;
    DateOfBirth: string;
    KnownAs: string;
    Created: DateTime;
    LastActive: DateTime;
    Introduction: string;
    LookingFor: string;
    Interests: string;
    City: string;
    Country: string;
    Photos: Photo[];
  }

