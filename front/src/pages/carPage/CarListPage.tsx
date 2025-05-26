import React, { CSSProperties, useState } from "react";
import { useGetCarsQuery } from "../../services/car/car";
import { ListParams } from "../../services/car/types";
import { ProgressSpinner } from "primereact/progressspinner";
import CarCard from "../../components/cards/CarCard";
import Pagination from "@mui/material/Pagination";

const carsContainer: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "15px",
    padding: "10px",
};

const CarListPage: React.FC = () => {
    const [listParams, setListParams] = useState<ListParams>({
        page: 1,
        pageSize: 3,
        manufacture: "",
    });

    const { data, isError, isLoading } = useGetCarsQuery(listParams);

    const pageChangeHandler = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setListParams((prev) => {
            return { ...prev, page: value };
        });
    };

    return (
        <div>
            {isLoading ? (
                <ProgressSpinner />
            ) : !isError && data?.payload ? (
                <div>
                    <div style={carsContainer}>
                        {data.payload.cars.map((car) => (
                            <CarCard key={car.id} car={car} />
                        ))}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "10px",
                        }}
                    >
                        <Pagination
                            page={data.payload.page}
                            count={data.payload.pageCount}
                            onChange={pageChangeHandler}
                        />
                    </div>
                </div>
            ) : (
                isError && (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <h1 className="text-4xl text-red-600 m-3 font-semibold">
                            Connection failed
                        </h1>
                        <img
                            alt="error"
                            style={{ maxWidth: "600px" }}
                            src="https://static.vecteezy.com/system/resources/previews/021/786/446/non_2x/electric-socket-with-a-plug-icon-in-flat-style-connection-symbol-illustration-on-isolated-background-404-error-sign-business-concept-vector.jpg"
                        />
                    </div>
                )
            )}
        </div>
    );
};

export default CarListPage;
