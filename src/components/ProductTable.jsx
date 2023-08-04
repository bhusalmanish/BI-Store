import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { AiFillDelete, AiFillEdit, AiOutlineCheck } from "react-icons/ai";


const ProductTable = ({ Data }) => {
    const [editable, setEditable] = useState({ companyIndex: null, productIndex: null });
    const [updatedData, setUpdatedData] = useState(Data);

    useEffect(() => {
        setUpdatedData(Data);
    }, [Data]);

    const handleEditProduct = (companyIndex, productIndex) => {
        setEditable({ companyIndex, productIndex });
    };

    const handleDeleteProduct = (companyIndex, productIndex) => {
        const updatedProducts = [...updatedData];
        updatedProducts[companyIndex].ProductName.splice(productIndex, 1);
        setUpdatedData(updatedProducts);
    };

    const handleProductChange = (e, companyIndex, productIndex) => {
        const updatedProducts = [...updatedData];
        updatedProducts[companyIndex].ProductName[productIndex] = e.target.value;
        setUpdatedData(updatedProducts);
    };

    const hasDataInColumn = Data.map((company) =>
        company.ProductName.some((product) => product.trim() !== '')
    );

    const isDataEmpty = Data.every((company) => company.ProductName.length === 0);

    return (
        <div>
            {Data.length > 0 && !isDataEmpty ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Company</th>
                            {Data.map((item, index) => hasDataInColumn[index] && (
                                <th key={index}>{item.CompanyName}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Data[0].ProductName.map((_, productIndex) => (
                            <tr key={productIndex}>
                                <td>Product {productIndex + 1}</td>
                                {Data.map((company, companyIndex) => hasDataInColumn[companyIndex] && (

                                    <td key={companyIndex}>
                                        {editable.companyIndex === companyIndex && editable.productIndex === productIndex ? (
                                            <input
                                                type="text"
                                                value={company.ProductName[productIndex]}
                                                onChange={(e) => handleProductChange(e, companyIndex, productIndex)}
                                            />
                                        ) : (
                                            company.ProductName[productIndex]
                                        )}
                                        {hasDataInColumn[companyIndex] && (
                                            editable.companyIndex === companyIndex && editable.productIndex === productIndex ? (
                                                <Button onClick={() => setEditable({ companyIndex: null, productIndex: null })}> <AiOutlineCheck /> </Button>
                                            ) : (
                                                <>    <span>
                                                    <Button onClick={() => handleEditProduct(companyIndex, productIndex)}> <AiFillEdit /> </Button>
                                                    <Button onClick={() => handleDeleteProduct(companyIndex, productIndex)}> <AiFillDelete /> </Button>
                                                </span>
                                                </>
                                            )
                                        )}
                                    </td>

                                ))}

                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>No data</p>
            )}
        </div>
    );
};



export default ProductTable;
