import React from 'react';

interface IProps {
    url: string;
}

const CharacterSlide: React.FC<IProps> = (props: IProps) => {
        const styles = {
        backgroundSize: "cover",
        backgroundPosition: "center"
    };

    console.log(props.url)

    return (
        <div className="character-slide" style={styles}>
            <img src={props.url} alt="" />
        </div>
    );
}

// on click > url needs to be stored for user && needs to take user to home page >> populate image of chosen character

export default CharacterSlide;