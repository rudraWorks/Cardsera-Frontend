import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styled from 'styled-components';

const Img = styled.img`
  max-width: 100%;
  height: auto;
`;

function HomepageCarousal() {
  return (
    <Carousel showThumbs={true}>
      <div> 
        <Img src="/images/Screenshots/progress2.png" />
      </div>
      <div>
        <Img src="/images/Screenshots/study.png" />
      </div>
      <div>
        <Img src="/images/Screenshots/addcard.png" />
      </div>
      <div>
        <Img src="/images/Screenshots/importdeck.png" />
      </div> 
      <div>
        <Img src="/images/Screenshots/practicehome.png" />
      </div>
      <div>
        <Img src="/images/Screenshots/choosedeckpractice.png" />
      </div>
      <div>
        <Img src="/images/Screenshots/whatarefalsyvalues.png" />
      </div>
      <div>
        <Img src="/images/Screenshots/whatarefalsyvaluesanswer.png" />
      </div>
      <div>
        <Img src="/images/Screenshots/carddetails.png" />
      </div>
      <div>
        <Img src="/images/Screenshots/progress.png" />
      </div>
    </Carousel>
  );
}

export default HomepageCarousal;
