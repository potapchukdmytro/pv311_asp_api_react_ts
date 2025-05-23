import React, { ChangeEvent, useState } from "react";
import { CreateCar } from "../../services/car/types";
import { InputText } from "primereact/inputtext";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { Button } from "primereact/button";
import { useCreateCarMutation } from "../../services/car/car";

const fieldStyle: React.CSSProperties = {
    margin: "5px 0px",
};

const imagesGrid: React.CSSProperties = {
    margin: "5px 0px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "8px"
};

const previewImageStyle = {
    borderRadius: "10px", 
    boxShadow: "1px 1px 6px black"
}

const imagesFiledStyle: React.CSSProperties = {
    margin: "5px 0px",
};

const CreateCarPage: React.FC = () => {
    const [carData, setCarData] = useState<CreateCar>({
        model: "",
        brand: "",
        price: 0,
        year: 0,
        color: "",
        manufacture: "",
        gearbox: "",
        images: [],
    });
    const [images, setImages] = useState<File[]>([]);
    const [createCar] = useCreateCarMutation();

    const inputTextChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCarData((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const inputNumberChangeHandler = (e: InputNumberChangeEvent) => {
        const originalEvent = e.originalEvent as ChangeEvent<HTMLInputElement>;
        const { name, value } = originalEvent.target;
        let number = value.replace(",", "");
        if (name === "price") {
            number = number.substring(1);
        }

        setCarData((prev) => {
            return { ...prev, [name]: number };
        });
    };

    const deleteImageHandler = (image: File) => {
        const newImages = images.filter((i) => i !== image);
        setImages(newImages);
    };

    const uploadHandler = (e: FileUploadHandlerEvent) => {
        if (e.files.length > 0) {
            setImages(e.files);
        }
    };

    const uploadImageHandler = (e: FileUploadHandlerEvent) => {
        if (e.files.length > 0) {
            setImages((prev) => {
                return [...prev, ...e.files];
            });
            e.options.clear();
        }
    };

    const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("model", carData.model);
        formData.append("brand", carData.brand);
        formData.append("color", carData.color);
        formData.append("price", carData.price.toString());
        formData.append("year", carData.year.toString());
        formData.append("manufacture", carData.manufacture);
        formData.append("gearbox", carData.gearbox);
        images.forEach((image) => {
            formData.append("images", image);
        });

        const response = await createCar(formData);
        console.log(response);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div style={fieldStyle}>
                <InputText
                    onChange={inputTextChangeHandler}
                    placeholder="Brand"
                    name="brand"
                />
            </div>
            <div style={fieldStyle}>
                <InputText
                    onChange={inputTextChangeHandler}
                    placeholder="Model"
                    name="model"
                />
            </div>
            <div style={fieldStyle}>
                <InputNumber
                    onChange={inputNumberChangeHandler}
                    mode="currency"
                    currency="USD"
                    placeholder="Price"
                    name="price"
                />
            </div>
            <div style={fieldStyle}>
                <InputNumber
                    onChange={inputNumberChangeHandler}
                    placeholder="Year"
                    name="year"
                />
            </div>
            <div style={fieldStyle}>
                <InputText
                    onChange={inputTextChangeHandler}
                    placeholder="Color"
                    name="color"
                />
            </div>
            <div style={fieldStyle}>
                <InputText
                    onChange={inputTextChangeHandler}
                    placeholder="Gearbox"
                    name="gearbox"
                />
            </div>
            <div style={fieldStyle}>
                <InputText
                    onChange={inputTextChangeHandler}
                    placeholder="Manufacture"
                    name="manufacture"
                />
            </div>
            {/* <div style={fieldStyle}>
                <FileUpload
                    customUpload
                    multiple
                    mode="basic"
                    name="images"
                    accept="image/*"
                    uploadHandler={uploadHandler}
                />
            </div> */}
            <div style={imagesFiledStyle}>
                <div style={imagesGrid}>
                    {images.map((image, index) => (
                        <img
                            style={previewImageStyle}
                            onClick={() => deleteImageHandler(image)}
                            key={index}
                            src={URL.createObjectURL(image)}
                            alt={image.name}
                            width={200}
                        />
                    ))}
                </div>

                <div>
                    <FileUpload
                        mode="basic"
                        uploadHandler={uploadImageHandler}
                        name="images"
                        customUpload
                        accept="image/*"
                        auto
                        chooseLabel="image"
                        multiple
                    />
                </div>
            </div>
            <div style={fieldStyle}>
                <Button onClick={submitHandler}>Add</Button>
            </div>
        </div>
    );
};

export default CreateCarPage;
