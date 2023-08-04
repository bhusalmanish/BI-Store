
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';


const ProductForm = ({ Data, onUpdateData }) => {
    const [companyName, setCompanyName] = useState("");
    const [productName, setProductName] = useState('');
    const [newCompanyName, setNewCompanyName] = useState('');
    const [companyOption, setCompanyOption] = useState([]);
    const handleCompanyNameChange = (e) => {
        const selectedCompanyName = e.target.value;
        setCompanyName(selectedCompanyName);
        // Clear the newCompanyName state when an existing company is selected
        if (selectedCompanyName !== 'NewCompany') {
            setNewCompanyName('');
        }
    };
    const handleProductNameChange = (e) => {
        setProductName(e.target.value);
    };
    const handleNewCompanyNameChange = (e) => {
        setNewCompanyName(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const company = Data?.find((item) => item.CompanyName === companyName);
        if (company) {
            onUpdateData({ productName, CompanyName: company.CompanyName }, true);

        } else if (companyName === 'NewCompany' && newCompanyName.trim() !== '' && productName.trim() !== '') {

            // Data.push({ "CompanyName": newCompanyName, "ProductName": productName });
            // console.log('New company added:', newCompanyName + " P N " + productName);
            // const updatedData = [...Data, { "CompanyName": newCompanyName, "ProductName": productName }];

            onUpdateData({ "CompanyName": newCompanyName, "ProductName": productName }, false);

            // onUpdateData(updatedData);
            setNewCompanyName('');
            setProductName('');
        } else {
            console.error('Invalid input');
        }
    };

    useEffect(() => {

        if (Data.length > 0) {
            const companies = Data?.map((item) => {
                return item.CompanyName;
            })
            setCompanyOption(companies);
        }

    }, [Data]);
    return (
        <div className='Border'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="companySelect">Select Company:</label>
                <select id="companySelect" value={companyName} onChange={handleCompanyNameChange}>
                    <option value="" defaultChecked> Select Company</option>
                    <option value="NewCompany">NewCompany</option>
                    {companyOption.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                {companyName === 'NewCompany' && (
                    <div>
                        <label htmlFor="newCompanyNameInput">New Company Name:</label>
                        <input
                            type="text"
                            id="newCompanyNameInput"
                            value={newCompanyName}
                            onChange={handleNewCompanyNameChange}
                            required
                        />
                    </div>
                )}

                <label htmlFor="productNameInput">Product Name:</label>
                <input
                    type="text"
                    id="productNameInput"
                    value={productName}
                    onChange={handleProductNameChange}
                    required
                />

                <Button type="submit">Add Product</Button>
            </form>
        </div>

    )
}


export default ProductForm;