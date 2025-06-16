import React from "react"; 
import { ethers } from "ethers";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from "@mui/material/Grid";
import DialogActions from '@mui/material/DialogActions';

import "../css/PopUpModal.css";

/**
 * Renders product batch details.
 * 
 * @author syuki
 */
export default class ProductDetails extends React.Component {

    state = {
        currency: "₹",
        unit: "Kg"
    }

    render() {
        const productDetails = this.props.product;
        const productionDate = new Date(productDetails.productionDate * 1000).toLocaleString();
        const distributorReceivedDate = productDetails.distributorReceivedAt ? 
            new Date(productDetails.distributorReceivedAt * 1000).toLocaleString() : 
            'Not received yet';
        
        return(
            <Dialog
                open={this.props.open}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
                onClose={this.props.closePopup}
                scroll="paper" 
                className="popup-modal"
                style={{ height: "1000px"}}>
                <center>
                    <DialogTitle id="scroll-dialog-title">Batch Details</DialogTitle>
                </center>
                <DialogContent dividers={true}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={null}
                        tabIndex={-1}
                        color="secondary"
                    >
                        <Grid container color="secondary" justify="flex-end" spacing={1}>
                            <Grid item xs={6} style={{ fontWeight: "bold"}}>
                                Product ID 
                            </Grid>
                            <Grid item xs>
                                {productDetails.productId} 
                            </Grid>
                            <Grid item xs={6} style={{ fontWeight: "bold"}}>
                                Product Name 
                            </Grid>
                            <Grid item xs>
                                {productDetails.productName} 
                            </Grid>
                            <Grid item xs={6} style={{ fontWeight: "bold"}} >
                                Origin Location
                            </Grid>
                            <Grid item xs style={{whiteSpace: 'pre-line'}} >
                                {productDetails.originLocation}
                            </Grid>
                            <Grid item xs={6} style={{ fontWeight: "bold"}} >
                                Product Description
                            </Grid>
                            <Grid item xs style={{whiteSpace: 'pre-line'}} >
                                {productDetails.productDesc} 
                            </Grid>
                            <Grid item xs={6} style={{ fontWeight: "bold"}}>
                                Product Price
                            </Grid>
                            <Grid item xs>
                                {productDetails.productPrice && productDetails.productPrice._isBigNumber ? ethers.utils.formatUnits(productDetails.productPrice, 2) : productDetails.productPrice} {this.state.currency}
                            </Grid>
                            <Grid item xs={6} style={{ fontWeight: "bold"}}>
                                Product Quantity
                            </Grid>
                            <Grid item xs>
                                {productDetails.productQuantity} {this.state.unit}
                            </Grid>
                            <Grid item xs={6} style={{ fontWeight: "bold"}}>
                                Product Status
                            </Grid>
                            <Grid item xs>
                                {productDetails.productStatus}
                            </Grid>
                            <Grid item xs={6} style={{ fontWeight: "bold"}}>
                                Production Date
                            </Grid>
                            <Grid item xs>
                                {productionDate}
                            </Grid>
                            <Grid item xs={6} style={{ fontWeight: "bold"}}>
                                Producer Address
                            </Grid>
                            <Grid item xs style={{ 
                                wordBreak: 'break-all',
                                fontFamily: 'monospace',
                                fontSize: '0.9em'
                            }}>
                                {productDetails.producerAddress}
                            </Grid>
                            {productDetails.distributorAddress !== '0x0000000000000000000000000000000000000000' && (
                                <>
                                    <Grid item xs={6} style={{ fontWeight: "bold"}}>
                                        Distributor Address
                                    </Grid>
                                    <Grid item xs style={{ 
                                        wordBreak: 'break-all',
                                        fontFamily: 'monospace',
                                        fontSize: '0.9em'
                                    }}>
                                        {productDetails.distributorAddress}
                                    </Grid>
                                    <Grid item xs={6} style={{ fontWeight: "bold"}}>
                                        Distributor_received_at
                                    </Grid>
                                    <Grid item xs>
                                        {distributorReceivedDate}
                                    </Grid>
                                    {productDetails.dispatchedAt > 0 && (
                                        <>
                                            <Grid item xs={6} style={{ fontWeight: "bold"}}>
                                                Dispatched_at
                                            </Grid>
                                            <Grid item xs>
                                                {new Date(productDetails.dispatchedAt * 1000).toLocaleString()}
                                            </Grid>
                                        </>
                                    )}
                                    <Grid item xs={6} style={{ fontWeight: "bold"}}>
                                        Distributor_payment_status
                                    </Grid>
                                    <Grid item xs style={{
                                        color: productDetails.distributorIsPaid ? 'green' : 'red'
                                    }}>
                                        {productDetails.distributorIsPaid ? (
                                            <>
                                                Paid ({productDetails.distributorPaidAmount && productDetails.distributorPaidAmount._isBigNumber ? ethers.utils.formatUnits(productDetails.distributorPaidAmount, 2) : productDetails.distributorPaidAmount} {this.state.currency})
                                            </>
                                        ) : (
                                            'Unpaid'
                                        )}
                                    </Grid>
                                </>
                            )}

                            {/* Display for Retailer */}
                            {productDetails.retailerAddresses !== '0x0000000000000000000000000000000000000000' && (
                                <>
                                    <Grid item xs={6} style={{ fontWeight: "bold"}}>
                                        Retailer_received_at
                                    </Grid>
                                    <Grid item xs>
                                        {productDetails.retailerReceivedAt ? 
                                            new Date(productDetails.retailerReceivedAt * 1000).toLocaleString() : 
                                            'Not received yet'}
                                    </Grid>
                                    <Grid item xs={6} style={{ fontWeight: "bold"}}>
                                        Retailer Address
                                    </Grid>
                                    <Grid item xs style={{ 
                                        wordBreak: 'break-all',
                                        fontFamily: 'monospace',
                                        fontSize: '0.9em'
                                    }}>
                                        {productDetails.retailerAddresses}
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <center>
                    <DialogActions>
                        <Grid 
                            container 
                            color="secondary"  
                            justifyContent="center">
                            <Grid item xs>
                                <Button 
                                    variant="contained" 
                                    className="nf-button" 
                                    color="primary" 
                                    onClick={this.props.closePopup}>Close</Button>
                            </Grid> 
                        </Grid>
                    </DialogActions>
                </center>
            </Dialog>
        )
    }
};