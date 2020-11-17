import React from 'react';

interface IProps {
    url: string;
}

const CharacterSlide: React.FC<IProps> = (props: IProps) => {
        const styles = {
        backgroundImage: `url(${props.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
    };

    return (
        <div className="character-slide" style={styles}>
            <img src={props.url} alt="" />
        </div>
    );
}

export default CharacterSlide;