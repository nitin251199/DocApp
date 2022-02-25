import { Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import Aos from 'aos'
import "aos/dist/aos.css";

const Howitworks = () => {

    useEffect(()=>{
        Aos.init({
            offset:     0,
            delay:      0,
            easing:     'ease',
            duration:   1000,
            disable:    false, // Condition when AOS should be disabled. e.g. 'mobile'
            once:       false,
            mirror:     false, // whether elements should animate out while scrolling past them
            startEvent: 'DOMContentLoaded'
          });
    },[])

    return (
        <div data-aos="fade-down" style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection: 'column'}}>
                <div style={{
                    textAlign: 'center', fontSize: 30,
                    padding: 60,
                    fontWeight: 800,
                    fontFamily: 'Lato'
                }}>
                    How Online Doctor Consultation Works?
                </div>
                <div >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 30, }}>
                    <div data-aos="fade-right">
                        <img src="/1.svg" alt=""  />
                    </div>
                    <div style={{ fontSize: 65, margin: 40, fontWeight: 'bolder', color: 'grey', }}>
                        01
                    </div>
                    <div data-aos="fade-left" style={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>
                        <div style={{ fontSize: 25, textAlign: 'left', letterSpacing: 0.5 }}>
                            Start a session
                        </div>
                        <div style={{ width: 400,paddingTop:10 }}>
                            <Typography variant="body1">Select the type of category you would like to consult with the doctor.</Typography>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 30 }}>
                    <div data-aos="fade-right" style={{ fontSize: 65, margin: 30, fontWeight: 'bolder', color: 'grey', }}>
                        02
                    </div>
                    <div style={{ display: 'flex', alignItems: 'start', flexDirection: 'column',margin:40  }}>
                        <div style={{ fontSize: 25, textAlign: 'left', letterSpacing: 0.5,}}>
                            Tell us what’s troubling you
                        </div>
                        <div style={{ width: 400,paddingTop:10 }}>
                            <Typography variant="body1">Type in your concern and attach prescription, lab reports if any. Help doctor understand your case better.</Typography>
                        </div>
                    </div>
                    <div data-aos="fade-left">
                        <img src="/2.svg" alt="" />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 30, }}>
                    <div data-aos="fade-right">
                        <img src="/3.svg" alt=""  />
                    </div>
                    <div style={{ fontSize: 65, margin: 40, fontWeight: 'bolder', color: 'grey', }}>
                        03
                    </div>
                    <div data-aos="fade-left" style={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>
                        <div style={{ fontSize: 25, textAlign: 'left', letterSpacing: 0.5 }}>
                        Connect with the doctor
                        </div>
                        <div style={{ width: 400,paddingTop:10 }}>
                            <Typography variant="body1">A doctor is auto-assigned to you that best matches your concern. You will get a diagnosis and treatment for your condition.</Typography>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 30 }}>
                    <div data-aos="fade-right" style={{ fontSize: 65, margin: 30, fontWeight: 'bolder', color: 'grey', }}>
                        04
                    </div>
                    <div style={{ display: 'flex', alignItems: 'start', flexDirection: 'column',margin:40  }}>
                        <div style={{ fontSize: 25, textAlign: 'left', letterSpacing: 0.5,}}>
                        Follow up with your doctor
                        </div>
                        <div style={{ width: 400,paddingTop:10 }}>
                            <Typography variant="body1">Still, need more clarity? You can follow up with the doctor even after your chat window closes.</Typography>
                        </div>
                    </div>
                    <div data-aos="fade-left">
                        <img src="/4.svg" alt="" />
                    </div>
                </div>
                </div>
            </div>
    )
}

export default Howitworks
