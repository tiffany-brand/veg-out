// models character data received through get request from back end 

export default interface ICharacterResponse {
    startinghealth: number;
    startingoffense: number;
    startingdefense: number;
    monster_type: string;
    _id: string;
    image: string;

}