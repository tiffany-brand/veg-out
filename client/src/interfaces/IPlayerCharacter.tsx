export default interface IPlayerCharacter {
    character_id: string | undefined;
    user_id: string | undefined;
    currenthealth: number;
    currentoffense: number;
    currentdefense: number;
    character_name: string;
    _id?: string;

}