import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ShopCart from "./ShopCart";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { ServerURL } from '../../FetchNodeServices';
import Divider from '@material-ui/core/Divider';
import { Grid, Box, Container, Fab, Paper, Button } from '@material-ui/core';
import Header from "../Header";
import Footer from "../Footer";
import Remove from '@material-ui/icons/Remove';
import Add from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
	list: {
		width: 'auto',
	},
	fullList: {
		width: 'auto',
	},
	large: {
		width: theme.spacing(8),
		height: theme.spacing(8),
	},
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	subdiv: {
		width: '300',
		height: 'auto',
		marginTop: 10,

		borderRadius: 5,
	},
	margin: {
		margin: theme.spacing(0),
	},
}))

export default function Cart(props) {
	const classes = useStyles();
	var cart = useSelector(state => state.cart)
	var dispatch = useDispatch()
	var key = Object.keys(cart)
	var medicines = Object.values(cart)
	
	const [refresh, setRefresh] = useState(false)

	var meds = JSON.parse(sessionStorage.getItem("medicines"));
	var u = JSON.parse(sessionStorage.getItem("userdetails"));
	if(meds.length > 0){
	var totalAmt = meds.reduce(calculateAmount, 0)
	var actualAmt = meds.reduce(calculateActualAmount, 0)
	var savingAmt = meds.reduce(calculateSavingAmount, 0)
	}

	function calculateAmount(a, b) {
		var actualPrice = b.offerprice > 0 ? b.offerprice * b.quantity : b.price * b.quantity
		return (a + actualPrice)
	}
	function calculateActualAmount(a, b) {
		return (a + (b.price * b.quantity))
	}
	function calculateSavingAmount(a, b) {
		var savingPrice = b.offerprice > 0 ? (b.price - b.offerprice) * b.quantity : 0
		return (a + savingPrice)
	}

	// const handleQtyChange = (value, item) => {
	// 	if (value == 0) {
	// 		dispatch({ type: "REMOVE_CART", payload: [item.room] });
	// 	} else {
	// 		item.quantity = value
	// 		dispatch({ type: "ADD_CART", payload: [item.room, item] });
	// 	}
	// 	setRefresh(!refresh);
	// };


	const productDetails = () => {
		return meds.map((item,index) => {
			return (
				<>
					<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
						<div style={{ margin: 0 }}>
							<img alt={item.medicinename} src={`${ServerURL}/images/${item.picture}`} width='150px' />
						</div>

						<div style={{ marginInline: 20 }}>
							<div style={{ fontWeight: 700, margin: 2, letterSpacing: 1, display: 'flex', padding: 10 }}>
								{item.medicinename}<span style={{fontWeight: 300,letterSpacing: 0,paddingInline:5,color: 'grey'}}>({item.description})</span>
							</div>
							<div style={{ display: 'flex', flexDirection: 'row' }}>

								<div style={{ fontWeight: 500, marginInline: 5 }}>
									<span>{item.offerprice > 0 ? <span>&#8377; {item.offerprice}</span> : <span>&#8377; {item.price} × {item.quantity}</span>}</span>
								</div>
								<div style={{ fontWeight: 500, marginInline: 5 }}>
									{item.offerprice > 0 ? <span><s>&#8377; {item.price}</s></span> : <></>}
								</div>
								<div style={{ fontWeight: 500, marginInline: 5 }}>
									{item.offerprice > 0 ? <span style={{ color: 'green' }}>You save &#8377; {(item.price - item.offerprice) * item.quantity}</span> : <span>No offer</span>}
								</div>


							</div>


						</div>
						<div style={{ display: 'flex', justifyContent: 'right', alignItems: 'end', marginLeft: 40, flexDirection: 'column' }}>
							<div style={{ display: 'flex', justifyContent: 'flex-end', padding: 10, fontWeight: 500, margin: 2 }}>
								{item.offerprice > 0 ? <span>&#8377; {item.offerprice * item.quantity}
								</span> : <span>&#8377; {item.price * item.quantity}</span>}
							</div>
							<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
							<IconButton
							color="primary"
                            aria-label="reduce"
                            onClick={() => {
                              item.quantity--;
                              setRefresh(!refresh);
                              // props.setRefresh(!refresh);
                              if (item.quantity == 0) {
								meds.splice(index,1)
                              }
                            }}
                            size="medium"
                            //disabled={item.qty==1?true:false}
                            disableTouchRipple
                          >
                            <Remove fontSize="medium" />
                          </IconButton>
                          <label style={{ paddingInline: 10 }}>
                            {item.quantity}
                          </label>
                          <IconButton
						  color="primary"
                            aria-label="increase"
                            onClick={() => {
                              item.quantity++;
                              setRefresh(!refresh);
                              // props.setRefresh(!refresh);
                            }}
                            size="medium"
                            disableTouchRipple
                          >
                            <Add fontSize="medium" />
                          </IconButton>
							</div>
						</div>

					</div>
					<div style={{ margin: 15 }}>
						<Divider />
					</div>
				</>)
		})
	}

	const showMainCart = () => {
		return (
			<Box style={{}}>
				<Box style={{ display: 'flex', marginInline: 40, flexDirection: 'column' }}>
					<Box style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', paddingBottom: 15, paddingLeft: 5 }}>
						<div style={{ textAlign: 'left', fontWeight: 'bolder', fontSize: 25 }} >My Cart ({meds.length})
						</div>
					</Box>
					<Grid container justifyContent='space-evenly' spacing={5} direction="row">

						<Grid item xs={7}  >
							<Paper elevation={3} style={{  borderRadius: 5, width: "100%", padding: 10, }}>
								<div style={{ padding: 10, fontSize: 18, fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
									<span>Order Summary <span style={{ color: 'grey' }}>({meds.length})</span></span>
									<span>&#8377; {totalAmt}</span>
								</div>

								{productDetails()}

							</Paper>
						</Grid>
						<Grid item xs={5}  >
								<Paper elevation={3} style={{ display: 'flex', flexDirection: "column", borderRadius: 5, width: "100%", padding: 10, }}>

									<div style={{ fontSize: 18, fontWeight: "bold", padding: 10 }}>
										Payment Details
									</div>

									<div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
										<div style={{}}>
											M.R.P
										</div>
										<div
											style={{

											}}
										>
											&#8377; {actualAmt}
										</div>
									</div>
									<Divider variant='middle' />
									<div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
										<div style={{}}>
											Savings
										</div>
										<div
											style={{
												color: 'green', fontWeight: 'bold'
											}}
										>
											&#8377; {savingAmt}
										</div>
									</div>
									<Divider variant='middle' />
									<div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
										<div style={{}}>
											Delivery Charges
										</div>
										<div
											style={{

											}}
										>
											&#8377; {0}
										</div>
									</div>
									<Divider variant='middle' />
									<div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
										<div style={{}}>
											<b>Total Amount</b>
										</div>
										<div
											style={{

											}}
										>
											<b>&#8377; {totalAmt}</b>
										</div>
									</div>
									<Button
									color="primary"
									variant="contained"
									onClick={()=>props.history.push({pathname:'/addresscart'})}
										style={{
											width: "auto",
											display: 'block',
											borderRadius: 5,
											padding: 15,
											marginTop:30,
											textAlign: 'center',
											fontSize: 16,
											fontWeight: 'bold',
											letterSpacing: 0.5,
											cursor: 'pointer'
										}}>
										Place Order
									</Button>
								</Paper>
							</Grid>



					</Grid>

				</Box>



			</Box>

		)
	}

	return (
		<div>
			<div style={{marginBottom:100}}>
            <Header history={props.history} />
            </div>
			{meds.length > 0 ? showMainCart() :
			<div style={{
				width:'auto',
				height: '70vh',
				display:'flex',justifyContent:'center',alignItems:'center',
				flexDirection:'column'
			}}><span>No Items in Cart</span>
			<img src="./emptycart.png" />
			</div>}
			<Footer history={props.history} />
		</div>
	)
}