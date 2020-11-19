import React from "react";
import DetailCard from "../DetailCard/DetailCard";

export default function About() {

    return (
        <div className="card-container">
            <div className="card-holder">
                <h2>Welcome To Vegemon!</h2>
                <DetailCard>
                    <p>
                        This is app is designed to help you broaden your veggie horizons!

                        Log your veggie intake, challenge your friends, and watch you
                        and your vegemon get stronger and healthier!

                        Having a whole foods, plant-based diet is key to living a
                        long and healthy life. Eating a diverse array of vegetables
                        gives you a nutrient-rich diet and promotes positive gut
                        health. Eating a largely plant-based diet also lowers your
                        chances of preventable illness.

                        This application was developed by Chad Laflamme, Tiffany Brand,
                        Keith Tharp, Rachel Campbell, and Marc Langlois.

                        UNH Coding Bootcamp 2020
            </p>
                </DetailCard>
            </div>
        </div>
    )
}