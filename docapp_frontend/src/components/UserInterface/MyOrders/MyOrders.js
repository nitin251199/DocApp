import { Box, Divider, Grid, Paper } from "@material-ui/core";
import React from "react";
import { ServerURL } from "../../FetchNodeServices";
import Footer from "../Footer";
import Header from "../Header";

export const MyOrders = (props) => {
  const meds = props.location.state.meds;
  if (meds.length > 0) {
    var totalAmt = meds.reduce(calculateAmount, 0);
    var actualAmt = meds.reduce(calculateActualAmount, 0);
    var savingAmt = meds.reduce(calculateSavingAmount, 0);
  }

  function calculateAmount(a, b) {
    var actualPrice =
      b.offerprice > 0 ? b.offerprice * b.quantity : b.price * b.quantity;
    return a + actualPrice;
  }
  function calculateActualAmount(a, b) {
    return a + b.price * b.quantity;
  }
  function calculateSavingAmount(a, b) {
    var savingPrice =
      b.offerprice > 0 ? (b.price - b.offerprice) * b.quantity : 0;
    return a + savingPrice;
  }

  const productDetails = () => {
    return meds.map((item, index) => {
      return (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div style={{ margin: 0 }}>
              <img
                alt={item.medicinename}
                src={`${ServerURL}/images/${item.picture}`}
                width="150px"
              />
            </div>

            <div style={{ marginInline: 20 }}>
              <div
                style={{
                  fontWeight: 700,
                  margin: 2,
                  letterSpacing: 1,
                  display: "flex",
                  padding: 10,
                }}
              >
                {item.medicinename}
                <span
                  style={{
                    fontWeight: 300,
                    letterSpacing: 0,
                    paddingInline: 5,
                    color: "grey",
                  }}
                >
                  ({item.description})
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ fontWeight: 500, marginInline: 5 }}>
                  <span>
                    {item.offerprice > 0 ? (
                      <span>&#8377; {item.offerprice}</span>
                    ) : (
                      <span>
                        &#8377; {item.price} × {item.quantity}
                      </span>
                    )}
                  </span>
                </div>
                <div style={{ fontWeight: 500, marginInline: 5 }}>
                  {item.offerprice > 0 ? (
                    <span>
                      <s>&#8377; {item.price}</s>
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
                <div style={{ fontWeight: 500, marginInline: 5 }}>
                  {item.offerprice > 0 ? (
                    <span style={{ color: "green" }}>
                      You save &#8377;{" "}
                      {(item.price - item.offerprice) * item.quantity}
                    </span>
                  ) : (
                    <span>No offer</span>
                  )}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                alignItems: "end",
                marginLeft: 40,
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: 10,
                  fontWeight: 500,
                  margin: 2,
                }}
              >
                {item.offerprice > 0 ? (
                  <span>&#8377; {item.offerprice * item.quantity}</span>
                ) : (
                  <span>&#8377; {item.price * item.quantity}</span>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingInline: 15,
                }}
              >
                <span style={{ fontWeight: 700 }}>Quantity: </span>&nbsp;
                <span>{item.quantity} strips</span>
              </div>
            </div>
          </div>
          <div style={{ margin: 15 }}>
            <Divider />
          </div>
        </>
      );
    });
  };

  const showMainCart = () => {
    return (
      <Box style={{}}>
        <Box
          style={{ display: "flex", marginInline: 40, flexDirection: "column" }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              paddingBottom: 15,
              paddingLeft: 5,
            }}
          >
            <div
              style={{ textAlign: "left", fontWeight: "bolder", fontSize: 25 }}
            >
              My Orders ({meds.length})
            </div>
          </Box>
          <Grid
            container
            justifyContent="space-evenly"
            spacing={5}
            direction="row"
          >
            <Grid item xs={7}>
              <Grid item xs={12}>
                <Paper
                  elevation={3}
                  style={{
                    borderRadius: 5,
                    width: "100%",
                    padding: 10,
                  }}
                >
                  <div
                    style={{
                      padding: 10,
                      fontSize: 18,
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>
                      Order Summary{" "}
                      <span style={{ color: "grey" }}>({meds.length})</span>
                    </span>
                    <span>&#8377; {totalAmt}</span>
                  </div>

                  {productDetails()}
                </Paper>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid item xs>
                <Paper
                  elevation={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 5,
                    width: "100%",
                    padding: 10,
                  }}
                >
                  <div
                    style={{ fontSize: 18, fontWeight: "bold", padding: 10 }}
                  >
                    Payment Details
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 10,
                    }}
                  >
                    <div style={{}}>M.R.P</div>
                    <div style={{}}>&#8377; {actualAmt}</div>
                  </div>
                  <Divider variant="middle" />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 10,
                    }}
                  >
                    <div style={{}}>Savings</div>
                    <div
                      style={{
                        color: "green",
                        fontWeight: "bold",
                      }}
                    >
                      &#8377; {savingAmt}
                    </div>
                  </div>
                  <Divider variant="middle" />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 10,
                    }}
                  >
                    <div style={{}}>Delivery Charges</div>
                    <div style={{}}>&#8377; {0}</div>
                  </div>
                  <Divider variant="middle" />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 10,
                    }}
                  >
                    <div style={{}}>
                      <b>Total Amount</b>
                    </div>
                    <div style={{}}>
                      <b>&#8377; {totalAmt}</b>
                    </div>
                  </div>
                
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  };

  return (
    <div>
      <div style={{marginBottom:90}}>
      <Header history={props.history} />
      </div>
      {showMainCart()}
      <Footer history={props.history} />
    </div>
  );
};
