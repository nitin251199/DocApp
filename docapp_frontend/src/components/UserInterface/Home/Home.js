import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer'
import Slider from "react-slick";
import { Grid, Box, Container, Typography, Button } from '@material-ui/core'
import { useSelector } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DocCard from './DocCards/DocCard';
import './Home.css'
import { getData } from '../../FetchNodeServices';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import Howitworks from './Howitworks/Howitworks';
import Testimonial from './Testimonial/Testimonial';
import FAQs from './FAQs/FAQs';
import Aos from 'aos';
import 'aos/dist/aos.css'



export default function Home(props) {
    var settings = {
        dots: false,
        arrows: false,
        autoplay: true,
        slidesToShow: 1,
        speed: 2000,
        autoplaySpeed: 3000,
        pauseOnHover: false
    };

    var user = useSelector(state => state.user)
    var userValue = Object.values(user)
    var userKey = Object.keys(user)

    const PreviousBtn = (props) => {
        const { className, onClick } = props;
        return (
            <div className={className} onClick={onClick}>
                <ArrowBackIos style={{ color: "black", fontSize: "30px" }} />
            </div>
        );
    };
    const NextBtn = (props) => {
        const { className, onClick } = props;
        return (
            <div className={className} onClick={onClick}>
                <ArrowForwardIos style={{ color: "black", fontSize: "30px" }} />
            </div>
        );
    };

    const cardSettings = {
        dots: false,
        infinite: true,
        speed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
      autoplaySpeed: 3000,
      cssEase: "linear",
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
        centerMode: true,
        centerPadding: '210px'
    };

    const [docs, setDocs] = useState([])

    const fetchAllDocs = async () => {
        var result = await getData('doctor/fetchalldoctors')
        setDocs(result.data)
    }

    useEffect(function () {
        fetchAllDocs()
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
    }, [])

    return (
        <div>
            <Header history={props.history} />
            <div style={{ position: 'absolute', top: '50%', left: '10%', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: 55, color: 'white', fontWeight: 'bolder' }}>Search Your Doctor, Make an appointment</span>
                <span style={{ fontSize: 30, color: 'white', margin: 5 }}>The best of modern healthcare to ensure you stay healthy, always.</span>
                <div onClick={() => { userKey.length > 0 ? props.history.push("/appointment-page") : props.history.push({pathname:'/login'},{loginType:'patient'}) }} style={{ borderRadius: 5, background: '#3f51b5', color: '#fff', padding: 20, textAlign: 'center', marginTop: 5, fontFamily: 'Helvetica', fontSize: 16, letterSpacing: 1, cursor: 'pointer' }}>Get Started</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <div style={{ width: '100%', filter: 'brightness(80%)' }}>
                    <Slider {...settings}>
                        <div >
                            <img src="/slider1.jpg" width="100%" />
                        </div>
                        <div >
                            <img src="/slider2.jpg" width="100%" />
                        </div>
                        <div >
                            <img src="/slider3.jpg" width="100%" />
                        </div>
                    </Slider>
                </div>
            </div>

            <div data-aos="fade-down" style={{
                fontSize: 35,
                textAlign: 'center',
                padding: 60,
                fontWeight: 800,
                fontFamily: 'Lato'
            }}>Our Prestigious Doctors</div>
            <div>
                <Container className="carousel" style={{maxWidth:'100%',overflowX:'hidden'}}>
                    <Slider {...cardSettings}>
                        {
                            docs.map(item => {
                                return (
                                    <Box>
                                        <DocCard docData={item} clicked={()=>{userKey.length>0 ? props.history.push({ pathname: '/appointment-page' }, { doctorname: item.doctorname, department: item.department }) : props.history.push("/login")}} />
                                    </Box>
                                )
                            })
                        }
                    </Slider >
                </Container>
                <Howitworks />
                <div className="stats-wrapper">
                    <div data-aos="fade-up" className="stats-div">
                        <div className="stats-number">30L+</div>
                        <div className="stats-description">Total Consultations</div>
                    </div>
                    <div data-aos="fade-down" className="stats-div">
                        <div className="stats-number">3k+</div>
                        <div className="stats-description">Daily Consultations</div>
                    </div>
                    <div data-aos="fade-up" className="stats-div-right">
                        <div className="stats-number">22+</div>
                        <div className="stats-description">Specialities</div>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: '#e8eaf6', padding: 130 }}>
                <Testimonial />
            </div>

            <div className="features">
                <div data-aos="fade-up" className="feature">
                    <div className="feature-image">
                        <img src="/confidential.svg" alt="100% confidential discussion" />
                    </div>
                    <div className="feature-heading">100% Confidential</div>
                    <div className="feature-text">All advice &amp; consultations are completely confidential. You can also delete chats whenever you want.</div>
                </div>
                <div data-aos="fade-down" className="feature">
                    <div className="feature-image">
                        <img src="/certified.svg" alt="Certified doctors consultation" />
                    </div>
                    <div className="feature-heading">Certified Doctors</div>
                    <div className="feature-text">We offer quality healthcare through our network of certified and experienced doctors.</div>
                </div>
                <div data-aos="fade-up" className="feature">
                    <div className="feature-image">
                        <img src="/convenience.svg" alt="Seek expert opinion anytime, anywhere" /></div>
                    <div className="feature-heading">Convenience</div>
                    <div className="feature-text">Forget the hassle of long queues and rush hour. Seek expert opinion anytime, anywhere.</div>
                </div>
                <div data-aos="fade-down" className="feature">
                    <div className="feature-image">
                        <img src="/costEffective.svg" alt="Affordable, cost effective, and economical" /></div>
                    <div className="feature-heading">Cost Effective</div>
                    <div className="feature-text">We provide medical assistance on non urgent queries for free. Fee starting at ₹50 for faster response to queries.</div>
                </div>
            </div>
            <FAQs />
            <Footer data-aos="fade-up" history={props.history} />
        </div>
    )
}