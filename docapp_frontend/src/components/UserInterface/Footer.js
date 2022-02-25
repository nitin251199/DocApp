import React from 'react';
import { Container,Box,Link,Grid,Divider } from '@material-ui/core';

export default function Footer(props) {
    return(
        
        <footer style={{marginBottom: 80,marginLeft:15,marginRight:15,marginTop:15,}}>
            <Divider variant="middle" style={{height: 0.5,backgroundColor:"black"}} />
            <Box >
                <div style={{display: 'flex', flexDirection: 'column',padding:20}}>
                    <div style={{fontSize:'1.25em'}}>CONNECT WITH US</div>
                    <div style={{display: 'flex', flexDirection: 'row',paddingTop:20}}>
                    <img src="/playstore.png" width="170"/>&nbsp;&nbsp;&nbsp;
                    <img src="/appstore.png" width="170"/>
                    </div>
                </div>
                <Container maxWidth>
                        <Grid container  >
                            <Grid item xs={3}>
                               <div style={{fontSize:'1.25em'}}>CONTACT</div>
                               <Box style={{color:"grey"}} >
                               <Box style={{paddingTop:15,fontSize:'1.20em'}}>support@e-consult.com</Box>
                               <Box style={{paddingTop:2,fontSize:'1.20em'}}>+91 92118 44000</Box>
                               </Box>
                            </Grid>
                            <Grid item xs={3}>
                            <div style={{fontSize:'1.25em'}}>DEPARTMENTS</div>
                               <Box >
                               <Box style={{paddingTop:15}}>
                                   <Link
                                   style={{color:"grey",paddingTop:1,fontSize:'1.20em'}}
                                   >Cardiology</Link>
                                </Box>
                               <Box style={{paddingTop:2}}>
                                    <Link style={{color:"grey",paddingTop:1,fontSize:'1.20em'}}>Dermetalogy</Link>
                               </Box>
                               <Box style={{paddingTop:2}}>
                                    <Link style={{color:"grey",paddingTop:1,fontSize:'1.20em'}}>Neurology</Link>
                                </Box>    
                                </Box> 
                            </Grid>
                            <Grid item xs={3}>
                            <div style={{fontSize:'1.25em'}}>ABOUT</div>
                                <Box>
                                <Box style={{paddingTop:15}}>
                                    <Link style={{color:"grey",paddingTop:1,fontSize:'1.20em'}}>Our Story</Link>
                                </Box>
                                <Box style={{paddingTop:2}}>
                                    <Link style={{color:"grey",paddingTop:1,fontSize:'1.20em'}}>Careers</Link>
                                </Box>
                                <Box style={{paddingTop:2}}>
                                    <Link style={{color:"grey",paddingTop:1,fontSize:'1.20em'}}>Press</Link>
                                </Box>
                                <Box style={{paddingTop:2}}>
                                    <Link style={{color:"grey",paddingTop:1,fontSize:'1.20em'}}>Blog</Link>
                                </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                            <div style={{fontSize:'1.25em'}}>INFORMATION</div>
                                <Box>
                                <Box style={{paddingTop:15}}>
                                    <Link style={{color:"grey",paddingTop:1,fontSize:'1.20em'}}>Help</Link>
                                </Box>
                                <Box style={{paddingTop:2}}>
                                    <Link style={{color:"grey",paddingTop:1,fontSize:'1.20em'}}>Shipping Handling</Link>
                                </Box>
                                <Box style={{paddingTop:2}}>
                                    <Link style={{color:"grey",paddingTop:1,fontSize:'1.20em'}}>Exchanges & Return</Link>
                                </Box>
                                <Box style={{paddingTop:2}}>
                                    <Link style={{color:"grey",paddingTop:1,fontSize:'1.20em'}}>Terms & Conditions</Link>
                                </Box>
                                <Box style={{paddingTop:2}}>
                                    <Link style={{color:"grey",paddingTop:1,fontSize:'1.20em'}}>Privacy Policy</Link>
                                </Box>   
                                </Box>
                            </Grid>
                        </Grid>
                </Container>
            </Box>
        </footer>
    )
}