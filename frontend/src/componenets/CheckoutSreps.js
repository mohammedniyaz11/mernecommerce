import React from 'react'
import { Col, Row } from 'react-bootstrap'

function CheckoutSreps(props) {
  return (
      <>
<Row className='checkout-steps'>
<Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>Sign-In</Col>
      <Col className={props.step2 ? 'active' : ''}>Shipping</Col>
      <Col className={props.step3 ? 'active' : ''}>Payment</Col>
      <Col className={props.step4 ? 'active' : ''}>Place Order</Col>
    </Row>
</Row>;
</>
  )
}

export default CheckoutSreps