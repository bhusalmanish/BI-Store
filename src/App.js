import React, { useEffect, useState } from 'react';
import './App.css';
import { Container, Form } from 'react-bootstrap';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';

const initialData = [
  { "CompanyName": "apple", "ProductName": ["Mac air M1", "Mac M1 Pro", "air pod", "mac 1"] },
  { "CompanyName": "samsung", "ProductName": ["Galaxy S23", "Galaxy A53", "Galaxy A34"] },
  { "CompanyName": "Google", "ProductName": ["Google Pixel 4", "Google Glass", "Google A!"] }
];

function App() {
  const [Data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');

  const handleUpdateData = (newData, isExisting) => {
    if (isExisting) {
      const findIndex = Data.findIndex(data => data.CompanyName === newData.CompanyName);
      setData(prev => {
        const updatedData = [...prev];
        updatedData[findIndex].ProductName = updatedData[findIndex].ProductName.concat(newData.ProductName);
        return updatedData;
      });
    } else {
      setData(prev => [...prev, { CompanyName: newData.CompanyName, ProductName: [newData.ProductName] }]);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchFiltered = () => {
    const filteredData = Data?.map((company) => ({
      ...company,
      ProductName: company?.ProductName?.filter((product) =>
        product.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    })).filter((company) => company.ProductName.length > 0);


    return (
      <div>
        <Container>
          <h1>BI : Store</h1>
          <Form.Group>
            <Form.Control type="text" placeholder="Search Product" value={searchQuery} onChange={handleSearch} />
          </Form.Group>
          <ProductForm Data={Data} onUpdateData={handleUpdateData} />
          <ProductTable Data={filteredData} />

        </Container>
      </div>
    );
  };

  return searchFiltered();
}

export default App;
