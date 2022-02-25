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
import { Grid, Box, Container, Fab } from '@material-ui/core';
import Header from "../Header";
import Footer from "../Footer";

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

export default function MainCart(props) {
	const classes = useStyles();
	var cart = useSelector(state => state.cart)
	var dispatch = useDispatch()
	var key = Object.keys(cart)
	var products = Object.values(cart)
	const [refresh, setRefresh] = useState(false)

	var totalAmt = products.reduce(calculateAmount, 0)
	var actualAmt = products.reduce(calculateActualAmount, 0)
	var savingAmt = products.reduce(calculateSavingAmount, 0)

	function calculateAmount(a, b) {
		var actualPrice = b.offerprice > 0 ? b.offerprice * b.qty : b.price * b.qty
		return (a + actualPrice)
	}
	function calculateActualAmount(a, b) {
		return (a + (b.price * b.qty))
	}
	function calculateSavingAmount(a, b) {
		var savingPrice = b.offerprice > 0 ? (b.price - b.offerprice) * b.qty : 0
		return (a + savingPrice)
	}

	const handleQtyChange = (value, item) => {
		if (value == 0) {
			dispatch({ type: "REMOVE_CART", payload: [item.finalproductid] });
		} else {
			item.qty = value
			dispatch({ type: "ADD_CART", payload: [item.finalproductid, item] });
		}
		setRefresh(!refresh);
	};


	const productDetails = () => {
		return products.map((item) => {
			return (
				<>
					<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
						<div style={{ margin: 0 }}>
							<img alt={item.productname} src={`${ServerURL}/images/${item.productpicture}`} width='150px' />
						</div>

						<div style={{ marginInline: 20 }}>
							<div style={{ fontWeight: 700, margin: 2, letterSpacing: 1, display: 'flex', padding: 10 }}>
								{item.productname} <span style={{fontWeight: 300,letterSpacing: 0,paddingInline:5,color: 'grey'}}>({item.colorname})</span>
							</div>
							<div style={{ display: 'flex', flexDirection: 'row' }}>

								<div style={{ fontWeight: 500, marginInline: 5 }}>
									<span>{item.offerprice > 0 ? <span>&#8377; {item.offerprice}</span> : <span>&#8377; {item.price} × {item.qty}</span>}</span>
								</div>
								<div style={{ fontWeight: 500, marginInline: 5 }}>
									{item.offerprice > 0 ? <span><s>&#8377; {item.price}</s></span> : <></>}
								</div>
								<div style={{ fontWeight: 500, marginInline: 5 }}>
									{item.offerprice > 0 ? <span style={{ color: 'green' }}>You save &#8377; {(item.price - item.offerprice) * item.qty}</span> : <span>No offer</span>}
								</div>


							</div>


						</div>
						<div style={{ display: 'flex', justifyContent: 'right', alignItems: 'end', marginLeft: 40, flexDirection: 'column' }}>
							<div style={{ display: 'flex', justifyContent: 'flex-end', padding: 10, fontWeight: 500, margin: 2 }}>
								{item.offerprice > 0 ? <span>&#8377; {item.offerprice * item.qty}
								</span> : <span>&#8377; {item.price * item.qty}</span>}
							</div>
							<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
								<ShopCart id={item.finalproductid} value={item.qty}
									onChange={(value) => handleQtyChange(value, item)}
								/>
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
						<div style={{ textAlign: 'left', fontWeight: 'bolder', fontSize: 25 }} >My Cart ({key.length})
						</div>
					</Box>
					<Grid container justifyContent='space-evenly' spacing={5} direction="row">

						<Grid item xs={7}  >
							<div style={{ border: '1px solid', borderRadius: 5, width: "100%", padding: 10, }}>
								<div style={{ padding: 10, fontSize: 18, fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
									<span>Order Summary <span style={{ color: 'grey' }}>({key.length})</span></span>
									<span>&#8377; {totalAmt}</span>
								</div>

								{productDetails()}

							</div>
						</Grid>
						<Grid item xs={5}  >
							<Grid item xs  >
								<div style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid', borderRadius: 5, width: "100%", padding: 10, display: 'flex' }}>
									<div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', lineHeight: 1.5 }}>
										<div style={{ padding: 5, fontSize: 18, fontWeight: 'bold' }}>Apply Coupon</div>
										<div style={{ padding: 5 }}><font color='blue'><b><u>Log in </u></b></font>&nbsp;to see best offers and cashback deals</div>
									</div>
									<div style={{ display: 'flex', justifyContent: 'flex-end', display: 'flex', }}>
										<div style={{ padding: 5 }}>
											<font color='red' ><b> VIEW ALL </b></font>
										</div>
									</div>
								</div>
							</Grid>
							&nbsp;
							<Grid item xs  >
								<div style={{ display: 'flex', flexDirection: "column", border: '1px solid', borderRadius: 5, width: "100%", padding: 10, }}>

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
								</div>
								<Box style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', padding: 23 }}>
									<li
									onClick={()=>props.history.push({pathname:'/addresscart'})}
										style={{
											width: 250,
											listStyle: 'none',
											display: 'block',
											borderRadius: 5,
											background: '#50526e',
											color: '#fff',
											padding: 15,
											textAlign: 'center',
											fontSize: 16,
											fontWeight: 'bold',
											letterSpacing: 0.5,
											cursor: 'pointer'
										}}>
										Place Order
									</li>
								</Box>
							</Grid>


						</Grid>

					</Grid>

				</Box>



			</Box>

		)
	}

	return (
		<div>
			<Header history={props.history} />
			{showMainCart()}
			<Footer history={props.history} />
		</div>
	)
}