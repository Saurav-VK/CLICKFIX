import React from 'react';
import { Carousel, Row, Col, Card } from 'react-bootstrap';
import systemupdate from "../../../assets/systemupdate.jpg";
import newopening from "../../../assets/newopening.jpg";
import maintainancetips from "../../../assets/maintainancetips.jpg";
import newfeature from "../../../assets/newfeature.jpg";
import customerappriciation from "../../../assets/customerappriciation.jpeg";
import newpatnership from "../../../assets/newpatnership.jpg";
const ActivityFeedCarousel: React.FC = () => {
  return (
    <Carousel>
      <Carousel.Item interval={2000}>
        <Row>
          <Col>
            <Card className="text-white">
              <div className="position-relative">
                <Card.Img
                  src={systemupdate}
                  alt="System Update"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.ImgOverlay className="d-flex flex-column justify-content-end bg-dark bg-opacity-50 p-2">
                  <Card.Title>System Update Completed</Card.Title>
                  <Card.Text>20 minutes ago</Card.Text>
                </Card.ImgOverlay>
              </div>
            </Card>
          </Col>
          <Col>
            <Card className="text-white">
              <div className="position-relative">
                <Card.Img
                  src={newopening}
                  alt="New Service Center Opening"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.ImgOverlay className="d-flex flex-column justify-content-end bg-dark bg-opacity-50 p-2">
                  <Card.Title>New Service Center Opening</Card.Title>
                  <Card.Text>Yesterday</Card.Text>
                </Card.ImgOverlay>
              </div>
            </Card>
          </Col>
        </Row>
      </Carousel.Item>

      <Carousel.Item interval={3000}>
        <Row>
          <Col>
            <Card className="text-white">
              <div className="position-relative">
                <Card.Img
                  src={maintainancetips}
                  alt="Maintenance Tips"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.ImgOverlay className="d-flex flex-column justify-content-end bg-dark bg-opacity-50 p-2">
                  <Card.Title>Maintenance Tips</Card.Title>
                  <Card.Text>2 days ago</Card.Text>
                </Card.ImgOverlay>
              </div>
            </Card>
          </Col>
          <Col>
            <Card className="text-white">
              <div className="position-relative">
                <Card.Img
                  src={newfeature}
                  alt="New Feature Launch"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.ImgOverlay className="d-flex flex-column justify-content-end bg-dark bg-opacity-50 p-2">
                  <Card.Title>New Feature Launch</Card.Title>
                  <Card.Text>Last Week</Card.Text>
                </Card.ImgOverlay>
              </div>
            </Card>
          </Col>
        </Row>
      </Carousel.Item>

      <Carousel.Item interval={3000}>
        <Row>
          <Col>
            <Card className="text-white">
              <div className="position-relative">
                <Card.Img
                  src={customerappriciation}
                  alt="Customer Appreciation Day"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.ImgOverlay className="d-flex flex-column justify-content-end bg-dark bg-opacity-50 p-2">
                  <Card.Title>Customer Appreciation Day</Card.Title>
                  <Card.Text>Last Month</Card.Text>
                </Card.ImgOverlay>
              </div>
            </Card>
          </Col>
          <Col>
            <Card className="text-white">
              <div className="position-relative">
                <Card.Img
                  src={newpatnership}
                  alt="New Partnership"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.ImgOverlay className="d-flex flex-column justify-content-end bg-dark bg-opacity-50 p-2">
                  <Card.Title>New Partnership</Card.Title>
                  <Card.Text>2 Months Ago</Card.Text>
                </Card.ImgOverlay>
              </div>
            </Card>
          </Col>
        </Row>
      </Carousel.Item>
    </Carousel>
  );
};

export default ActivityFeedCarousel;
