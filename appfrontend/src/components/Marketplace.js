import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProductDetails from './ProductDetails';
import BatchTable from './BatchTable';
import { useNavigate } from 'react-router-dom';

const cols = [
  { field: "productId", title: "Product ID", numeric: true, align: "left" },
  { field: "productName", title: "Product Name", numeric: false, align: "left" },
  { field: "action", title: "Details", numeric: false, align: "center" },
];

const Marketplace = ({ contract, currentAddress, isAuthenticated }) => {
  const [products, setProducts] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (contract) {
      fetchProducts();
    }
    // eslint-disable-next-line
  }, [contract]);

  const fetchProducts = async () => {
    try {
      const result = await contract.getAllProductDetails();
      // Filter only READY_FOR_SALE products
      const marketplaceProducts = result.filter(
        product => product.productStatus === 5 // READY_FOR_SALE status
      ).map(product => ({
        ...product,
        productId: product.productId && product.productId._isBigNumber ? product.productId.toString() : product.productId,
        productName: product.productName,
        productDesc: product.productDesc,
        productPrice: product.productPrice && product.productPrice._isBigNumber ? ethers.utils.formatUnits(product.productPrice, 2) : product.productPrice,
        productQuantity: product.productQuantity && product.productQuantity._isBigNumber ? product.productQuantity.toString() : product.productQuantity,
        productStatus: product.productStatus && product.productStatus._isBigNumber ? product.productStatus.toString() : product.productStatus,
        productionDate: product.productionDate && product.productionDate._isBigNumber ? product.productionDate.toNumber() : product.productionDate,
        originLocation: product.originLocation,
        distributorAddress: product.distributorAddress,
        producerAddress: product.producerAddress,
        retailerAddresses: product.retailerAddresses,
        distributorReceivedAt: product.distributorReceivedAt && product.distributorReceivedAt._isBigNumber ? product.distributorReceivedAt.toNumber() : product.distributorReceivedAt,
        distributorIsPaid: product.distributorIsPaid,
        distributorPaidAmount: product.distributorPaidAmount && product.distributorPaidAmount._isBigNumber ? ethers.utils.formatUnits(product.distributorPaidAmount, 2) : product.distributorPaidAmount,
        dispatchedAt: product.dispatchedAt && product.dispatchedAt._isBigNumber ? product.dispatchedAt.toNumber() : product.dispatchedAt,
        retailerReceivedAt: product.retailerReceivedAt && product.retailerReceivedAt._isBigNumber ? product.retailerReceivedAt.toNumber() : product.retailerReceivedAt,
        action: 'View Details',
      }));
      setProducts(marketplaceProducts);
    } catch (error) {
      console.error("Error fetching marketplace products:", error);
    }
  };

  const handleViewDetails = (row) => {
    setSelectedProduct(row);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedProduct(null);
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="main-body" color="primary">
      <Paper className="app" style={{ backgroundColor: "#92869f63", minHeight: 600 }} elevation={3}>
        <AppBar id="app-bar" position="static" elevation={0}>
          <Tabs value={0} variant="fullWidth" TabIndicatorProps={{ style: { background: "#FBFAFA" } }}>
            <Tab label="Marketplace Products" />
          </Tabs>
        </AppBar>
        {!isAuthenticated && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleRegister}
            sx={{ m: 3 }}
          >
            Register to Sell
          </Button>
        )}
        <BatchTable
          rows={products}
          cols={cols}
          userType={null}
          showConfirmActionPopUp={() => {}}
          toggleBatchDetailsPopUp={handleViewDetails}
          emptyRowsMessage="No products available in the marketplace"
        />
        {showDetails && selectedProduct && (
          <ProductDetails
            open={showDetails}
            closePopup={handleCloseDetails}
            product={selectedProduct}
          />
        )}
      </Paper>
    </div>
  );
};

export default Marketplace; 