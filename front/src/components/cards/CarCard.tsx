import React, { CSSProperties } from "react";
import { Car } from "../../services/car/types";
import { Card } from "primereact/card";
import { Carousel } from "primereact/carousel";
import { env } from "../../env";
import { Image } from "primereact/image";

const previewContainer: CSSProperties = {
    height: "200px",
    overflow: "hidden", // приховує частини зображення, які виходять за межі контейнера
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5%",
};

const CarCard: React.FC<{ car: Car }> = ({ car }) => {
    const imagePreviewTemplate = (image: string) => {
        return (
            <div style={previewContainer}>
                <Image
                    preview
                    alt={car.model}
                    src={`${env.imagesUrl}${image}`}
                />
            </div>
        );
    };

    const header = (
        <Carousel
            value={car.images}
            numVisible={1}
            numScroll={1}
            className="custom-carousel"
            circular
            autoplayInterval={3000}
            itemTemplate={imagePreviewTemplate}
        />
    );

    return (
        <div className="card flex justify-content-center">
            <Card
                title={car.model}
                subTitle={car.brand}
                header={header}
                className="md:w-25rem"
            >
                <p className="m-0">Колір: {car.color}</p>
                <p className="m-0">Коробка: {car.gearbox}</p>
                <h2 className="mt-2" style={{fontSize: "1.5em", fontWeight: "bold"}}>Ціна: ${car.price}</h2>
            </Card>
        </div>
    );
};

export default CarCard;
