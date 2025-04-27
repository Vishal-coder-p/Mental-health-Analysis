import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function DailyLog() {
  const resData = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_id: resData.state.email,
    mood: 3,
    anxiety: 3,
    sleep: "",
    sleepQuality: "",
    sleepDisturbances: "",
    physicalActivity: "",
    activityDuration: "",
    socialInteractions: "",
    stress: 3,
    symptoms: "",
  });

  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/log/log", formData)
      .then((response) => {
        console.log("Log submitted:", response.data);
        setSubmitSuccess("Log submitted successfully!");
        navigate("/trends", { state: resData.state.email });
        setSubmitError(null);
      })
      .catch((error) => {
        console.error("Error submitting log:", error);
        setSubmitError("Error submitting log. Please try again.");
        setSubmitSuccess(null);
      });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="8">
          <h1>Daily Log</h1>
          {submitError && <Alert variant="danger">{submitError}</Alert>}
          {submitSuccess && <Alert variant="success">{submitSuccess}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formMood">
              <Form.Label>Mood Ratings (1-5)</Form.Label>
              <Form.Range
                name="mood"
                value={formData.mood}
                onChange={handleChange}
                min={1}
                max={5}
              />
              <Form.Text>{formData.mood}</Form.Text>
            </Form.Group>
            <Form.Group controlId="formAnxiety">
              <Form.Label>Anxiety Levels (1-5)</Form.Label>
              <Form.Range
                name="anxiety"
                value={formData.anxiety}
                onChange={handleChange}
                min={1}
                max={5}
              />
              <Form.Text>{formData.anxiety}</Form.Text>
            </Form.Group>
            <Form.Group controlId="formStress">
              <Form.Label>Stress Levels (1-5)</Form.Label>
              <Form.Range
                name="stress"
                value={formData.stress}
                onChange={handleChange}
                min={1}
                max={5}
              />
              <Form.Text>{formData.stress}</Form.Text>
            </Form.Group>
            <Form.Group controlId="formSleep">
              <Form.Label>Sleep Hours</Form.Label>
              <Form.Control
                type="number"
                name="sleep"
                value={formData.sleep}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formSleepQuality">
              <Form.Label>Sleep Quality</Form.Label>
              <Form.Control
                type="text"
                name="sleepQuality"
                value={formData.sleepQuality}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formSleepDisturbances">
              <Form.Label>Sleep Disturbances</Form.Label>
              <Form.Control
                type="text"
                name="sleepDisturbances"
                value={formData.sleepDisturbances}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPhysicalActivity">
              <Form.Label>Physical Activity</Form.Label>
              <Form.Control
                type="text"
                name="physicalActivity"
                value={formData.physicalActivity}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formActivityDuration">
              <Form.Label>Activity Duration</Form.Label>
              <Form.Control
                type="text"
                name="activityDuration"
                value={formData.activityDuration}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formSocialInteractions">
              <Form.Label>Social Interactions</Form.Label>
              <Form.Control
                type="text"
                name="socialInteractions"
                value={formData.socialInteractions}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formSymptoms">
              <Form.Label>Symptoms of Depression or Anxiety</Form.Label>
              <Form.Control
                type="text"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default DailyLog;
